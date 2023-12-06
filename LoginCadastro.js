$(() => {
    $("#btn-sign-up").click(() => {
        const values = {
          Nome: $("#Voluntario-nome")[0].value,
          Estado: $("#Voluntario-estado")[0].value,
          Cidade: $("#Voluntario-city")[0].value,
          Email: $("#Voluntario-email")[0].value,
          Senha: $("#Voluntario-senha")[0].value,
        }
        if (!values.Nome) {
            alert("nome não informado!");
            $("#Voluntario-nome").addClass("invalid");
            return;  
        }
        $("#Voluntario-nome").removeClass("invalid");

        if (!values.Estado) {
            alert("Estado não informado!");
            $("#Voluntario-estado").addClass("invalid");
            return;  
        }
        $("#Voluntario-estado").removeClass("invalid");

        if (!values.Cidade) {
            alert("Cidade não informado!");
            $("#Voluntario-city").addClass("invalid");
            return;  
        }
        $("#Voluntario-city").removeClass("invalid");

        if (!values.Email) {
            alert("Email não informado!");
            $("#Voluntario-email").addClass("invalid");
            return;  
        }
        $("#Voluntario-email").removeClass("invalid");

        if (!values.Senha) {
            alert("Senha não informado!");
            $("#Voluntario-senha").addClass("invalid");
            return;  
        }
        $("#Voluntario-senha").removeClass("invalid");

        console.log(values);
    });
    
})