const id = urlParams.get('Id');

window.onload = function(){
    $.ajax({
        type: "GET",
        url: "https://localhost:7070/Ads",
        success: carregaPagina,
        header: {},
        contentType: "application/json",
        datatype: "json",
    });
}
