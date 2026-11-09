const md = document.getElementById("markdown-input");
const html = document.getElementById("html-output");
const prev = document.getElementById("preview");
const prevWrapper = document.getElementById("preview-wrapper");
const fullscreenBtn = document.getElementById("fs-btn");
const themeBtn = document.getElementById("theme-btn");
const copyBtn = document.getElementById("copy-btn");
const downloadBtn = document.getElementById("download-btn");
const counterStatus = document.getElementById("counter-status");

const copyIcon = copyBtn.innerHTML; // saved once so the icon can always be restored
let currentTheme = "light";

themeBtn.addEventListener("click", () => {
  const moonSvg = `<svg class="icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;
  const sunSvg = `<svg class="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="4"/>
  <path d="M12 2v2"/>
  <path d="M12 20v2"/>
  <path d="m4.93 4.93 1.41 1.41"/>
  <path d="m17.66 17.66 1.41 1.41"/>
  <path d="M2 12h2"/>
  <path d="M20 12h2"/>
  <path d="m6.34 17.66-1.41 1.41"/>
  <path d="m19.07 4.93-1.41 1.41"/>
</svg>`;
  if (currentTheme === "light") {
    document.body.setAttribute("data-theme", "dark");
    themeBtn.innerHTML = `${sunSvg} Light Mode`;
    currentTheme = "dark";
  } else {
    document.body.setAttribute("data-theme", "light");
    themeBtn.innerHTML = `${moonSvg} Dark Mode`;
    currentTheme = "light";
  }
});

// FCC needs a regular function declaration with no parameter:
// it reads #markdown-input itself and returns the HTML string.
function convertMarkdown() {
  const input = md.value;

  // Unordered list check match to HTML
  let formatted = input.replace(/(?:^\s*[-*]\s+.+(?:\n|$))+/gm, (match) => {
    const items = match
      .split("\n")
      .filter((line) => line.trim() !== "")
      .map((line) => {
        const spaces = line.match(/^\s*/)[0].length;
        const cleanL = line.replace(/^\s*[-*]\s+/, "");
        if (spaces > 0) {
          return `<ul style="margin-left: 20px;"><li>${cleanL}</li></ul>`;
        }
        return `<li>${cleanL}</li>`;
      })
      .join("");
    return `<ul>${items}</ul>\n`; // keep the newline so the next line stays separate
  });

  // Ordered list check match to HTML
  formatted = formatted.replace(/(?:^\s*\d+\.\s+.+(?:\n|$))+/gm, (match) => {
    const items = match
      .split("\n")
      .filter((line) => line.trim() !== "")
      .map((line) => {
        const spaces = line.match(/^\s*/)[0].length;
        const cleanL = line.replace(/^\s*\d+\.\s+/, "");
        if (spaces > 0) {
          return `<ol style="margin-left: 20px;"><li>${cleanL}</li></ol>`;
        }
        return `<li>${cleanL}</li>`;
      })
      .join("");
    return `<ol>${items}</ol>\n`;
  });

  // Heading + blockquote check match to HTML
  const arr = formatted.split("\n");
  const output = arr.map((line) => {
    const clean = line.trim();
    if (/^<\/?(ul|ol|li)/i.test(clean)) {
      return clean;
    }
    const h1 = clean.match(/^#\s(.+)$/);
    if (h1) {
      return `<h1>${h1[1]}</h1>`;
    }
    const h2 = clean.match(/^##\s(.+)$/);
    if (h2) {
      return `<h2>${h2[1]}</h2>`;
    }
    const h3 = clean.match(/^###\s(.+)$/);
    if (h3) {
      return `<h3>${h3[1]}</h3>`;
    }
    const bq = clean.match(/^>\s?(.+)$/);
    if (bq) {
      return `<blockquote>${bq[1]}</blockquote>`;
    }
    return clean; // plain text: no <p> wrapper, the tests expect none
  });

  // text anywhere in .md to be replaced (order matters!).
  // Done per line, then joined with no separator:
  // the tests expect <h1>a</h1><h1>b</h1> and <strong>a</strong><strong>b</strong>
  return output
    .map((line) =>
      line
        .replace(/!\[(.*?)\]\((.+?)\)/g, '<img alt="$1" src="$2">')
        .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
        .replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>")
        .replace(/\*\*(.+?)\*\*(?!\*)/g, "<strong>$1</strong>")
        .replace(/__(.+?)__(?!_)/g, "<strong>$1</strong>")
        .replace(/\*(.+?)\*/g, "<em>$1</em>")
        .replace(/(?<!\w)_(.+?)_(?!\w)/g, "<em>$1</em>")
        .replace(/~~(.+?)~~/g, "<del>$1</del>")
        .replace(/`(.+?)`/g, "<code>$1</code>"),
    )
    .join("");
}

md.addEventListener("input", () => {
  const val = md.value;
  const result = convertMarkdown();
  html.textContent = result; // #html-output is a div, so textContent
  prev.innerHTML = result;

  const charCount = val.length;
  const wordCount = val.trim() === "" ? 0 : val.trim().split(/\s+/).length;

  counterStatus.textContent = `Words: ${wordCount} | Characters: ${charCount}`;
});

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    prevWrapper.requestFullscreen().catch((err) => {
      alert(`Error trying to enable full-screen mode: ${err.message}`);
    });
  } else {
    document.exitFullscreen();
  }
}

fullscreenBtn.addEventListener("click", () => toggleFullscreen());

copyBtn.addEventListener("click", () => {
  if (!html.textContent) {
    alert("Nothing to copy yet! Type some markdown first.");
    return;
  }
  navigator.clipboard
    .writeText(html.textContent)
    .then(() => {
      copyBtn.textContent = "  Copied!  ";
      copyBtn.style.backgroundColor = "#25a745";
      copyBtn.style.color = "#fff";

      setTimeout(() => {
        copyBtn.innerHTML = copyIcon;
        copyBtn.style.backgroundColor = "";
        copyBtn.style.color = "";
      }, 3500);
    })
    .catch((err) => {
      console.error("Could not copy text: ", err);
    });
});

downloadBtn.addEventListener("click", () => {
  if (!html.textContent) {
    alert("No content available to export.");
    return;
  }

  const fullHtmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exported Markdown Document</title>
    <style>
        body { font-family: sans-serif; line-height: 1.6; padding: 40px; max-width: 800px; margin: 0 auto; color: #333; }
        code { background: #f4f4f4; padding: 2px 6px; border-radius: 4px; font-family: monospace; }
        img { max-width: 100%; height: auto; display: block; margin: 20px 0; }
        a { color: #007bff; text-decoration: none; }
        a:hover { text-decoration: underline; }
    </style>
</head>
<body>
${html.textContent}
</body>
</html>`;

  const file = new Blob([fullHtmlContent], { type: "text/html" });
  const virtualDwLink = document.createElement("a");

  virtualDwLink.href = URL.createObjectURL(file);
  virtualDwLink.download = "compiled.document.html";

  document.body.appendChild(virtualDwLink);
  virtualDwLink.click();

  document.body.removeChild(virtualDwLink);
});
