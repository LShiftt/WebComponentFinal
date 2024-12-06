class CodeExec extends HTMLElement {
  static observedAttributes = ["content"];

  connectedCallback() {
    this.attachShadow({ mode: "open" });

    this.content = this.getAttribute("content");

    this.shadowRoot.innerHTML = /* HTML */ ` <style>
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
          }

          div {
            margin: 10px 0 0;
            overflow-x: auto;
            background-color: #f9f9f9;
            padding: 10px;
            border-radius: 5px;
          }
        }
      </style>
      <div class="code">
        <h4>Resultat</h4>
        <div class="res"></div>
      </div>`;

    this.$div = this.shadowRoot.querySelector("div[class='res']");
  }

  addDiv() {
    const div = document.createElement("div");
    div.textContent = "Je suis un Titre 1";
 }

  addH1() {
     const h1 = document.createElement("h1");
     h1.textContent = "Je suis un Titre 1";
  }

  addH2() {
    const h2 = document.createElement("h2");
    h2.textContent = "Je suis un Je suis un Titre 2";
 }

  disconnectedCallback() {}
}
customElements.define("code-exec", CodeExec);
