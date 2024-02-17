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
    
        request('GET', `ngo/${ngoId}`, {}, function(result) {
        nameOng = result.ngoName;
        carregaPagina();
     });
    });

    
};

function carregaPagina(){   
        const pagina = `
        <div id="div-pag" class="h-auto w-[43rem] mt-10 relative block">
        <div id="div-topo" class="w-full">
          <div id="div-header" class="ml-5">
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
            <button id="btn-non-subscribe" class="px-3 py-1 rounded-2xl float-right mt-1 mr-5 mb-2"><em>Inscrito</em></button>
          </div>
        </div>
    </div>
        
       `;
        $(`.divMeio`).append($(pagina));

        verificarInscricao();

        $('#btn-subscribe').on('click', inscricao);

        
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
            dataType: "json",
        });
    }else{
        alert("Por favor logue primeiro antes de se inscrever");
        window.location.href = "login.html";
    }
}

function verificarInscricao(){
    var item = JSON.parse(localStorage.getItem("user"));
    var userId = parseInt(item.id);

    const infoUserAds = {
    userId: userId,
    adsId: parseInt(id)
    }
    
    var estaInscrito = false;
    $.ajax({
        type: "POST",
        url: "https://localhost:7070/UserAds/userIdAdsId",
        data: JSON.stringify(infoUserAds),
        contentType: "application/json",
        success: validaGet,
        dataType: "json",
    });
    return estaInscrito;
}

function validaGet(item){
    if(item.length != 0){
        disableBtnInsc();
    }
}

function disableBtnInsc(){
    $('#btn-subscribe').css({display: 'none'});
    $('#btn-non-subscribe').css({display: 'block'});
}