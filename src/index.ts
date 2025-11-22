import '@logseq/libs'

// Default color settings
const DEFAULT_COLORS = {
  dark: {
    keyword: '#00bfff',
    string: '#ffcc88',
    function: '#ffe66d',
    number: '#b5ff8a',
    comment: '#6adb7a',
    variable: '#ff9999',
    type: '#4ec9b0',
    operator: '#ffffff',
    meta: '#ffe66d',
  },
  light: {
    keyword: '#0000ff',
    string: '#a31515',
    function: '#795e26',
    number: '#098658',
    comment: '#008000',
    variable: '#001080',
    type: '#267f99',
    operator: '#000000',
    meta: '#af00db',
  }
}

// Settings schema
const settingsSchema = [
  {
    key: 'resetColors',
    type: 'boolean',
    default: false,
    title: '🔄 Reset All Colors to Defaults',
    description: 'Toggle this to reset all color settings to their default values (will auto-toggle back)',
  },
  {
    key: 'heading1',
    type: 'heading',
    title: '🌙 Dark Theme Colors',
    description: 'Configure colors for dark theme',
  },
  {
    key: 'darkKeyword',
    type: 'string',
    default: DEFAULT_COLORS.dark.keyword,
    title: 'Keywords',
    description: '⌨️ Color for keywords (if, while, function, class, etc.)',
    inputAs: 'color',
  },
  {
    key: 'darkString',
    type: 'string',
    default: DEFAULT_COLORS.dark.string,
    title: 'Strings',
    description: '📝 Color for string literals',
    inputAs: 'color',
  },
  {
    key: 'darkFunction',
    type: 'string',
    default: DEFAULT_COLORS.dark.function,
    title: 'Functions',
    description: '⚡ Color for function and method names',
    inputAs: 'color',
  },
  {
    key: 'darkNumber',
    type: 'string',
    default: DEFAULT_COLORS.dark.number,
    title: 'Numbers',
    description: '🔢 Color for numeric literals and constants',
    inputAs: 'color',
  },
  {
    key: 'darkComment',
    type: 'string',
    default: DEFAULT_COLORS.dark.comment,
    title: 'Comments',
    description: '💬 Color for code comments',
    inputAs: 'color',
  },
  {
    key: 'darkVariable',
    type: 'string',
    default: DEFAULT_COLORS.dark.variable,
    title: 'Variables',
    description: '📦 Color for variables and parameters',
    inputAs: 'color',
  },
  {
    key: 'darkType',
    type: 'string',
    default: DEFAULT_COLORS.dark.type,
    title: 'Types',
    description: '🏷️ Color for types, built-ins, and properties',
    inputAs: 'color',
  },
  {
    key: 'darkOperator',
    type: 'string',
    default: DEFAULT_COLORS.dark.operator,
    title: 'Operators',
    description: '➕ Color for operators and punctuation',
    inputAs: 'color',
  },
  {
    key: 'darkMeta',
    type: 'string',
    default: DEFAULT_COLORS.dark.meta,
    title: 'Directives/Meta',
    description: '📌 Color for preprocessor directives (include, import, etc.)',
    inputAs: 'color',
  },
  {
    key: 'heading2',
    type: 'heading',
    title: '☀️ Light Theme Colors',
    description: 'Configure colors for light theme',
  },
  {
    key: 'lightKeyword',
    type: 'string',
    default: DEFAULT_COLORS.light.keyword,
    title: 'Keywords',
    description: '⌨️ Color for keywords (if, while, function, class, etc.)',
    inputAs: 'color',
  },
  {
    key: 'lightString',
    type: 'string',
    default: DEFAULT_COLORS.light.string,
    title: 'Strings',
    description: '📝 Color for string literals',
    inputAs: 'color',
  },
  {
    key: 'lightFunction',
    type: 'string',
    default: DEFAULT_COLORS.light.function,
    title: 'Functions',
    description: '⚡ Color for function and method names',
    inputAs: 'color',
  },
  {
    key: 'lightNumber',
    type: 'string',
    default: DEFAULT_COLORS.light.number,
    title: 'Numbers',
    description: '🔢 Color for numeric literals and constants',
    inputAs: 'color',
  },
  {
    key: 'lightComment',
    type: 'string',
    default: DEFAULT_COLORS.light.comment,
    title: 'Comments',
    description: '💬 Color for code comments',
    inputAs: 'color',
  },
  {
    key: 'lightVariable',
    type: 'string',
    default: DEFAULT_COLORS.light.variable,
    title: 'Variables',
    description: '📦 Color for variables and parameters',
    inputAs: 'color',
  },
  {
    key: 'lightType',
    type: 'string',
    default: DEFAULT_COLORS.light.type,
    title: 'Types',
    description: '🏷️ Color for types, built-ins, and properties',
    inputAs: 'color',
  },
  {
    key: 'lightOperator',
    type: 'string',
    default: DEFAULT_COLORS.light.operator,
    title: 'Operators',
    description: '➕ Color for operators and punctuation',
    inputAs: 'color',
  },
  {
    key: 'lightMeta',
    type: 'string',
    default: DEFAULT_COLORS.light.meta,
    title: 'Directives/Meta',
    description: '📌 Color for preprocessor directives (include, import, etc.)',
    inputAs: 'color',
  },
]

