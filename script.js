// =============================================
// CONFIGURAÇÃO PRINCIPAL
// =============================================

const config = window.SITE_CONFIG;


// =============================================
// CRIAR LINK DO WHATSAPP
// =============================================

function criarLinkWhatsapp() {

  const numero =
    config.whatsapp;

  const mensagem =
    encodeURIComponent(
      config.whatsappMessage
    );

  return (
    `https://wa.me/${numero}?text=${mensagem}`
  );

}


// =============================================
// APLICAR CONFIGURAÇÕES DO SITE
// =============================================

function aplicarConfiguracoes() {


  // -------------------------------------------
  // Nome da clínica
  // -------------------------------------------

  document.title =
    config.clinicName;


  const brandName =
    document.getElementById(
      "brandName"
    );


  if (brandName) {

    brandName.textContent =
      config.clinicName;

  }


  // -------------------------------------------
  // WhatsApp
  // -------------------------------------------

  const whatsappIds = [

    "navWhatsapp",

    "heroWhatsapp",

    "campaignWhatsapp",

    "contactWhatsapp",

    "footerWhatsapp",

    "floatWhatsapp"

  ];


  whatsappIds.forEach(

    function (id) {

      const elemento =
        document.getElementById(id);


      if (elemento) {

        elemento.href =
          criarLinkWhatsapp();

      }

    }

  );


  // -------------------------------------------
  // Instagram
  // -------------------------------------------

  const instagramIds = [

    "heroInstagram",

    "contactInstagram",

    "footerInstagram"

  ];


  instagramIds.forEach(

    function (id) {

      const elemento =
        document.getElementById(id);


      if (elemento) {

        elemento.href =
          config.instagram;

      }

    }

  );


  // -------------------------------------------
  // Campanha
  // -------------------------------------------

  const campaignTitle =
    document.getElementById(
      "campaignTitle"
    );


  const campaignText =
    document.getElementById(
      "campaignText"
    );


  if (campaignTitle) {

    campaignTitle.textContent =
      config.campaign.title;

  }


  if (campaignText) {

    campaignText.textContent =
      config.campaign.text;

  }


  // -------------------------------------------
  // Profissionais
  // -------------------------------------------

  carregarProfissionais();


  // -------------------------------------------
  // Ano do rodapé
  // -------------------------------------------

  const year =
    document.getElementById(
      "year"
    );


  if (year) {

    year.textContent =
      new Date().getFullYear();

  }

}


// =============================================
// CARREGAR PROFISSIONAIS
// =============================================

function carregarProfissionais() {


  const grid =
    document.getElementById(
      "professionalGrid"
    );


  if (!grid) {

    return;

  }


  grid.innerHTML =
    config.professionals

      .map(

        function (profissional, index) {


          let delay = "";


          if (index === 1) {

            delay =
              "delay-1";

          }


          if (index === 2) {

            delay =
              "delay-2";

          }


          return `

            <article
              class="
                professional-card
                reveal
                ${delay}
              "
            >

              <div
                class="
                  professional-photo
                "
              >

                <img

                  src="${profissional.photo}"

                  alt="${profissional.name}"

                  onerror="
                    this.style.display='none';
                    this.parentElement.classList.add(
                      'placeholder-photo'
                    );
                  "

                >

              </div>


              <div
                class="
                  professional-body
                "
              >

                <span
                  class="
                    professional-role
                  "
                >

                  ${profissional.role}

                </span>


                <h3>

                  ${profissional.name}

                </h3>


                <p>

                  ${profissional.bio}

                </p>


                <a

                  href="${profissional.instagram}"

                  target="_blank"

                  rel="noopener"

                >

                  Ver Instagram →

                </a>

              </div>

            </article>

          `;

        }

      )

      .join("");

}


// =============================================
// MENU MOBILE
// =============================================

function configurarMenu() {


  const toggle =
    document.getElementById(
      "menuToggle"
    );


  const nav =
    document.getElementById(
      "mainNav"
    );


  if (!toggle || !nav) {

    return;

  }


  toggle.addEventListener(

    "click",

    function () {


      const aberto =
        nav.classList.toggle(
          "open"
        );


      toggle.setAttribute(

        "aria-expanded",

        String(aberto)

      );


      if (aberto) {

        toggle.textContent =
          "✕";

      } else {

        toggle.textContent =
          "☰";

      }

    }

  );


  // Fecha o menu após clicar
  // em algum item.

  const links =
    nav.querySelectorAll(
      "a"
    );


  links.forEach(

    function (link) {


      link.addEventListener(

        "click",

        function () {


          nav.classList.remove(
            "open"
          );


          toggle.setAttribute(

            "aria-expanded",

            "false"

          );


          toggle.textContent =
            "☰";

        }

      );

    }

  );

}


// =============================================
// ANIMAÇÃO AO ROLAR A PÁGINA
// =============================================

function configurarAnimacoes() {


  const observer =
    new IntersectionObserver(

      function (entries) {


        entries.forEach(

          function (entry) {


            if (
              entry.isIntersecting
            ) {


              entry.target
                .classList
                .add(
                  "visible"
                );


              observer.unobserve(
                entry.target
              );

            }

          }

        );

      },

      {

        threshold:
          0.12

      }

    );


  const elementos =
    document.querySelectorAll(
      ".reveal"
    );


  elementos.forEach(

    function (elemento) {

      observer.observe(
        elemento
      );

    }

  );

}


// =============================================
// INICIAR O SITE
// =============================================

aplicarConfiguracoes();

configurarMenu();

configurarAnimacoes();