$(() => {
    $.ajax({
        type: "GET",
        url: "https://localhost:7070/State",
        success: loadStates,
        header: {},
        contentType: "application/json",
        dataType: "json",
    });

    if (localStorage.getItem("user")) {

        return;
    }

})

function testePost() {
    var tag = document.getElementById("Voluntario-city");
    var idCity = tag.options[tag.selectedIndex].value;
    tag = document.getElementById("Voluntario-state");
    var idState = tag.options[tag.selectedIndex].value;
    const values = {
        name: $("#Voluntario-nome")[0].value,
        email: $("#Voluntario-email")[0].value,
        password: $("#Voluntario-senha")[0].value,
        birthdate: document.getElementById('Voluntario-nascimento').value,
        profileImage: "",
        role: "voluntario",
        cityId: idCity,
        cityStateId: idState
    }
    console.log(values);
    if (!values.name) {
        alert("nome não informado!");
        $("#Voluntario-nome").addClass("invalid");
        return;
    }
    $("#Voluntario-nome").removeClass("invalid");

    if (values.cityStateId == "Estado") {
        alert("Estado não informado!");
        $("#Voluntario-state").addClass("invalid");
        return;
    }
    $("#Voluntario-state").removeClass("invalid");
    if (values.cityId == "Cidade") {
        alert("Cidade não informado!");
        $("#Voluntario-city").addClass("invalid");
        return;
    }
    $("#Voluntario-city").removeClass("invalid");


    if (!values.birthdate) {
        alert("Data de nascimento não informado!");
        $("#Voluntario-nascimento").addClass("invalid");
        return;
    } else {
        let data = values.birthdate;
        var hoje = new Date();
        var nasc = new Date(data);
        var idade = hoje.getFullYear() - nasc.getFullYear();
        var m = hoje.getMonth() - nasc.getMonth();
        if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) idade--;
        if (idade < 18) {
            alert("Idade invalida ou menor que 18 anos");
            $("#Voluntario-nascimento").addClass("invalid");
            return;
        }
    }
    $("#Voluntario-nascimento").removeClass("invalid");

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

    values.birthdate;
    console.log(values);
    sendDataBase(values);
}

function sendDataBase(values) {
    if (values != null) {
        $.ajax({
            type: "POST",
            url: apiUrl + "/User",
            data: JSON.stringify(values),
            statusCode: {
                200: function () {
                    //window.location.href = "perfil-edicao.html";
                }
            },
            contentType: "application/json",
            dataType: "json",
        });
    }

}

function loadStates(item) {
    console.log(item);
    item.forEach(linha => {

        const stateOption = `
            <option value="${linha.id}">${linha.name}</option>
        `;
        $(`#Voluntario-state`).append($(stateOption));
    });
}

function loadCity() {
    event.preventDefault();
    var id = document.getElementById('Voluntario-state').value;
    $.ajax({
        type: "GET",
        url: `https://localhost:7070/City/${id}`,
        success: loadCityHtml,
        header: {},
        contentType: "application/json",
        datatype: "json",
    });
}

function loadCityHtml(item) {
    var limpa = document.getElementById("Voluntario-city");
    limpa.innerText = "";
    item.forEach(linha => {

        const cityOption = `
            <option value="${linha.id}">${linha.name}</option>
        `;
        $(`#Voluntario-city`).append($(cityOption));
    });
}