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
    item.forEach(linha => {
        const cardAds = `
        <div class="container-interno grid grid-cols-1 mx-4 sm:mx-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 ">
        <div class="cards card border-2 p-2 flex flex-col items-center h-96">
          <img src="assets/images/logo anuncio.jpg" alt="" class="h-40 w-60">
          <h1 class="text-xl mt-4 mb-4">${linha.title}</h1>
          <p class="text-center">
            ${linha.description}
          </p>
        </div>
       `;
        $(`#container`).append($(cardOng));
    });
}