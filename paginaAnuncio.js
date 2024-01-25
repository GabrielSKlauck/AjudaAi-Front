const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
//console.log(id);

var title = "";
var desc = "";
var expira = "";
var nameOng = "";
var ngoId = "";
window.onload = function() {
    request('GET', `ads/${id}`, {}, function(result) {
        title = result.title;
        desc = result.description;
        expira = result.expires;
        ngoId = result.ngo_Id;
    
        console.log(ngoId);
        request('GET', `ngo/${ngoId}`, {}, function(result) {
        nameOng = result.ngoName;
        carregaPagina();
     });
    });

    if(verificaAnuncio()){
        disableBtnInsc();
    }
};

function carregaPagina(){   
        const pagina = `
        <div id="div-pag" class="h-auto w-[43rem] mt-10 relative block">
        <div id="div-topo" class="w-full h-28">
          <div id="div-header">
            <p class="text-2xl mb-2">${title}</p>
            <p class="font-semibold">Ong responsavel: ${nameOng}</p>
            <p><em>Expira em: ${expira}</em></p>
          </div>
        </div>
        <hr id="barra" class="w-full h-3">

        <div class="w-full mb-10">
          <p class="mx-5">
            ${desc}
          </p>
          <div id="div-baixo" class="w-full h-10">
            <button id="btn-subscribe" class="px-3 py-1 rounded-2xl float-right mt-1 mr-5 mb-2" onclick="inscricao()">Inscrever-se</button>
          </div>
        </div>
    </div>
        
       `;
        $(`.divMeio`).append($(pagina));

        $('#btn-subscribe').on('click', inscricao);
}

function verificaAnuncio(){
    inscrito = false;
    var item = JSON.parse(localStorage.getItem("user"));
    var userId = parseInt(item.id);
    const infoUserAds = {
        userId: userId,
        adsId: parseInt(id)
    }
    $.ajax({
        type: "GET",
        url: "https://localhost:7070/UserAds",
        data: JSON.stringify(infoUserAds),
        success: inscrito = true,
        contentType: "application/json",
        dataType: "json",
    });
    return inscrito
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

function inscricao(){
    if (localStorage.getItem("user")) {
        var item = JSON.parse(localStorage.getItem("user"));
        var userId = parseInt(item.id);
        console.log("logado");
        const infoUserAds = {
            userId: userId,
            adsId: parseInt(id)
        }
        
        $.ajax({
            type: "POST",
            url: "https://localhost:7070/UserAds",
            data: JSON.stringify(infoUserAds),
            contentType: "application/json",
            success: disableBtnInsc(),
            error: alert("Voluntario ja logado no respectivo anuncio"),
            dataType: "json",
        });
    }else{
        alert("Por favor logue primeiro antes de se inscrever");
        window.location.href = "login.html";
    }
}

function disableBtnInsc(){
    $("#btn-subscribe").addClass("invalid");
}