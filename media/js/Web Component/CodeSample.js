class CodeSample extends HTMLElement {
  static observedAttributes = ["language", "content"];

  connectedCallback() {
    this.language = this.getAttribute("lang");
    this.content = this.getAttribute("content");
    this.innerHTML = /* HTML */ `
    <div class="code">
      <h4></h4>
      <pre>
        <code class="">
        </code>
        </pre>
    </div>`;

    this.$title = this.querySelector("h4");
    this.$code = this.querySelector("code");

    this.renderLanguage();
  }
  renderLanguage() {
    this.$title.innerHTML = this.language;
    switch (this.language) {
      case "CSS":
        this.$code.setAttribute("class", "css-code");
        this.renderContent();
        const cssContent = this.$code.textContent;

        const highlightedCode = cssContent
          .replace(/([a-z-]+)(\s*:\s*)/gi, '<span class="property">$1</span>$2') // Propriétés
          .replace(/(:\s*)([^;]+)(;?)/g, '$1<span class="value">$2</span>$3'); // Valeurs
        this.$code.innerHTML = highlightedCode;
        break;

      case "JS":
        this.$code.setAttribute("class", "js-code");
        this.renderContent();
        const jsContent = this.$code.textContent;
        
        const highlightedJs = jsContent
          .replace(
            /\b(function|return|console|log)\b/g,
            '<span class="keyword">$1</span>'
          ) // Mots-clés
          .replace(/`([^`]+)`/g, '<span class="string">`$1`</span>') // Chaînes de caractères
          .replace(
            /\b([a-zA-Z_][a-zA-Z0-9_]*)\s*(?=\()/g,
            '<span class="function">$1</span>'
          ); // Noms de fonctions

        this.$code.innerHTML = highlightedJs;
        break;

      case "SCSS":
        this.$code.setAttribute("class", "scss-code");
        this.renderContent();
        const scssContent = this.$code.textContent;
        const highlightedScss = scssContent
          .replace(/\$[a-zA-Z0-9-_]+/g, '<span class="variable">$&</span>') // Variables
          .replace(
            /@mixin\s+([a-zA-Z0-9-_]+)/g,
            '@mixin <span class="mixin">$1</span>'
          ) // Mixins
          .replace(
            /@include\s+([a-zA-Z0-9-_]+)/g,
            '@include <span class="include">$1</span>'
          ) // Appels de mixins
          .replace(
            /([a-zA-Z-]+)(\s*:\s*)/g,
            '<span class="property">$1</span>$2'
          ) // Propriétés CSS
          .replace(/(:\s*)([^;]+)(;?)/g, '$1<span class="value">$2</span>$3'); // Valeurs CSS

        this.$code.innerHTML = highlightedScss;
        break;
    }
  }
  renderContent() {
    this.$code.innerHTML = this.content;
  }

  attributeChangedCallback(attribut, oldValue, newValue) {
    if (attribut === "lang") {
      this.language = newValue;

      this.renderLanguage();
    }
  }

  disconnectedCallback() {}
}

customElements.define("code-sample", CodeSample);
