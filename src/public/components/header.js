function toggleMobileMenu() {
  const mobileOverlay = document.querySelector(".mobile-overlay");
  mobileOverlay.style.display =
    mobileOverlay.style.display === "block" ? "none" : "block";
}

class ViajerosSolosHeader extends HTMLElement {
  constructor() {
    super();
  }

  getLinks() {
    let links = [];

    if (
      window.location.pathname.includes("/app") &&
      window.location.pathname !== "/app/login"
    ) {
      links = [
        {
          name: "Inicio",
          url: "/app",
          button: false,
        },
        {
          name: "Administración",
          url: "/app/admin",
          button: false,
        },
        {
          name: "Mis negocios",
          url: "/app/me/businesses",
          button: false,
        },
        {
          name: "Carrito de compras",
          url: "/app/shopping-cart",
          button: false,
        },
        {
          name: "Mi cuenta",
          url: "/app/me/profile",
          button: false,
        },
        {
          name: "Cerrar sesión",
          url: "/",
          button: true,
        },
      ];
    } else {
      links = [
        { name: "Inicio", url: "/", button: false },
        { name: "Nuestro equipo", url: "/about-us", button: false },
        { name: "Iniciar sesión", url: "/app/login", button: true },
      ];
    }

    return links
      .map(
        (link) =>
          `<a class="${link.button ? "btn-popup" : "navigation-link"}" href="${
            link.url
          }">${link.name}</a>`
      )
      .join("");
  }

  connectedCallback() {
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        const mobileOverlay = document.querySelector(".mobile-overlay");
        mobileOverlay.style.display = "none";
      }
    });

    this.innerHTML = `
    <style>
      header {
        background-color: #73a942;
        padding: 20px 100px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .mobile-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100dvw;
        height: 100dvh;
        display: none;
        background: rgba(0,0,0, 0.9);
        z-index: 999;
        padding: 20px;
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
      .menu-icon {
        all: unset;
        display: none;
        padding: 2px 4px;
        border-radius: 50%;
        cursor: pointer;
      }
      .menu-icon:hover {
        background: rgba(255,255,255,0.2);
      }
      @media (max-width: 1366px) {
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
      @media (max-width: 1200px) {
        header .navigation {
          display: none;
        }
        .menu-icon {
          display: block;
        }
        .mobile-overlay .menu-icon {
          max-width: fit-content;   
          margin-left: auto;
        }
        .navigation {
          flex-direction: column;
        }
      }
    </style>
    <div class="mobile-overlay">
      <button class="menu-icon" onclick="toggleMobileMenu();">
        <img src="/assets/icons/close-icon.svg" />
      </button>
      <nav class="navigation">
        ${this.getLinks()}
      </nav>
    </div>
    <header>
    <a class="logo" href="/app/index.html">
    <img src="/assets/images/logo.png" class="logo">
    </a>
        <button class="menu-icon" onclick="toggleMobileMenu();">
          <img src="/assets/icons/menu-icon.svg" />
        </button>
        <nav class="navigation">
          ${this.getLinks()}
        </nav>
    </header>
    `;
  }
}

customElements.define("viajeros-solos-header", ViajerosSolosHeader);
