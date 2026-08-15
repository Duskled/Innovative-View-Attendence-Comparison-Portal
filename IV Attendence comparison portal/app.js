import { compareData, createPayload, readAttendanceFile, STORAGE_KEY } from "./attendance.js";
import { initThemeToggle } from "./theme.js";
import { hydrateIcons, setIcon } from "./icons.js";

const state = { payment: null, rm: null };

const $ = (id) => document.getElementById(id);
const compareButton = $("compare-button");
const errorBox = $("error-box");
const summary = $("summary");

initThemeToggle();
hydrateIcons();

function setFile(kind, file) {
  if (!file) return;
  state[kind] = file;
  $(`${kind}-panel`).classList.add("ready");
  $(`${kind}-icon`).classList.add("complete");
  setIcon($(`${kind}-icon`), "check", 20);
  $(`${kind}-action`).textContent = "Replace file";
  $(`${kind}-name`).textContent = file.name;
  $(`${kind}-size`).textContent = `${(file.size / 1024).toFixed(1)} KB`;
  compareButton.disabled = !(state.payment && state.rm);
  summary.hidden = true;
  errorBox.hidden = true;
  sessionStorage.removeItem(STORAGE_KEY);
}

function bindUpload(kind) {
  const input = $(`${kind}-file`);
  const picker = $(`${kind}-picker`);
  input.addEventListener("change", () => setFile(kind, input.files?.[0]));
  ["dragenter", "dragover"].forEach((eventName) => picker.addEventListener(eventName, (event) => {
    event.preventDefault();
    picker.classList.add("dragging");
  }));
  ["dragleave", "drop"].forEach((eventName) => picker.addEventListener(eventName, (event) => {
    event.preventDefault();
    picker.classList.remove("dragging");
  }));
  picker.addEventListener("drop", (event) => setFile(kind, event.dataTransfer?.files?.[0]));
}

function showError(message) {
  $("error-message").textContent = message;
  errorBox.hidden = false;
}

function summaryCard(label, value, className = "") {
  const card = document.createElement("div");
  if (className) card.className = className;
  const small = document.createElement("small");
  small.textContent = label;
  const strong = document.createElement("strong");
  strong.textContent = String(value);
  card.append(small, strong);
  return card;
}

function renderSummary(payload) {
  const stats = payload.stats;
  const grid = $("summary-grid");
  grid.replaceChildren(
    summaryCard("Total AMs", stats.totalAms),
    summaryCard("Total attendance", stats.totalAttendance),
    summaryCard("Matched", stats.matched, "good"),
    summaryCard("Missing in RM", stats.missing, "warn"),
    summaryCard("RM extra", stats.extra, "info"),
    summaryCard("IN/OUT mismatch", stats.mismatched, "warn"),
    summaryCard("Dates detected", stats.detectedDates),
  );
  $("payment-audit").textContent = `Payment: ${payload.sources.payment.fileName} · ${payload.sources.payment.sheetName} · ${payload.sources.payment.notes.join("; ") || "Direct table read"}`;
  $("rm-audit").textContent = `RM: ${payload.sources.rm.fileName} · ${payload.sources.rm.sheetName} · ${payload.sources.rm.notes.join("; ") || "Direct table read"}`;
  summary.hidden = false;
  setTimeout(() => summary.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
}

async function runComparison() {
  if (!state.payment || !state.rm) return;
  errorBox.hidden = true;
  summary.hidden = true;
  compareButton.disabled = true;
  setIcon($("compare-icon"), "loader-circle", 19);
  $("compare-icon").classList.add("spin");
  $("compare-label").textContent = "Comparing attendance…";
  $("compare-arrow").hidden = true;

  try {
    sessionStorage.removeItem(STORAGE_KEY);
    const [payment, rm] = await Promise.all([
      readAttendanceFile(state.payment, "Payment file"),
      readAttendanceFile(state.rm, "RM file"),
    ]);
    const googleSheetUrl = $("google-sheet-url").value.trim();
    if (googleSheetUrl && !/^https:\/\/docs\.google\.com\/spreadsheets\//i.test(googleSheetUrl)) {
      throw new Error("Enter a valid Google Sheets link beginning with https://docs.google.com/spreadsheets/.");
    }
    const payload = createPayload(payment, rm, compareData(payment, rm), googleSheetUrl);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    renderSummary(payload);
  } catch (error) {
    showError(error instanceof Error ? error.message : "The files could not be compared safely.");
  } finally {
    compareButton.disabled = false;
    $("compare-icon").className = "";
    setIcon($("compare-icon"), "git-compare-arrows", 18);
    $("compare-label").textContent = "Compare attendance";
    $("compare-arrow").hidden = false;
  }
}

function setHelp(open) {
  $("help-modal").hidden = !open;
  document.body.style.overflow = open ? "hidden" : "";
}

bindUpload("payment");
bindUpload("rm");
compareButton.addEventListener("click", runComparison);
$("help-open").addEventListener("click", () => setHelp(true));
$("help-close").addEventListener("click", () => setHelp(false));
$("help-done").addEventListener("click", () => setHelp(false));
$("help-modal").addEventListener("click", (event) => {
  if (event.target === $("help-modal")) setHelp(false);
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setHelp(false);
});

let cursorFrame = 0;
const updateCursorEffect = (event) => {
  cancelAnimationFrame(cursorFrame);
  cursorFrame = requestAnimationFrame(() => {
    document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
    document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);
    document.documentElement.style.setProperty("--cursor-alpha", ".96");
  });
};
window.addEventListener("pointermove", updateCursorEffect, { passive: true });
window.addEventListener("mousemove", updateCursorEffect, { passive: true });
window.addEventListener("blur", () => document.documentElement.style.setProperty("--cursor-alpha", ".68"));
document.addEventListener("mouseleave", () => document.documentElement.style.setProperty("--cursor-alpha", ".68"));
