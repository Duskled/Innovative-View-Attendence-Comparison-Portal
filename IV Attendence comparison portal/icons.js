const SVG_NS = "http://www.w3.org/2000/svg";

const ICON_NODES = {
  "upload-cloud": [
    [
      "path",
      {
        "d": "M12 13v8",
        "key": "1l5pq0"
      }
    ],
    [
      "path",
      {
        "d": "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242",
        "key": "1pljnt"
      }
    ],
    [
      "path",
      {
        "d": "m8 17 4-4 4 4",
        "key": "1quai1"
      }
    ]
  ],
  "bar-chart-3": [
    [
      "path",
      {
        "d": "M3 3v16a2 2 0 0 0 2 2h16",
        "key": "c24i48"
      }
    ],
    [
      "path",
      {
        "d": "M18 17V9",
        "key": "2bz60n"
      }
    ],
    [
      "path",
      {
        "d": "M13 17V5",
        "key": "1frdt8"
      }
    ],
    [
      "path",
      {
        "d": "M8 17v-3",
        "key": "17ska0"
      }
    ]
  ],
  "shield-check": [
    [
      "path",
      {
        "d": "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
        "key": "oel41y"
      }
    ],
    [
      "path",
      {
        "d": "m9 12 2 2 4-4",
        "key": "dzmm74"
      }
    ]
  ],
  "sun": [
    [
      "circle",
      {
        "cx": "12",
        "cy": "12",
        "r": "4",
        "key": "4exip2"
      }
    ],
    [
      "path",
      {
        "d": "M12 2v2",
        "key": "tus03m"
      }
    ],
    [
      "path",
      {
        "d": "M12 20v2",
        "key": "1lh1kg"
      }
    ],
    [
      "path",
      {
        "d": "m4.93 4.93 1.41 1.41",
        "key": "149t6j"
      }
    ],
    [
      "path",
      {
        "d": "m17.66 17.66 1.41 1.41",
        "key": "ptbguv"
      }
    ],
    [
      "path",
      {
        "d": "M2 12h2",
        "key": "1t8f8n"
      }
    ],
    [
      "path",
      {
        "d": "M20 12h2",
        "key": "1q8mjw"
      }
    ],
    [
      "path",
      {
        "d": "m6.34 17.66-1.41 1.41",
        "key": "1m8zz5"
      }
    ],
    [
      "path",
      {
        "d": "m19.07 4.93-1.41 1.41",
        "key": "1shlcs"
      }
    ]
  ],
  "moon": [
    [
      "path",
      {
        "d": "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",
        "key": "kfwtm"
      }
    ]
  ],
  "check-circle-2": [
    [
      "circle",
      {
        "cx": "12",
        "cy": "12",
        "r": "10",
        "key": "1mglay"
      }
    ],
    [
      "path",
      {
        "d": "m9 12 2 2 4-4",
        "key": "dzmm74"
      }
    ]
  ],
  "calendar-days": [
    [
      "path",
      {
        "d": "M8 2v3",
        "key": "1ioesn"
      }
    ],
    [
      "path",
      {
        "d": "M16 2v3",
        "key": "otl347"
      }
    ],
    [
      "rect",
      {
        "x": "3",
        "y": "3",
        "width": "18",
        "height": "18",
        "rx": "2",
        "key": "h1oib"
      }
    ],
    [
      "path",
      {
        "d": "M3 9h18",
        "key": "1pudct"
      }
    ],
    [
      "path",
      {
        "d": "M8 13h.01",
        "key": "1sbv64"
      }
    ],
    [
      "path",
      {
        "d": "M12 13h.01",
        "key": "y0uutt"
      }
    ],
    [
      "path",
      {
        "d": "M16 13h.01",
        "key": "wip0gl"
      }
    ],
    [
      "path",
      {
        "d": "M8 17h.01",
        "key": "p3bg7i"
      }
    ],
    [
      "path",
      {
        "d": "M12 17h.01",
        "key": "p32p05"
      }
    ],
    [
      "path",
      {
        "d": "M16 17h.01",
        "key": "ql8jdd"
      }
    ]
  ],
  "file-spreadsheet": [
    [
      "path",
      {
        "d": "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
        "key": "1oefj6"
      }
    ],
    [
      "path",
      {
        "d": "M14 2v5a1 1 0 0 0 1 1h5",
        "key": "wfsgrz"
      }
    ],
    [
      "path",
      {
        "d": "M8 13h2",
        "key": "yr2amv"
      }
    ],
    [
      "path",
      {
        "d": "M14 13h2",
        "key": "un5t4a"
      }
    ],
    [
      "path",
      {
        "d": "M8 17h2",
        "key": "2yhykz"
      }
    ],
    [
      "path",
      {
        "d": "M14 17h2",
        "key": "10kma7"
      }
    ]
  ],
  "info": [
    [
      "circle",
      {
        "cx": "12",
        "cy": "12",
        "r": "10",
        "key": "1mglay"
      }
    ],
    [
      "path",
      {
        "d": "M12 16v-4",
        "key": "1dtifu"
      }
    ],
    [
      "path",
      {
        "d": "M12 8h.01",
        "key": "e9boi3"
      }
    ]
  ],
  "scan-line": [
    [
      "path",
      {
        "d": "M3 7V5a2 2 0 0 1 2-2h2",
        "key": "aa7l1z"
      }
    ],
    [
      "path",
      {
        "d": "M17 3h2a2 2 0 0 1 2 2v2",
        "key": "4qcy5o"
      }
    ],
    [
      "path",
      {
        "d": "M21 17v2a2 2 0 0 1-2 2h-2",
        "key": "6vwrx8"
      }
    ],
    [
      "path",
      {
        "d": "M7 21H5a2 2 0 0 1-2-2v-2",
        "key": "ioqczr"
      }
    ],
    [
      "path",
      {
        "d": "M7 12h10",
        "key": "b7w52i"
      }
    ]
  ],
  "cloud": [
    [
      "path",
      {
        "d": "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z",
        "key": "p7xjir"
      }
    ]
  ],
  "circle-alert": [
    [
      "circle",
      {
        "cx": "12",
        "cy": "12",
        "r": "10",
        "key": "1mglay"
      }
    ],
    [
      "line",
      {
        "x1": "12",
        "x2": "12",
        "y1": "8",
        "y2": "12",
        "key": "1pkeuh"
      }
    ],
    [
      "line",
      {
        "x1": "12",
        "x2": "12.01",
        "y1": "16",
        "y2": "16",
        "key": "4dfq90"
      }
    ]
  ],
  "git-compare-arrows": [
    [
      "circle",
      {
        "cx": "5",
        "cy": "6",
        "r": "3",
        "key": "1qnov2"
      }
    ],
    [
      "path",
      {
        "d": "M12 6h5a2 2 0 0 1 2 2v7",
        "key": "1yj91y"
      }
    ],
    [
      "path",
      {
        "d": "m15 9-3-3 3-3",
        "key": "1lwv8l"
      }
    ],
    [
      "circle",
      {
        "cx": "19",
        "cy": "18",
        "r": "3",
        "key": "1qljk2"
      }
    ],
    [
      "path",
      {
        "d": "M12 18H7a2 2 0 0 1-2-2V9",
        "key": "16sdep"
      }
    ],
    [
      "path",
      {
        "d": "m9 15 3 3-3 3",
        "key": "1m3kbl"
      }
    ]
  ],
  "arrow-right": [
    [
      "path",
      {
        "d": "M5 12h14",
        "key": "1ays0h"
      }
    ],
    [
      "path",
      {
        "d": "m12 5 7 7-7 7",
        "key": "xquz4c"
      }
    ]
  ],
  "check": [
    [
      "path",
      {
        "d": "M20 6 9 17l-5-5",
        "key": "1gmf2c"
      }
    ]
  ],
  "lock-keyhole": [
    [
      "circle",
      {
        "cx": "12",
        "cy": "16",
        "r": "1",
        "key": "1au0dj"
      }
    ],
    [
      "rect",
      {
        "x": "3",
        "y": "10",
        "width": "18",
        "height": "12",
        "rx": "2",
        "key": "6s8ecr"
      }
    ],
    [
      "path",
      {
        "d": "M7 10V7a5 5 0 0 1 10 0v3",
        "key": "1pqi11"
      }
    ]
  ],
  "x": [
    [
      "path",
      {
        "d": "M18 6 6 18",
        "key": "1bl5f8"
      }
    ],
    [
      "path",
      {
        "d": "m6 6 12 12",
        "key": "d8bk6v"
      }
    ]
  ],
  "arrow-left": [
    [
      "path",
      {
        "d": "m12 19-7-7 7-7",
        "key": "1l729n"
      }
    ],
    [
      "path",
      {
        "d": "M19 12H5",
        "key": "x3x0zl"
      }
    ]
  ],
  "download": [
    [
      "path",
      {
        "d": "M12 15V3",
        "key": "m9g1x1"
      }
    ],
    [
      "path",
      {
        "d": "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
        "key": "ih7n3h"
      }
    ],
    [
      "path",
      {
        "d": "m7 10 5 5 5-5",
        "key": "brsn70"
      }
    ]
  ],
  "users": [
    [
      "path",
      {
        "d": "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
        "key": "1yyitq"
      }
    ],
    [
      "path",
      {
        "d": "M16 3.128a4 4 0 0 1 0 7.744",
        "key": "16gr8j"
      }
    ],
    [
      "path",
      {
        "d": "M22 21v-2a4 4 0 0 0-3-3.87",
        "key": "kshegd"
      }
    ],
    [
      "circle",
      {
        "cx": "9",
        "cy": "7",
        "r": "4",
        "key": "nufk8"
      }
    ]
  ],
  "x-circle": [
    [
      "circle",
      {
        "cx": "12",
        "cy": "12",
        "r": "10",
        "key": "1mglay"
      }
    ],
    [
      "path",
      {
        "d": "m15 9-6 6",
        "key": "1uzhvr"
      }
    ],
    [
      "path",
      {
        "d": "m9 9 6 6",
        "key": "z0biqf"
      }
    ]
  ],
  "search": [
    [
      "path",
      {
        "d": "m21 21-4.34-4.34",
        "key": "14j7rj"
      }
    ],
    [
      "circle",
      {
        "cx": "11",
        "cy": "11",
        "r": "8",
        "key": "4ej97u"
      }
    ]
  ],
  "cog": [
    [
      "path",
      {
        "d": "M11 10.27 7 3.34",
        "key": "16pf9h"
      }
    ],
    [
      "path",
      {
        "d": "m11 13.73-4 6.93",
        "key": "794ttg"
      }
    ],
    [
      "path",
      {
        "d": "M12 22v-2",
        "key": "1osdcq"
      }
    ],
    [
      "path",
      {
        "d": "M12 2v2",
        "key": "tus03m"
      }
    ],
    [
      "path",
      {
        "d": "M14 12h8",
        "key": "4f43i9"
      }
    ],
    [
      "path",
      {
        "d": "m17 20.66-1-1.73",
        "key": "eq3orb"
      }
    ],
    [
      "path",
      {
        "d": "m17 3.34-1 1.73",
        "key": "2wel8s"
      }
    ],
    [
      "path",
      {
        "d": "M2 12h2",
        "key": "1t8f8n"
      }
    ],
    [
      "path",
      {
        "d": "m20.66 17-1.73-1",
        "key": "sg0v6f"
      }
    ],
    [
      "path",
      {
        "d": "m20.66 7-1.73 1",
        "key": "1ow05n"
      }
    ],
    [
      "path",
      {
        "d": "m3.34 17 1.73-1",
        "key": "nuk764"
      }
    ],
    [
      "path",
      {
        "d": "m3.34 7 1.73 1",
        "key": "1ulond"
      }
    ],
    [
      "circle",
      {
        "cx": "12",
        "cy": "12",
        "r": "2",
        "key": "1c9p78"
      }
    ],
    [
      "circle",
      {
        "cx": "12",
        "cy": "12",
        "r": "8",
        "key": "46899m"
      }
    ]
  ],
  "loader-circle": [
    [
      "path",
      {
        "d": "M21 12a9 9 0 1 1-6.219-8.56",
        "key": "13zald"
      }
    ]
  ]
};

