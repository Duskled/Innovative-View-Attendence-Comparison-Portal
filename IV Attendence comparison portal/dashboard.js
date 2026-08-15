import { comparisonDetail, exportWorkbook, normalized, STORAGE_KEY } from "./attendance.js";
import { initThemeToggle } from "./theme.js";
import { createIcon, hydrateIcons } from "./icons.js";

const $ = (id) => document.getElementById(id);
let payload = null;
let activeFilter = "All";
let activeDate = "All";
let query = "";
const loaderStartedAt = performance.now();

initThemeToggle();
hydrateIcons();

function textElement(tag, value, className = "") {
  const element = document.createElement(tag);
  element.textContent = value;
  if (className) element.className = className;
  return element;
}

function metric(iconName, color, label, value) {
  const card = document.createElement("div");
  card.className = "metric";
  const iconBox = document.createElement("span");
  iconBox.className = `metric-icon ${color}`;
  iconBox.append(createIcon(iconName, 18));
  iconBox.setAttribute("aria-hidden", "true");
  const copy = document.createElement("div");
  copy.append(textElement("small", label), textElement("strong", String(value)));
  card.append(iconBox, copy);
  return card;
}

function renderMetrics() {
  const stats = payload.stats;
  $("metric-strip").replaceChildren(
    metric("users", "blue", "Total AMs", stats.totalAms),
    metric("file-spreadsheet", "cyan", "Total attendance", stats.totalAttendance),
    metric("check-circle-2", "green", "Matched", stats.matched),
    metric("circle-alert", "amber", "Missing in RM", stats.missing),
    metric("cloud", "purple", "RM extra", stats.extra),
    metric("x-circle", "red", "IN/OUT mismatch", stats.mismatched),
    metric("calendar-days", "blue", "Dates found", stats.detectedDates),
  );
}

function renderAudit() {
  const payment = payload.sources.payment;
  const rm = payload.sources.rm;
  $("payment-source-name").textContent = payment.fileName;
  $("payment-source-details").textContent = `${payment.sheetName} · ${payment.dataRows} AM rows · ${payment.attendanceRecords} attendance records · ${payment.notes.join("; ") || "Direct table read"}`;
  $("rm-source-name").textContent = rm.fileName;
  $("rm-source-details").textContent = `${rm.sheetName} · ${rm.dataRows} AM rows · ${rm.attendanceRecords} attendance records · ${rm.notes.join("; ") || "Direct table read"}`;
}

function filterOptions() {
  const rows = payload.rows;
  const stats = payload.stats;
  return [
    ["All records", "All", rows.length],
    ["Matched", "Matched", stats.matched],
    ["Missing", "Missing in RM", stats.missing],
    ["RM extra", "Extra in RM", stats.extra],
    ["IN/OUT mismatch", "IN/OUT mismatch", stats.mismatched],
  ];
}

function renderFilters() {
  const tabs = $("filter-tabs");
  tabs.replaceChildren(...filterOptions().map(([label, value, count]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("role", "tab");
    button.setAttribute("aria-selected", String(activeFilter === value));
    if (activeFilter === value) button.classList.add("active");
    button.append(document.createTextNode(label), textElement("span", String(count)));
    button.addEventListener("click", () => {
      activeFilter = value;
      renderFilters();
      renderRows();
    });
    return button;
  }));
}

function visibleRows() {
  const needle = normalized(query);
  return payload.rows.filter((row) => {
    const filterMatch = activeFilter === "All" || row.status === activeFilter;
    const dateMatch = activeDate === "All" || row.dateKey === activeDate;
    const queryMatch = !needle || normalized(`${row.amCode} ${row.amNo} ${row.amName} ${row.vendor} ${row.date} ${row.paymentIn} ${row.paymentOut} ${row.rmIn} ${row.rmOut}`).includes(needle);
    return filterMatch && dateMatch && queryMatch;
  });
}

function renderDateFilter() {
  const select = $("date-filter");
  const dates = [...new Map(payload.rows.map((row) => [row.dateKey, row.date])).entries()].sort(([left], [right]) => left.localeCompare(right));
  const options = [new Option("All dates", "All"), ...dates.map(([key, display]) => new Option(display, key))];
  select.replaceChildren(...options);
  select.value = activeDate;
}

