window.onload = function(){
    $.ajax({
        type: "GET",
        url: "https://localhost:7070/Ads",
        success: mostraAds,
        header: {},
        contentType: "application/json",
        datatype: "json",
    });
}

function mostraAds(item){
  console.log(item);
    item.forEach(linha => {
        
        const cardAds = `
        <div id = "${linha.id}" class="cards card border-2 p-2 flex flex-col items-center h-96" onclick="abrirPagina(${linha.id})">
        <img src="assets/images/logo anuncio.jpg" alt="" class="h-40 w-60">
        <h1 class="text-xl mt-4 mb-4">${linha.title}</h1>
        <p class="text-center">
            ${linha.description}
        </p>
      </div>
        
       `;
        $(`.container-interno`).append($(cardAds));
    });
}

function abrirPagina(id){
  window.location.href = `paginaAnuncio.html?id=${id}`;
}