export function createIcon(name, size = 18, options = {}) {
  const nodes = ICON_NODES[name];
  if (!nodes) throw new Error(`Unknown bundled icon: ${name}`);

  const svg = document.createElementNS(SVG_NS, "svg");
  svg.setAttribute("width", String(size));
  svg.setAttribute("height", String(size));
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", String(options.strokeWidth ?? 2));
  svg.setAttribute("stroke-linecap", "round");
  svg.setAttribute("stroke-linejoin", "round");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("focusable", "false");
  svg.classList.add("lucide", `lucide-${name}`);
  if (options.className) svg.classList.add(...options.className.split(/\s+/).filter(Boolean));

  nodes.forEach(([tag, attributes]) => {
    const node = document.createElementNS(SVG_NS, tag);
    Object.entries(attributes).forEach(([key, value]) => {
      if (key !== "key") node.setAttribute(key, String(value));
    });
    svg.append(node);
  });

  return svg;
}

export function setIcon(target, name, size = 18, options = {}) {
  target.replaceChildren(createIcon(name, size, options));
  target.dataset.lucide = name;
  target.dataset.size = String(size);
  return target;
}

export function hydrateIcons(root = document) {
  root.querySelectorAll("[data-lucide]").forEach((target) => {
    const size = Number(target.dataset.size) || 18;
    const strokeWidth = Number(target.dataset.strokeWidth) || 2;
    setIcon(target, target.dataset.lucide, size, { strokeWidth });
  });
}

