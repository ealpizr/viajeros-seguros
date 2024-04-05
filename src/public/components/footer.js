class ViajerosSolosFooter extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <style>
      .footer {
        background-color: #73A942;
        color: #fff;
        text-align: center;
        padding: 2px;
      }
    </style>
    <footer class="footer">
        <p>&copy; Viajeros Seguros 2023 Todos los derechos reservados.</p>
    </footer>
    `;
  }
}

customElements.define("viajeros-solos-footer", ViajerosSolosFooter);
