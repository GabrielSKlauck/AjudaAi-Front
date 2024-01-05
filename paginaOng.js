const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

var title = "";
var desc = "";
window.onload = function() {
    request('GET', `ngo/${id}`, {}, function(result) {
        title = result.ngoName;
        desc = result.description;
        console.log(title + " " + desc);
        carregaPagina();
    });
};

function carregaPagina(){       
    var titulo = document.getElementById("title-ong");
    var descricao = document.getElementById("description-ong");
    titulo.innerHTML = title;
    descricao.innerHTML = desc;
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