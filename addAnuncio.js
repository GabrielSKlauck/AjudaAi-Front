function showForm(){
    var formulario = document.getElementById("form-add");

    if (formulario.style.display === "none" || formulario.style.display === "") {
        formulario.style.display = "block";
    } else {
        formulario.style.display = "none";
    }
}

function criarAnuncio(){
    var nomeOng = $("#input-nome-ong").val();
    var descricaoOng = $("#ta-descricao").val();
    console.log(nomeOng + " " + descricaoOng);

    
}