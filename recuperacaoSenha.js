var email;

function enviarToken(){
    email = document.getElementById("Recuperacao-email").value;
    console.log(email);
    const expressaoRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!(email == "") && expressaoRegular.test(email)){
        $.ajax({
            type: "POST",
            url: `https://localhost:7070/user/SendTokenToEmail/${email}`,
            data: String,
            contentType: "application/json",          
            error: emailIncorreto(),         
            success: enableTokenPage(email),
            dataType: "string",
        });
    }else{
        emailIncorreto();
    }
    
}

function emailIncorreto(){
    window.alert("Email invalido ou incorreto");
    $('#Recuperacao-email').removeClass("valido");
    $('#Recuperacao-email').addClass("invalid");
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
        error: tokenIncorreto(),
        success: enableChangePassword(),
        dataType: "string",
    });
}

function tokenIncorreto(erro){
    console.log(erro);
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