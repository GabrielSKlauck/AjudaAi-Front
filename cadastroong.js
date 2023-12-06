$(() => {

    $("#btn-sign-up").click(() => {
        const values = {
            name: $("#ngo-name")[0].value,
            state: $("#ngo-state")[0].value,
            city: $("#ngo-city")[0].value,
            social: $("#ngo-social")[0].value,
            headperson: $("#ngo-head-name")[0].value,
            phone: $("#ngo-phone")[0].value,
            field: $("#ngo-field")[0].value,
            email: $("#ngo-email")[0].value,
            password: $("#ngo-password")[0].value
        }

        if (!values.name) {
            alert("Favor informar o nome da ONG!");
            $("#ngo-name").addClass("invalid");
            return;
        }
        $("#ngo-name").removeClass("invalid");

        if (!values.state) {
            alert("Favor informar o estado!");
            $("#ngo-state").addClass("invalid");
            return;
        }
        $("#ngo-state").removeClass("invalid");

        if (!values.city) {
            alert("Favor informar a cidade!");
            $("#ngo-city").addClass("invalid");
            return;
        }
        $("#ngo-city").removeClass("invalid");

        if (!values.social) {
            alert("Favor informar o site ou rede social!");
            $("#ngo-social").addClass("invalid");
            return;
        }
        $("#ngo-social").removeClass("invalid");

        if (!values.headperson) {
            alert("Favor informar o nome do responsável!");
            $("#ngo-head-name").addClass("invalid");
            return;
        }
        $("#ngo-head-name").removeClass("invalid");

        if (!values.phone) {
            alert("Favor informar o telefone!");
            $("#ngo-phone").addClass("invalid");
            return;
        }
        $("#ngo-phone").removeClass("invalid");

        if (!values.field) {
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
        alert("Cadastro efetuado!")
    })
})