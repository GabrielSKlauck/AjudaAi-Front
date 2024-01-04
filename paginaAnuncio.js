const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
//console.log(id);

var title = "";
var desc = "";
window.onload = function() {
    request('GET', `ads/${id}`, {}, function(result) {
        title = result.title;
        desc = result.description;
        carregaPagina();
    });
};

function carregaPagina(){       
        const pagina = `
        <div id="div-pag" class="min-h-[333px] max-h-[620px] h-auto w-[43rem] mt-10 relative block rounded-xl">
            <div class=" h-[235px] w-full flex">
                <img src="assets/images/ong-exemplo.jpg" alt="" class="h-[11rem] w-[11rem] ml-4 mt-8">
                <h1 id="title-ngo" class="ml-5 mt-20 text-3xl">${title}</h1>
            </div>
            <p class="ml-1">
                ${desc}
            </p>
            <button id="btn-subscribe" class="p-2 rounded-2xl float-right mt-1 mr-5 mb-2">Inscrever-se</button>
        </div>
        
       `;
        $(`.divMeio`).append($(pagina));
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