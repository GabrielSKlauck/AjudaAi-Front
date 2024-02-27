let filter = {
  title: undefined,
}

function startCarousel(pages) {
  const carouselElement = document.getElementById("default-carousel");
  const items = pages.map(page => (
    {
      position: page.page - 1,
      el: document.getElementById(`carousel-page-${page.page}`)
    }
  ));

  const carousel = new Carousel(carouselElement, items);
  carousel.slideTo(0);

  $("[data-carousel-next]").on('click', () => { carousel.next() });
  $("[data-carousel-prev]").on('click', () => { carousel.prev() });
}

const isNullOrWhitespace = (str) => !str || str == null || str.trim() == "";

async function getAnnounces(filter) {
  const response = await axios.get("https://localhost:7070/ads");
  

  if (response.status != 200 && response.status != 201)
    return;

  let announces = Object.values(response.data);

  if (filter) {
    if (!isNullOrWhitespace(filter.title)) {
      announces = announces.filter(announce => 
        announce.title && 
        announce.title.toLowerCase().includes(filter.title.toLocaleLowerCase())
      );
    }
  }

  return announces;
}

// Processo para separar os anuncios de 3 em 3 (para que fique 3 anúncios no MAX por página)
function getPaginated(announces) {
  const totalPages = parseInt((announces.length / 3) + 1);
  const pages = [];
  
  let page = 1;
  for (let index = 0; page <= totalPages; index += 3) {
    pages.push({
      page: page,
      values: announces.slice(index, index + 3)
    });
    
    page++;
  }

  return pages;
}

function insertPages(pages) {
  const announceWrapper = $("[announces-wrapper]")

  let pageNumber = 1;
  for (let index = 0; index < pages.length; index++) {
    const pageObject = pages[index];

    let html = `<!-- Page ${pageNumber} -->
    <div id="carousel-page-${pageNumber}" class="duration-700 ease-in-out w-full h-full flex flex-row gap-20 items-center justify-center overflow-visible" data-carousel-item>`;

    pageObject.values.forEach(announce => {
      html += `
      <div class="w-80 h-80 bg-gradient-to-r from-[#F6FFFF] to-[#F1FFFF] flex rounded-2xl shadow-lg text-center font-medium text-xl">
          ${announce.title}
      </div>`;
    });

    html += `</div>`;

    announceWrapper.append(html);
    pageNumber++;
  }
}

function resetCards() {
  $("[announces-wrapper]").remove();

  $("#default-carousel").append(`<div announces-wrapper class="relative h-56 overflow-hidden rounded-lg md:h-96 w-5/6 m-auto"></div>`)
}

async function refreshFilter() {
  resetCards();

  await getData(filter);
}

async function getData() {
  // Busca os anuncios na API
  const announces = await getAnnounces(filter);

  if (!announces) return;

  // Pagina de 3 em 3
  const pages = getPaginated(announces);

  // Insere os anuncios em tela
  insertPages(pages);

  // Starta o carousel para que ESSA PORRA NOJENTA DESGRAÇADA SEM MAE FUNCIONE (FDP) 🤢🤮
  startCarousel(pages);
}

function disableFilterButton() {
  const filterButton = $("#filter-button");
  const filterLabel = $("#filter-label");

  filterButton.removeClass("bg-aiblue");
  filterButton.removeClass("cursor-pointer");
  filterButton.addClass("bg-zinc-500");
  filterButton.attr("disabled", "true");

  filterLabel.addClass("cursor-default")
}

function enableFilterButton() {
  const filterButton = $("#filter-button");
  const filterLabel = $("#filter-label");

  filterButton.addClass("bg-aiblue");
  filterButton.addClass("cursor-pointer");
  filterButton.removeClass("bg-zinc-500");
  filterButton.removeAttr("disabled");

  filterLabel.removeClass("cursor-default")
}

function isFilterDisabled() {
  return $("#filter-button").attr("disabled") == "disabled";
}

$("#filter-button").on("click", async () => {
  if (isFilterDisabled()) return;

  disableFilterButton();

  filter.title = $("#title-filter").val();

  await refreshFilter();

  enableFilterButton();
});

// COMEÇO DE TUDO
$(async () => { await getData() });