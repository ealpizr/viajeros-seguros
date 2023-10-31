class ViajerosSolosHeader extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <style>
      header {
        background-color: #73a942;
        padding: 20px 100px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .logo {
        width: 25%;
        min-width: 300px;
      }
      .navigation {
        display: flex;
        align-items: center;
        gap: 40px;
      }
      .navigation-link {
        position: relative;
        font-size: 1.1em;
        color: #fff;
        text-decoration: none;
        font-weight: 500;
      }
      .navigation-link::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: -6px;
        width: 100%;
        height: 3px;
        background: #fff;
        border-radius: 5px;
        transform: scaleX(0);
        transition: 0.5s;
      }
      .navigation-link:hover::after {
        transform: scaleX(1);
      }
      .navigation .btn-popup {
        text-decoration: none;
        padding: 15px 25px;
        background: transparent;
        border: 2px solid #fff;
        outline: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 1.1em;
        color: #fff;
        font-weight: 500;
        transition: 0.5s;
      }
      .navigation .btn-popup:hover {
        background: #fff;
        color: #000000;
      }
      @media (max-width: 1024px) {
        header {
            padding: 20px 20px;
        }
        .logo {
          min-width: 250px;
        }
        .navigation-link {
          font-size: 1rem;
        }
        .navigation .btn-popup {
          padding: 10px 20px;
        }
      }
    </style>
    <header>
        <img src="/assets/images/logo.png" class="logo">
        <nav class="navigation">
          <a class="navigation-link" href="/">Inicio</a>
          <a class="navigation-link" href="/about-us">Nuestro equipo</a>
          <a class="btn-popup" href="/app/login">Iniciar sesión</a>
        </nav>
    </header>
    `;
  }
}

customElements.define("viajeros-solos-header", ViajerosSolosHeader);
