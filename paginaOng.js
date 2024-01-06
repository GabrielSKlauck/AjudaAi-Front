const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

var title = "";
var desc = "";
window.onload = function() {
    request('GET', `ngo/${id}`, {}, function(result) {
        title = result.ngoName;
        desc = result.description;
       // console.log(title + " " + desc);
        carregaOng();
    });

    $.ajax({
        type: "GET",
        url: `https://localhost:7070/ngo/NgoId/${id}`,
        success: carregaAnuncios,
        header: {},
        contentType: "application/json",
        datatype: "json",
    });
};

function carregaOng(){       
    var titulo = document.getElementById("title-ong");
    var descricao = document.getElementById("description-ong");
    titulo.innerHTML = title;
    descricao.innerHTML = desc;
}

function carregaAnuncios(){
    console.log(item);
    item.forEach(linha => {
        
        const cardAds = `
        <div id = "${linha.id}" class="cards card flex flex-col items-center h-96" onclick="abrirPagina(${linha.id})">
        <img src="assets/images/logo anuncio.jpg" alt="" class="h-40 w-60">
        <h1 class="text-xl mt-4 mb-4">${linha.title}</h1>
        <p class="text-center">
            ${linha.description}
        </p>
      </div>
        
       `;
        $(`.container`).append($(cardAds));
    });
}


function request(method, url, headers, successCallback) {
    $.ajax({
        type: method,
        url: `https://localhost:7070/${url}`,
        headers: headers,
        success: successCallback,
        contentType: 'application/json',
        dataType: 'json',
    });
}