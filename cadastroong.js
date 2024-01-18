$(() => {

    $("#btn-sign-up").click(() => {
        const values = {
            ngoName: $("#ngo-name")[0].value,
            description: "",
            site: "",
            headPerson: $("#ngo-head-name")[0].value,
            telephone: $("#ngo-phone")[0].value,
            email: $("#ngo-email")[0].value,
            password: $("#ngo-password")[0].value,
            role: "admin",
            cityId: 1,
            causesId: 1,
            //state: $("#ngo-state")[0].value,
            
            //social: $("#ngo-social")[0].value,
            
            
            
            
            
        }

        if (!values.ngoName) {
            alert("Favor informar o nome da ONG!");
            $("#ngo-name").addClass("invalid");
            return;
        }
        $("#ngo-name").removeClass("invalid");

        // if (!values.state) {
        //     alert("Favor informar o estado!");
        //     $("#ngo-state").addClass("invalid");
        //     return;
        // }
        $("#ngo-state").removeClass("invalid");

        if (!values.cityId) {
            alert("Favor informar a cidade!");
            $("#ngo-city").addClass("invalid");
            return;
        }
        $("#ngo-city").removeClass("invalid");

        // if (!values.social) {
        //     alert("Favor informar o site ou rede social!");
        //     $("#ngo-social").addClass("invalid");
        //     return;
        // }
        $("#ngo-social").removeClass("invalid");

        if (!values.headPerson) {
            alert("Favor informar o nome do responsável!");
            $("#ngo-head-name").addClass("invalid");
            return;
        }
        $("#ngo-head-name").removeClass("invalid");

        if (!values.telephone) {
            alert("Favor informar o telefone!");
            $("#ngo-phone").addClass("invalid");
            return;
        }
        $("#ngo-phone").removeClass("invalid");

        if (!values.causesId) {
            alert("Favor informar a área de atuação!");
            $("#ngo-field").addClass("invalid");
            return;
        }
        $("#ngo-field").removeClass("invalid");

        if (!values.email) {
            alert("Favor informar o E-mail!");
            $("#ngo-email").addClass("invalid");
            return;
        }
        $("#ngo-email").removeClass("invalid");

        if (!values.password) {
            alert("Favor informar a senha!");
            $("#ngo-password").addClass("invalid");
            return;
        }
        $("#ngo-password").removeClass("invalid");

        console.log(values);
        sendDataBase(values);
    })
})

function sendDataBase(values){
    $.ajax({
        type: "POST",
        url: "https://localhost:7070/NGO",
        data: JSON.stringify(values),
        contentType: "application/json",
        dataType: "json",
    });
}