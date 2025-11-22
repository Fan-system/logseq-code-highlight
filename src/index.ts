import '@logseq/libs'

async function main() {
  console.log('Code Highlight plugin starting...')

  // Inject CSS - only colors
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

    /* Keywords - Make VERY blue and bold */
    .token.keyword,
    .token.control-flow,
    .token.directive,
    .token.important,
    .token.module,
    span.keyword {
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

  console.log('Code Highlight plugin loaded!')
}

logseq.ready(main).catch(console.error)
