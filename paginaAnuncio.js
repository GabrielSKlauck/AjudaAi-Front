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

    try{   
        const user = JSON.parse(localStorage.getItem("user"));
        const id = user.id;
        const isNgo = localStorage.getItem("ong");
        if(id != null){
            
            if(isNgo == "true"){
                let link = document.getElementById('profile-page');
                link.setAttribute("href","perfil-edicao-ong.html");
                let linkSmall = document.getElementById('profile-page-small');
                linkSmall.setAttribute("href","perfil-edicao-ong.html");
            }else{            
                let link = document.getElementById('profile-page');
                link.setAttribute("href","perfil-edicao.html");
                let linkSmall = document.getElementById('profile-page-small');
                linkSmall.setAttribute("href","perfil-edicao.html");
            }
            document.getElementById('btn-login').style.display = 'none';
            document.getElementById('btn-logout').style.display = 'block';

            document.getElementById('btn-login-small').style.display = 'none';
            document.getElementById('btn-logout-small').style.display = 'block';

            document.getElementById('sign-up').style.display = 'none';
            document.getElementById('profile-page').style.display = 'block';
            document.getElementById('profile-page-small').style.display = 'block';
        }
    }catch{}
};

function carregaPagina(){   
        const pagina = `
        <div id="div-pag" class="h-auto w-[43rem] mt-10 relative block">
        <div id="div-topo" class="w-full">
          <div id="div-header" class="ml-5">
            <p class="text-2xl mb-2">${title}</p>
            <p class="font-semibold">Ong responsavel: ${nameOng}</p>
            <p><em>Expira em: ${refactorDate(expira)}</em></p>
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
    const isNgo = localStorage.getItem('ong');
    if(isNgo != 'true'){
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
                headers:{
                    Authorization: `Bearer ${localStorage.getItem(`token`)}`,
                },
                contentType: "application/json",
                success: disableBtnInsc(),
                dataType: "json",
            });
        }else{
            alert("Por favor logue primeiro antes de se inscrever");
            window.location.href = "login.html";
        }
    }  
}

function verificarInscricao(){
    const isNgo = localStorage.getItem('ong');
    if(isNgo != 'true'){
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
            headers: {
                Authorization: `Bearer ${localStorage.getItem(`token`)}`,
            },
            contentType: "application/json",
            success: validaGet,
            dataType: "json",
        });
        return estaInscrito;
    }else{
        let btn = document.getElementById('btn-subscribe');
        btn.style.display = 'none';
    }
}

function refactorDate(date){
    let correctDate = new Date(date);
    date =  correctDate.toLocaleDateString();    
    return date;
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

function logout(){
    localStorage.clear();
}