# Logseq Code Highlight Plugin

Enhanced syntax highlighting for code blocks in Logseq with beautiful color themes that automatically adapt to dark and light modes.

English | [简体中文](README_CN.md)

## ✨ Features

- **🎨 Beautiful Color Themes**: Vibrant, carefully selected colors for better code readability
- **🌓 Auto Theme Adaptation**: Automatically follows Logseq's dark/light theme setting
- **💻 Multiple Languages**: Enhanced highlighting for all languages supported by Logseq's CodeMirror
- **🚀 Lightweight**: Pure CSS-based approach with minimal performance impact
- **⚡ Zero Configuration**: Works immediately after installation

## 🎯 What It Does

This plugin enhances Logseq's default code syntax highlighting by:
- Providing more vibrant and distinct colors for different code elements
- Making keywords, strings, functions, and variables more visually distinct
- Automatically adapting color schemes to match your Logseq theme (dark/light mode)

## 🌈 Color Scheme

### Dark Theme
- **Keywords**: Bright blue (`#00bfff`) - bold
- **Strings**: Orange (`#ffcc88`)
- **Functions**: Yellow (`#ffe66d`) - bold
- **Numbers**: Bright green (`#b5ff8a`) - bold
- **Comments**: Green (`#6adb7a`) - italic
- **Variables**: Pink (`#ff9999`)
- **Types**: Cyan (`#4ec9b0`)

### Light Theme
- **Keywords**: Classic blue (`#0000ff`) - bold
- **Strings**: Red (`#a31515`)
- **Functions**: Brown (`#795e26`) - bold
- **Numbers**: Dark green (`#098658`) - bold
- **Comments**: Green (`#008000`) - italic
- **Variables**: Dark blue (`#001080`)
- **Types**: Teal (`#267f99`)

## 📦 Installation

### Manual Installation
1. Download the latest release or clone this repository
2. Build the plugin:
   ```bash
   npm install
   npm run build
   ```
3. In Logseq, go to `Settings` → `Plugins` → `Load unpacked plugin`
4. Select the plugin folder

## 🚀 Usage

Simply write code blocks in your Logseq pages using standard markdown syntax:

\`\`\`javascript
function greet(name) {
  // This is a comment
  const message = "Hello, " + name;
  return message;
}
\`\`\`

\`\`\`python
def calculate(x, y):
    # Calculate the sum
    result = x + y
    return result
\`\`\`

The plugin will automatically apply enhanced syntax highlighting to all code blocks!

## 🔧 Supported Languages

This plugin enhances syntax highlighting colors for **all languages supported by Logseq's built-in CodeMirror**.

### ⚠️ Important Note

**The supported languages are determined entirely by Logseq's built-in CodeMirror implementation.** This plugin only enhances the color scheme for syntax highlighting - it does not add support for new languages.

- ✅ If a language has syntax highlighting in vanilla Logseq, this plugin will enhance its colors
- ❌ If a language doesn't have syntax highlighting in vanilla Logseq, this plugin cannot add support for it

The plugin works by overriding the CSS styling of CodeMirror's syntax tokens (keywords, strings, functions, etc.), making them more vibrant and visually distinct.

## 🛠️ Development

```bash
# Install dependencies
npm install

# Development build with watch mode
npm run dev

# Production build
npm run build

# Create release package
npm run pack
```

## 📝 License

GPL-3.0 License - see [LICENSE](LICENSE) file for details

## 🙏 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📮 Issues

If you encounter any issues or have suggestions, please open an issue on GitHub.