// Generate CSS from settings
function generateCSS(settings: any) {
  const dark = {
    keyword: settings?.darkKeyword || DEFAULT_COLORS.dark.keyword,
    string: settings?.darkString || DEFAULT_COLORS.dark.string,
    function: settings?.darkFunction || DEFAULT_COLORS.dark.function,
    number: settings?.darkNumber || DEFAULT_COLORS.dark.number,
    comment: settings?.darkComment || DEFAULT_COLORS.dark.comment,
    variable: settings?.darkVariable || DEFAULT_COLORS.dark.variable,
    type: settings?.darkType || DEFAULT_COLORS.dark.type,
    operator: settings?.darkOperator || DEFAULT_COLORS.dark.operator,
    meta: settings?.darkMeta || DEFAULT_COLORS.dark.meta,
  }

  const light = {
    keyword: settings?.lightKeyword || DEFAULT_COLORS.light.keyword,
    string: settings?.lightString || DEFAULT_COLORS.light.string,
    function: settings?.lightFunction || DEFAULT_COLORS.light.function,
    number: settings?.lightNumber || DEFAULT_COLORS.light.number,
    comment: settings?.lightComment || DEFAULT_COLORS.light.comment,
    variable: settings?.lightVariable || DEFAULT_COLORS.light.variable,
    type: settings?.lightType || DEFAULT_COLORS.light.type,
    operator: settings?.lightOperator || DEFAULT_COLORS.light.operator,
    meta: settings?.lightMeta || DEFAULT_COLORS.light.meta,
  }

  return `
    /* ==========================================
       DARK THEME COLORS (default)
       ========================================== */

    /* Comments */
    .token.comment,
    .token.prolog,
    .token.doctype,
    .token.cdata,
    .cm-comment {
      color: ${dark.comment} !important;
      font-style: italic !important;
    }

    /* Keywords */
    .token.keyword,
    .token.control-flow,
    .token.directive,
    .token.important,
    .token.module,
    span.keyword,
    code .kw,
    pre .kw,
    code .keyword,
    pre .keyword,
    .cm-keyword {
      color: ${dark.keyword} !important;
      font-weight: bold !important;
    }

    /* Meta/Directives */
    .cm-meta {
      color: ${dark.meta} !important;
      font-weight: 600 !important;
    }

    /* Strings */
    code .token.string,
    pre .token.string,
    .token.string,
    .token.char,
    code .str,
    pre .str,
    .cm-string,
    .cm-string-2 {
      color: ${dark.string} !important;
    }

    /* Functions */
    code .token.function,
    pre .token.function,
    .token.function,
    .token.function-name,
    .token.class-name,
    code .fun,
    pre .fun,
    .cm-def,
    .cm-qualifier {
      color: ${dark.function} !important;
      font-weight: 600 !important;
    }

    /* Numbers */
    code .token.number,
    pre .token.number,
    .token.number,
    .token.boolean,
    .token.constant,
    code .num,
    pre .num,
    .cm-number,
    .cm-atom {
      color: ${dark.number} !important;
      font-weight: 600 !important;
    }

    /* Operators */
    code .token.operator,
    pre .token.operator,
    .token.operator,
    .token.punctuation,
    code .op,
    pre .op,
    .cm-operator {
      color: ${dark.operator} !important;
    }

    /* Variables */
    code .token.variable,
    pre .token.variable,
    .token.variable,
    .token.parameter,
    code .var,
    pre .var,
    .cm-variable {
      color: ${dark.variable} !important;
    }

    /* Types and Built-ins */
    code .token.builtin,
    pre .token.builtin,
    .token.builtin,
    .token.property,
    code .type,
    pre .type,
    .cm-builtin,
    .cm-type,
    .cm-variable-2,
    .cm-variable-3,
    .cm-property {
      color: ${dark.type} !important;
    }

    /* ==========================================
       LIGHT THEME COLORS
       ========================================== */

    /* Comments */
    html[data-theme="light"] .token.comment,
    html[data-theme="light"] .cm-comment,
    .light-theme .token.comment,
    .light-theme .cm-comment {
      color: ${light.comment} !important;
      font-style: italic !important;
    }

    /* Keywords */
    html[data-theme="light"] .token.keyword,
    html[data-theme="light"] .cm-keyword,
    .light-theme .token.keyword,
    .light-theme .cm-keyword,
    html[data-theme="light"] code .kw,
    html[data-theme="light"] pre .kw,
    .light-theme code .kw,
    .light-theme pre .kw {
      color: ${light.keyword} !important;
      font-weight: bold !important;
    }

    /* Meta/Directives */
    html[data-theme="light"] .cm-meta,
    .light-theme .cm-meta {
      color: ${light.meta} !important;
      font-weight: 600 !important;
    }

    /* Strings */
    html[data-theme="light"] .token.string,
    html[data-theme="light"] .cm-string,
    html[data-theme="light"] .cm-string-2,
    .light-theme .token.string,
    .light-theme .cm-string,
    .light-theme .cm-string-2 {
      color: ${light.string} !important;
    }

    /* Functions */
    html[data-theme="light"] .token.function,
    html[data-theme="light"] .cm-def,
    html[data-theme="light"] .cm-qualifier,
    .light-theme .token.function,
    .light-theme .cm-def,
    .light-theme .cm-qualifier {
      color: ${light.function} !important;
      font-weight: 600 !important;
    }

    /* Numbers */
    html[data-theme="light"] .token.number,
    html[data-theme="light"] .cm-number,
    html[data-theme="light"] .token.constant,
    html[data-theme="light"] .cm-atom,
    .light-theme .token.number,
    .light-theme .cm-number,
    .light-theme .token.constant,
    .light-theme .cm-atom {
      color: ${light.number} !important;
      font-weight: 600 !important;
    }

    /* Operators */
    html[data-theme="light"] .token.operator,
    html[data-theme="light"] .cm-operator,
    html[data-theme="light"] .token.punctuation,
    .light-theme .token.operator,
    .light-theme .cm-operator,
    .light-theme .token.punctuation {
      color: ${light.operator} !important;
    }

    /* Variables */
    html[data-theme="light"] .token.variable,
    html[data-theme="light"] .cm-variable,
    html[data-theme="light"] .token.parameter,
    .light-theme .token.variable,
    .light-theme .cm-variable,
    .light-theme .token.parameter {
      color: ${light.variable} !important;
    }

    /* Types and Built-ins */
    html[data-theme="light"] .token.builtin,
    html[data-theme="light"] .cm-builtin,
    html[data-theme="light"] .cm-type,
    html[data-theme="light"] .cm-variable-2,
    html[data-theme="light"] .cm-variable-3,
    html[data-theme="light"] .token.property,
    html[data-theme="light"] .cm-property,
    html[data-theme="light"] .token.class-name,
    .light-theme .token.builtin,
    .light-theme .cm-builtin,
    .light-theme .cm-type,
    .light-theme .cm-variable-2,
    .light-theme .cm-variable-3,
    .light-theme .token.property,
    .light-theme .cm-property,
    .light-theme .token.class-name {
      color: ${light.type} !important;
    }
  `
}

