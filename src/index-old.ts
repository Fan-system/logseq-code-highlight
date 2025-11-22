import '@logseq/libs'
import Prism from 'prismjs'
import './styles.css'

// Import common languages
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-rust'
import 'prismjs/components/prism-go'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-c'
import 'prismjs/components/prism-cpp'
import 'prismjs/components/prism-csharp'
import 'prismjs/components/prism-ruby'
import 'prismjs/components/prism-php'
import 'prismjs/components/prism-swift'
import 'prismjs/components/prism-kotlin'
import 'prismjs/components/prism-sql'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-shell-session'
import 'prismjs/components/prism-powershell'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-toml'
import 'prismjs/components/prism-markdown'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-scss'
import 'prismjs/components/prism-less'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-docker'
import 'prismjs/components/prism-diff'
import 'prismjs/components/prism-git'
import 'prismjs/components/prism-graphql'
import 'prismjs/components/prism-lua'
import 'prismjs/components/prism-vim'
import 'prismjs/components/prism-regex'

// Prism plugins
import 'prismjs/plugins/line-numbers/prism-line-numbers'
import 'prismjs/plugins/diff-highlight/prism-diff-highlight'

interface PluginSettings {
  fontSize: number
}

const DEFAULT_SETTINGS: PluginSettings = {
  fontSize: 14
}

let settings: PluginSettings = DEFAULT_SETTINGS

// Language aliases mapping
const LANGUAGE_ALIASES: Record<string, string> = {
  'js': 'javascript',
  'ts': 'typescript',
  'py': 'python',
  'rb': 'ruby',
  'sh': 'bash',
  'shell': 'bash',
  'zsh': 'bash',
  'yml': 'yaml',
  'dockerfile': 'docker',
  'cs': 'csharp',
  'c++': 'cpp',
  'objective-c': 'objectivec',
  'objc': 'objectivec'
}

function applyFontSize(size: number) {
  document.documentElement.style.setProperty('--code-font-size', `${size}px`)
}

async function main() {
  // Find all code blocks in Logseq - search for any <code> element
  const allCodeElements = document.querySelectorAll('code')

  console.log('Code Highlight: Found', allCodeElements.length, 'code elements')

  allCodeElements.forEach((codeElement) => {
    const el = codeElement as HTMLElement

    // Skip if already highlighted
    if (el.classList.contains('code-highlighted')) {
      return
    }

    // Get parent pre element
    const preElement = el.closest('pre') as HTMLPreElement
    if (!preElement) {
      return
    }

    console.log('Code Highlight: Processing code block', {
      classes: el.className,
      parent: preElement.className,
      dataLang: el.getAttribute('data-lang'),
      textLength: el.textContent?.length
    })

    // Get language from various sources
    let language = 'plaintext'

    // Method 1: Check data-lang attribute on code element
    const dataLang = el.getAttribute('data-lang')
    if (dataLang) {
      language = getLanguage(dataLang)
    }

    // Method 2: Check data-lang on pre element
    if (language === 'plaintext') {
      const preLang = preElement.getAttribute('data-lang') || preElement.getAttribute('data-language')
      if (preLang) {
        language = getLanguage(preLang)
      }
    }

    // Method 3: Check class names
    if (language === 'plaintext') {
      const classes = el.className.split(' ')
      for (const cls of classes) {
        if (cls.startsWith('language-')) {
          language = getLanguage(cls.replace('language-', ''))
          break
        }
      }
    }

    // Method 4: Check parent class names
    if (language === 'plaintext') {
      const parentClasses = preElement.className.split(' ')
      for (const cls of parentClasses) {
        if (cls.startsWith('language-')) {
          language = getLanguage(cls.replace('language-', ''))
          break
        }
      }
    }

    console.log('Code Highlight: Detected language:', language)

    // Always try to highlight, even if language is plaintext
    const code = el.textContent || ''
    console.log('Code Highlight: Code length:', code.length, 'Preview:', code.substring(0, 50))

    // Check if Prism supports this language
    const grammar = Prism.languages[language]
    if (grammar) {
      console.log('Code Highlight: ✓ Grammar found for:', language)
      try {
        const highlighted = Prism.highlight(code, grammar, language)
        console.log('Code Highlight: Highlighted HTML preview:', highlighted.substring(0, 100))
        el.innerHTML = highlighted
        console.log('Code Highlight: ✓ Successfully applied highlighting')
      } catch (err) {
        console.error('Code Highlight: ✗ Error highlighting:', err)
      }
    } else {
      console.log('Code Highlight: ✗ No grammar found for language:', language)
      console.log('Available languages:', Object.keys(Prism.languages).join(', '))
    }

    // Mark as highlighted
    el.classList.add('code-highlighted')

    // Add wrapper for features
    const wrapper = document.createElement('div')
    wrapper.className = 'code-block-wrapper'
    preElement.parentNode?.insertBefore(wrapper, preElement)
    wrapper.appendChild(preElement)

    // Add line numbers
    if (settings.showLineNumbers) {
      preElement.classList.add('line-numbers')
      addLineNumbers(preElement, codeElement)
    }

    // Add copy button
    if (settings.showCopyButton) {
      addCopyButton(wrapper, codeElement.textContent || '')
    }

    // Add folding button
    if (settings.enableFolding) {
      addFoldingButton(wrapper, preElement)
    }

    // Add language label
    if (language !== 'plaintext') {
      addLanguageLabel(wrapper, language)
    }
  })
}

