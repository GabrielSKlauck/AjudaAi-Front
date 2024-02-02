var email;

function enviarToken(){
    email = document.getElementById("Recuperacao-email").value;
    console.log(email);
    $.ajax({
        type: "POST",
        url: `https://localhost:7070/user/SendTokenToEmail/${email}`,
        data: String,
        contentType: "application/json",
        success: enableTokenPage(email),
        dataType: "string",
    });
}

function enableTokenPage(email){
    document.getElementById("add-email").innerHTML = `${email}`;
    $('#email-send-box').css({display: 'none'});
    $('#token-validate-box').css({display: 'block'});
}

function verificarToken(){
    var token = document.getElementById("validate-token").value;
    console.log(token);
    $.ajax({
        type: "POST",
        url: `https://localhost:7070/user/SendToken/${token}`,       
        contentType: "application/json",
        success: enableChangePassword(),
        dataType: "string",
    });
}

function enableChangePassword(){
    $('#token-validate-box').css({display: 'none'});
    $('#nova-senha-box').css({display: 'block'});
}

function mudarSenha(){
    var senha = document.getElementById("senha").value;
    var senhaRep = document.getElementById("senha-repetida").value;

    if(senha == senhaRep && senha != "" && senhaRep != ""){

        $.ajax({
            type: "POST",
            url: `https://localhost:7070/user/ChangePassword/${senha}`,
            contentType: "application/json",
            success: voltaLogin(),
            dataType: "string",
        });
    }
}

function voltaLogin(){
    console.log("funca");
    window.location.href = "login.html";
}