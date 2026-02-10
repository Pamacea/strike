/**
 * Strike Model Stylesheet System
 *
 * CSS-like configuration for LLM models, providers, and settings.
 */

class StylesheetParser {
  parse(stylesheet) {
    const rules = [];
    const ruleRegex = /([*#.][\w-]*)\s*\{([^}]+)\}/g;

    let match;
    while ((match = ruleRegex.exec(stylesheet)) !== null) {
      const selector = match[1].trim();
      const declarations = match[2];

      const props = {};
      const declRegex = /([\w-]+)\s*:\s*([^;]+);?/g;
      let declMatch;

      while ((declMatch = declRegex.exec(declarations)) !== null) {
        props[declMatch[1]] = declMatch[2].trim();
      }

      rules.push({ selector, props });
    }

    return rules;
  }
}

class ModelStylesheet {
  constructor() {
    this.rules = [];
    this.parser = new StylesheetParser();
  }

  load(stylesheetString) {
    this.rules = this.parser.parse(stylesheetString);
  }

  apply(node) {
    // Start with graph defaults
    const config = {};

    // Apply rules in order (later rules override earlier ones of same specificity)
    const applicableRules = this.rules.filter(rule =>
      this._matches(rule.selector, node)
    );

    // Sort by specificity
    applicableRules.sort((a, b) => this._specificity(a.selector) - this._specificity(b.selector));

    // Apply properties
    for (const rule of applicableRules) {
      Object.assign(config, rule.props);
    }

    // Explicit node attributes override everything
    if (node.llm_model) config.llm_model = node.llm_model;
    if (node.llm_provider) config.llm_provider = node.llm_provider;
    if (node.reasoning_effort) config.reasoning_effort = node.reasoning_effort;

    return config;
  }

  _matches(selector, node) {
    if (selector === '*') return true;

    if (selector.startsWith('#')) {
      return node.id === selector.substring(1);
    }

    if (selector.startsWith('.')) {
      const className = selector.substring(1);
      const nodeClasses = (node.class || '').split(',');
      return nodeClasses.includes(className);
    }

    return false;
  }

  _specificity(selector) {
    if (selector.startsWith('#')) return 2;
    if (selector.startsWith('.')) return 1;
    if (selector === '*') return 0;
    return 0;
  }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    StylesheetParser,
    ModelStylesheet
  };
}
