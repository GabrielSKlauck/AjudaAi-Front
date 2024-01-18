$(() => {
    $("#btn-sign-up").click(() => {
        const values = {
          name: $("#Voluntario-nome")[0].value,
         // Estado: $("#Voluntario-estado")[0].value,
          email: $("#Voluntario-email")[0].value,
          password: $("#Voluntario-senha")[0].value,
          role: "voluntario",
          cityId: $("#Voluntario-city")[0].value,
          
          
        }
        if (!values.name) {
            alert("nome não informado!");
            $("#Voluntario-nome").addClass("invalid");
            return;  
        }
        $("#Voluntario-nome").removeClass("invalid");

        // if (!values.Estado) {
        //     alert("Estado não informado!");
        //     $("#Voluntario-estado").addClass("invalid");
        //     return;  
        // }
        $("#Voluntario-estado").removeClass("invalid");

        if (!values.cityId) {
            alert("Cidade não informado!");
            $("#Voluntario-city").addClass("invalid");
            return;  
        }
        $("#Voluntario-city").removeClass("invalid");

        if (!values.email) {
            alert("Email não informado!");
            $("#Voluntario-email").addClass("invalid");
            return;  
        }
        $("#Voluntario-email").removeClass("invalid");

        if (!values.password) {
            alert("Senha não informado!");
            $("#Voluntario-senha").addClass("invalid");
            return;  
        }
        $("#Voluntario-senha").removeClass("invalid");

        console.log(values);
        sendDataBase(values);
        
    });
    
})

function sendDataBase(values){
    $.ajax({
        type: "POST",
        url: "https://localhost:7070/User",
        data: JSON.stringify(values),
        contentType: "application/json",
        dataType: "json",
    });
}
