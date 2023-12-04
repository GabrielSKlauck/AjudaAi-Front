function showForm(){
    var formulario = document.getElementById("form-add");

    if (formulario.style.display === "none" || formulario.style.display === "") {
        formulario.style.display = "flex";
    } else {
        formulario.style.display = "none";
    }
}