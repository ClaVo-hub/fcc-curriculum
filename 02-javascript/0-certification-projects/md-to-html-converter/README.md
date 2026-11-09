# Markdown to HTML Converter

A live Markdown to HTML converter built with vanilla JavaScript for the freeCodeCamp JavaScript Certification. Type Markdown on the left and see the raw HTML and a rendered preview update as you type.

## Features

- Converts Markdown to HTML in real time using regular expressions
- Raw HTML output pane with a one-click **copy** button
- Rendered **preview** pane with a **fullscreen** mode
- **Download** the result as a standalone `.html` file
- **Light / dark** theme toggle
- Live **word and character counter**

## Supported Markdown

| Syntax                   | Output                      |
| ------------------------ | --------------------------- |
| `# `, `## `, `### `      | Headings (h1–h3)            |
| `**bold**` or `__bold__` | Bold                        |
| `*italic*` or `_italic_` | Italic                      |
| `~~text~~`               | Strikethrough               |
| `` `code` ``             | Inline code                 |
| `[text](url)`            | Links                       |
| `![alt](src)`            | Images                      |
| `> quote`                | Blockquotes                 |
| `- item` or `1. item`    | Unordered and ordered lists |

## Built with

HTML, CSS (custom properties for theming) and JavaScript (regex, DOM manipulation, Clipboard API, Fullscreen API, Blob downloads).

## What I practised

- Writing and ordering regular expressions for pattern matching
- Handling input events and updating the DOM
- Working with browser APIs (clipboard, fullscreen, file download)
- Debugging against automated tests

## Live demo

[Add your GitHub Pages link here]

## Credits

This project is part of the [freeCodeCamp](https://www.freecodecamp.org/) JavaScript Certification. I added the theme toggle, copy, download, fullscreen and counter features myself.