function addLineNumbers(pre: HTMLPreElement, code: HTMLElement) {
  const lines = (code.textContent || '').split('\n')
  const lineCount = lines.length

  // Remove trailing empty line
  const actualLineCount = lines[lineCount - 1] === '' ? lineCount - 1 : lineCount

  const lineNumbersWrapper = document.createElement('span')
  lineNumbersWrapper.className = 'line-numbers-rows'
  lineNumbersWrapper.setAttribute('aria-hidden', 'true')

  for (let i = 0; i < actualLineCount; i++) {
    const span = document.createElement('span')
    lineNumbersWrapper.appendChild(span)
  }

  pre.appendChild(lineNumbersWrapper)
}

function addCopyButton(wrapper: HTMLDivElement, code: string) {
  const button = document.createElement('button')
  button.className = 'code-copy-btn'
  button.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>
  `
  button.title = 'Copy code'

  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(code)
      button.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      `
      button.classList.add('copied')

      setTimeout(() => {
        button.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
        `
        button.classList.remove('copied')
      }, 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  })

  wrapper.appendChild(button)
}

function addFoldingButton(wrapper: HTMLDivElement, pre: HTMLPreElement) {
  const button = document.createElement('button')
  button.className = 'code-fold-btn'
  button.innerHTML = `
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  `
  button.title = 'Collapse code'

  let isCollapsed = false

  button.addEventListener('click', () => {
    isCollapsed = !isCollapsed

    if (isCollapsed) {
      pre.classList.add('collapsed')
      button.innerHTML = `
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      `
      button.title = 'Expand code'
    } else {
      pre.classList.remove('collapsed')
      button.innerHTML = `
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      `
      button.title = 'Collapse code'
    }
  })

  wrapper.appendChild(button)
}

function addLanguageLabel(wrapper: HTMLDivElement, language: string) {
  const label = document.createElement('span')
  label.className = 'code-language-label'
  label.textContent = language.toUpperCase()
  wrapper.appendChild(label)
}

function applyTheme(themeName: string) {
  // Remove existing theme class
  document.body.classList.forEach(cls => {
    if (cls.startsWith('code-theme-')) {
      document.body.classList.remove(cls)
    }
  })

  // Add new theme class
  document.body.classList.add(`code-theme-${themeName}`)
}

function applyFontSize(size: number) {
  document.documentElement.style.setProperty('--code-font-size', `${size}px`)
}

function setupObserver() {
  const observer = new MutationObserver((mutations) => {
    let shouldHighlight = false

    for (const mutation of mutations) {
      if (mutation.type === 'childList') {
        for (const node of mutation.addedNodes) {
          if (node instanceof HTMLElement) {
            if (node.querySelector('pre code') || node.matches('pre code')) {
              shouldHighlight = true
              break
            }
          }
        }
      }
      if (shouldHighlight) break
    }

    if (shouldHighlight) {
      requestAnimationFrame(highlightCodeBlocks)
    }
  })

  observer.observe(document.body, {
    childList: true,
    subtree: true
  })

  return observer
}

async function main() {
  console.log('Code Highlight plugin starting...')

  // Load settings
  const savedSettings = logseq.settings as Partial<PluginSettings> | undefined
  settings = { ...DEFAULT_SETTINGS, ...savedSettings }

  // Inject CSS - only colors, let Logseq handle layout
  logseq.provideStyle({
    key: 'code-highlight-colors',
    style: `
    /* ==========================================
       DARK THEME COLORS (default)
       ========================================== */

    /* Syntax highlighting colors - High priority */
    .token.comment,
    .token.prolog,
    .token.doctype,
    .token.cdata {
      color: #6adb7a !important;
      font-style: italic !important;
    }

    /* Keywords - Override Logseq's red color with blue */
    code .token.keyword,
    pre .token.keyword,
    .token.keyword,
    .token.control-flow,
    .token.directive,
    .token.important,
    .token.module,
    span.keyword,
    .extensions__code .token.keyword,
    [class*="language-"] .token.keyword {
      color: #00bfff !important;
      font-weight: bold !important;
    }

    /* Also override any 'kw' or 'keyword' classes Logseq might use */
    code .kw,
    pre .kw,
    code .keyword,
    pre .keyword {
      color: #00bfff !important;
      font-weight: bold !important;
    }

    /* Strings - orange */
    code .token.string,
    pre .token.string,
    .token.string,
    .token.char,
    code .str,
    pre .str {
      color: #ffcc88 !important;
    }

    /* Functions - yellow */
    code .token.function,
    pre .token.function,
    .token.function,
    .token.function-name,
    .token.class-name,
    code .fun,
    pre .fun {
      color: #ffe66d !important;
      font-weight: 600 !important;
    }

    /* Numbers - bright green */
    code .token.number,
    pre .token.number,
    .token.number,
    .token.boolean,
    .token.constant,
    code .num,
    pre .num {
      color: #b5ff8a !important;
      font-weight: 600 !important;
    }

    /* Operators - white */
    code .token.operator,
    pre .token.operator,
    .token.operator,
    .token.punctuation,
    code .op,
    pre .op {
      color: #ffffff !important;
    }

    /* Variables - pink */
    code .token.variable,
    pre .token.variable,
    .token.variable,
    .token.parameter,
    code .var,
    pre .var {
      color: #ff9999 !important;
    }

    /* Built-in types - cyan */
    code .token.builtin,
    pre .token.builtin,
    .token.builtin,
    .token.property,
    code .type,
    pre .type {
      color: #4ec9b0 !important;
    }

    /* Override Logseq's CodeMirror colors */
    .cm-keyword { color: #00bfff !important; font-weight: bold !important; }
    .cm-variable { color: #ff9999 !important; }
    .cm-variable-2 { color: #4ec9b0 !important; }
    .cm-variable-3 { color: #4ec9b0 !important; }
    .cm-type { color: #4ec9b0 !important; }
    .cm-def { color: #ffe66d !important; }
    .cm-string { color: #ffcc88 !important; }
    .cm-string-2 { color: #ffcc88 !important; }
    .cm-comment { color: #6adb7a !important; font-style: italic !important; }
    .cm-number { color: #b5ff8a !important; }
    .cm-atom { color: #b5ff8a !important; }
    .cm-operator { color: #ffffff !important; }
    .cm-builtin { color: #4ec9b0 !important; }
    .cm-property { color: #4ec9b0 !important; }
    .cm-meta { color: #ffe66d !important; }
    .cm-qualifier { color: #ffe66d !important; }

    /* ==========================================
       LIGHT THEME COLORS
       ========================================== */

    html[data-theme="light"] .token.comment,
    html[data-theme="light"] .cm-comment,
    .light-theme .token.comment,
    .light-theme .cm-comment {
      color: #008000 !important;
      font-style: italic !important;
    }

    html[data-theme="light"] .token.keyword,
    html[data-theme="light"] .cm-keyword,
    .light-theme .token.keyword,
    .light-theme .cm-keyword {
      color: #0000ff !important;
      font-weight: bold !important;
    }

    html[data-theme="light"] .token.string,
    html[data-theme="light"] .cm-string,
    .light-theme .token.string,
    .light-theme .cm-string {
      color: #a31515 !important;
    }

    html[data-theme="light"] .token.function,
    html[data-theme="light"] .cm-def,
    .light-theme .token.function,
    .light-theme .cm-def {
      color: #795e26 !important;
      font-weight: 600 !important;
    }

    html[data-theme="light"] .token.number,
    html[data-theme="light"] .cm-number,
    .light-theme .token.number,
    .light-theme .cm-number {
      color: #098658 !important;
      font-weight: 600 !important;
    }

    html[data-theme="light"] .token.operator,
    html[data-theme="light"] .cm-operator,
    .light-theme .token.operator,
    .light-theme .cm-operator {
      color: #000000 !important;
    }

    html[data-theme="light"] .token.variable,
    html[data-theme="light"] .cm-variable,
    .light-theme .token.variable,
    .light-theme .cm-variable {
      color: #001080 !important;
    }

    html[data-theme="light"] .token.builtin,
    html[data-theme="light"] .cm-builtin,
    html[data-theme="light"] .cm-type,
    html[data-theme="light"] .cm-variable-2,
    .light-theme .token.builtin,
    .light-theme .cm-builtin,
    .light-theme .cm-type {
      color: #267f99 !important;
    }

    html[data-theme="light"] .cm-meta,
    html[data-theme="light"] .cm-qualifier,
    .light-theme .cm-meta,
    .light-theme .cm-qualifier {
      color: #af00db !important;
    }

    html[data-theme="light"] .token.property,
    html[data-theme="light"] .cm-property,
    .light-theme .token.property,
    .light-theme .cm-property {
      color: #001080 !important;
    }

    html[data-theme="light"] .token.parameter,
    .light-theme .token.parameter {
      color: #001080 !important;
    }

    html[data-theme="light"] .token.punctuation,
    .light-theme .token.punctuation {
      color: #000000 !important;
    }

    html[data-theme="light"] .token.class-name,
    html[data-theme="light"] .token.method,
    .light-theme .token.class-name,
    .light-theme .token.method {
      color: #267f99 !important;
      font-weight: 600 !important;
    }

    html[data-theme="light"] .token.constant,
    html[data-theme="light"] .cm-atom,
    .light-theme .token.constant,
    .light-theme .cm-atom {
      color: #0000ff !important;
      font-weight: 600 !important;
    }

    html[data-theme="light"] .cm-variable-3,
    .light-theme .cm-variable-3 {
      color: #001080 !important;
    }
  `
  })

  console.log('Code Highlight: CSS injected')

  // Register settings schema
  logseq.useSettingsSchema([
    {
      key: 'fontSize',
      type: 'number',
      title: 'Code Font Size (px)',
      description: 'Adjust the font size for code blocks (default: 14)',
      default: DEFAULT_SETTINGS.fontSize
    }
  ])

  // Listen for font size changes
  logseq.onSettingsChanged((newSettings) => {
    settings = { ...DEFAULT_SETTINGS, ...newSettings }
    applyFontSize(settings.fontSize)
  })

  // Apply initial font size
  applyFontSize(settings.fontSize)

  // Show debug info on page
  setTimeout(() => {
    const codeBlocks = document.querySelectorAll('code')
    logseq.UI.showMsg(`Found ${codeBlocks.length} code blocks`, 'success')

    highlightCodeBlocks()

    setTimeout(() => {
      const highlighted = document.querySelectorAll('.code-highlighted')
      const tokens = document.querySelectorAll('.token')
      logseq.UI.showMsg(`Highlighted: ${highlighted.length}, Tokens: ${tokens.length}`, 'info')
    }, 1000)
  }, 2000)

  // Setup observer for new content
  setupObserver()

  // Register command to manually refresh highlighting (no keybinding to avoid conflicts)
  logseq.App.registerCommand('refresh-highlight', {
    key: 'refresh-code-highlight',
    label: 'Code Highlight: Refresh Highlighting'
  }, () => {
    document.querySelectorAll('.code-highlighted').forEach(el => {
      el.classList.remove('code-highlighted')
    })
    document.querySelectorAll('.code-block-wrapper').forEach(el => {
      const pre = el.querySelector('pre')
      if (pre) {
        el.parentNode?.insertBefore(pre, el)
        el.remove()
      }
    })
    highlightCodeBlocks()
    logseq.UI.showMsg('Code highlighting refreshed!')
  })

  console.log('Code Highlight plugin loaded!')
}

logseq.ready(main).catch(console.error)
