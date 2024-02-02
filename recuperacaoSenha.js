function enviarToken(){
    var email = document.getElementById("Recuperacao-email").value;
    $.ajax({
        type: "POST",
        url: `localhost:7070/user/SendTokenToEmail/${email}`,
        contentType: "application/json",
        dataType: "json",
    });
}