function timeCell(source, inValue, outValue, sourceRow) {
  const td = document.createElement("td");
  const stack = document.createElement("div");
  stack.className = "time-stack";
  const inBox = document.createElement("span");
  inBox.append(textElement("small", "IN"), textElement("strong", inValue || "—", inValue ? "attendance-value" : "empty-value"));
  const outBox = document.createElement("span");
  outBox.append(textElement("small", "OUT"), textElement("strong", outValue || "—", outValue ? "attendance-value" : "empty-value"));
  stack.append(inBox, outBox, textElement("em", sourceRow ? `${source} row ${sourceRow}` : `No ${source} row for this date`));
  td.append(stack);
  return td;
}

function rowElement(row) {
  const tr = document.createElement("tr");

  const personTd = document.createElement("td");
  const person = document.createElement("div");
  person.className = "person-cell";
  const initials = row.amName ? row.amName.split(/\s+/).filter(Boolean).map((part) => part[0]).join("").slice(0, 2).toUpperCase() : "?";
  const personCopy = document.createElement("div");
  personCopy.append(
    textElement("strong", row.amName || "Name not provided"),
    textElement("small", `${row.amCode || "Code not provided"} · ${row.amNo ? `No. ${row.amNo}` : "Number not provided"}`),
  );
  person.append(textElement("span", initials), personCopy);
  personTd.append(person);

  const vendorTd = document.createElement("td");
  vendorTd.append(textElement("span", row.vendor || "Vendor not provided", "vendor-text"));
  const dateTd = document.createElement("td");
  const dateBlock = document.createElement("div");
  dateBlock.className = "date-block";
  const dateText = document.createElement("span");
  dateText.className = "date-text";
  dateText.append(createIcon("calendar-days", 14), document.createTextNode(row.date));
  dateBlock.append(dateText, textElement("small", "One record for this date"));
  dateTd.append(dateBlock);

  const statusTd = document.createElement("td");
  const className = row.status === "Matched" ? "matched" : row.status === "Missing in RM" ? "missing" : row.status === "Extra in RM" ? "extra" : row.status === "Needs review" ? "review" : "mismatch";
  const result = document.createElement("div");
  result.className = "result-cell";
  const statusPill = document.createElement("span");
  statusPill.className = `status-pill ${className}`;
  statusPill.append(createIcon(row.status === "Matched" ? "check" : "circle-alert", 13), document.createTextNode(row.status));
  result.append(statusPill, textElement("strong", comparisonDetail(row)), textElement("small", `Identity basis: ${row.matchBasis}`));
  if (row.reviewReason) result.append(textElement("small", row.reviewReason, "review-reason"));
  statusTd.append(result);

  tr.append(
    personTd,
    vendorTd,
    dateTd,
    timeCell("Payment", row.paymentIn, row.paymentOut, row.paymentSourceRow),
    timeCell("RM", row.rmIn, row.rmOut, row.rmSourceRow),
    statusTd,
  );
  return tr;
}

function renderRows() {
  const rows = visibleRows();
  const tbody = $("results-body");
  if (!rows.length) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 6;
    td.append(textElement("div", "No records match this filter.", "empty-state"));
    tr.append(td);
    tbody.replaceChildren(tr);
  } else {
    tbody.replaceChildren(...rows.map(rowElement));
  }
  $("result-count").textContent = `Showing ${rows.length} of ${payload.rows.length} records`;
}

function showDashboard() {
  $("empty-dashboard").hidden = true;
  $("results-page").hidden = false;
  renderMetrics();
  renderAudit();
  renderFilters();
  renderDateFilter();
  renderRows();
  if (payload.googleSheetUrl) {
    const driveButton = $("drive-button");
    driveButton.href = payload.googleSheetUrl;
    driveButton.hidden = false;
  }
}

try {
  const stored = sessionStorage.getItem(STORAGE_KEY);
  if (stored) payload = JSON.parse(stored);
} catch {
  sessionStorage.removeItem(STORAGE_KEY);
}

if (!payload?.rows || !payload?.stats) {
  $("empty-dashboard").hidden = false;
} else {
  showDashboard();
  $("download-button").addEventListener("click", () => exportWorkbook(payload));
  $("search-input").addEventListener("input", (event) => {
    query = event.currentTarget.value;
    renderRows();
  });
  $("date-filter").addEventListener("change", (event) => {
    activeDate = event.currentTarget.value;
    renderRows();
  });
}

const loaderDelay = Math.max(0, 650 - (performance.now() - loaderStartedAt));
window.setTimeout(() => {
  const loader = $("dashboard-loader");
  if (!loader) return;
  loader.classList.add("is-leaving");
  window.setTimeout(() => loader.remove(), 450);
}, loaderDelay);

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