// Update CSS styles
function updateStyles() {
  const settings = logseq.settings
  const css = generateCSS(settings)

  logseq.provideStyle({
    key: 'code-highlight-colors',
    style: css
  })
}

async function main() {
  console.log('Code Highlight plugin starting...')

  // Register settings schema
  logseq.useSettingsSchema(settingsSchema)

  // Apply initial styles
  updateStyles()

  // Listen for settings changes
  logseq.onSettingsChanged(async (newSettings, oldSettings) => {
    console.log('Settings changed, updating styles...', newSettings)

    // Check if reset was triggered
    if (newSettings.resetColors === true) {
      console.log('Resetting all colors to defaults...')

      // Reset all color settings to defaults
      await logseq.updateSettings({
        resetColors: false, // Toggle back
        // Dark theme
        darkKeyword: DEFAULT_COLORS.dark.keyword,
        darkString: DEFAULT_COLORS.dark.string,
        darkFunction: DEFAULT_COLORS.dark.function,
        darkNumber: DEFAULT_COLORS.dark.number,
        darkComment: DEFAULT_COLORS.dark.comment,
        darkVariable: DEFAULT_COLORS.dark.variable,
        darkType: DEFAULT_COLORS.dark.type,
        darkOperator: DEFAULT_COLORS.dark.operator,
        darkMeta: DEFAULT_COLORS.dark.meta,
        // Light theme
        lightKeyword: DEFAULT_COLORS.light.keyword,
        lightString: DEFAULT_COLORS.light.string,
        lightFunction: DEFAULT_COLORS.light.function,
        lightNumber: DEFAULT_COLORS.light.number,
        lightComment: DEFAULT_COLORS.light.comment,
        lightVariable: DEFAULT_COLORS.light.variable,
        lightType: DEFAULT_COLORS.light.type,
        lightOperator: DEFAULT_COLORS.light.operator,
        lightMeta: DEFAULT_COLORS.light.meta,
      })

      logseq.UI.showMsg('✅ All colors reset to defaults!', 'success')

      // Force update styles with default colors
      setTimeout(() => {
        updateStyles()
      }, 100)
      return
    }

    updateStyles()
  })

  console.log('Code Highlight plugin loaded!')
}

logseq.ready(main).catch(console.error)
