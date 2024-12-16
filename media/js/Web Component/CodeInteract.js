class CodeInteract extends HTMLElement {
  static observedAttributes = ["html", "css", "nest"];

  connectedCallback() {
    this.attachShadow({ mode: "open" });

    this.html = this.getAttribute("html");
    console.log(this.html);
    this.css = this.getAttribute("css");
    console.log(this.css);
    this.nest = this.getAttribute("nest");
    console.log(this.nest);

    this.shadowRoot.innerHTML =
      /* HTML */
      `<style>
          *::selection {
            background: var(--color-selected);
            color: var(--color-main);
            box-decoration-break: clone;
          }
          .code {
            font-family: var(--code-font);
            background-color: #f4f4f4;
            border: 1px solid #ddd;
            padding: 10px;
            border-radius: 5px;

            h4 {
              margin: 0;
              font-size: 1.2rem;
              color: #333;
              font-family: var(--font-main);
            }

            pre {
              margin: 10px 0 0;
              overflow-x: auto;
              background-color: #f9f9f9;
              padding: 10px;
              border-radius: 5px;
            }
              
          }
            #button_container{
            text-align :center;
            padding: 2vw;
              button{
                width: 150;
                height: 50px;
                border-radius: 6px;
                border: 4px ridge ;
         
}
            }

          .css-code {
            color: #0070f3;
            /* Couleur pour les sélecteurs */
            font-size: 0.95rem;
            /* TODO: ajouter un span à chaque selecteur */

            .property {
              color: #d73a49;
              /* Couleur pour les propriétés CSS */
            }

            .value {
              color: #22863a;
              /* Couleur pour les valeurs CSS */
            }
          }
          #container {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: 1fr;
            grid-column-gap: 0px;
            grid-row-gap: 0px;
            overflow: auto;
            #code-sample1 {
              grid-area: 1 / 1 / 2 / 2;
            }
            #code-sample2 {
              grid-area: 1 / 2 / 2 / 3;
            }
          }
        </style>
        <style id="style"></style>
        <div id="container">
          <code-sample id="code-sample1"></code-sample>
          <code-sample id="code-sample2"></code-sample>
        </div>
        <div id="div" class="code"></div>
        <div id="button_container"><button id="button">CSS <-> CSS Nest</button></div>

         `;

    this.$div = this.shadowRoot.querySelector("div#div");
    this.$div.innerHTML = this.html;

    this.$style = this.shadowRoot.querySelector("style#style");
    this.$style.innerText = this.css;

    this.$codeSample1 = this.shadowRoot.querySelector(
      "code-sample#code-sample1"
    );
    console.log("give css");
    this.$codeSample1.setAttribute("lang", "CSS");
    this.$codeSample1.setAttribute("content", this.css);

    this.$codeSample2 = this.shadowRoot.querySelector(
      "code-sample#code-sample2"
    );
    
    this.$codeSample2.setAttribute("lang", "CSS NEST");
    this.$codeSample2.setAttribute("content", this.nest);

    this.$button = this.shadowRoot.querySelector("button#button");
    this.$button.addEventListener("click", () => this.useOther());

    this.nextLang = "";
  }
  useOther() {
    switch (this.nextLang) {
      case "css":
        console.log("css");
        this.$style.innerText = this.css;
        this.nextLang = "nest";
        break;
      case "nest":
        console.log("nest");
        this.$style.innerText = this.nest;
        this.nextLang = "css";
        break;
      default:
        console.log(`default`);
        this.nextLang = "nest";
        this.useOther();
        break;
    }
  }

  disconnectedCallback() { }
}
customElements.define("code-interact", CodeInteract);
