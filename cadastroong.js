window.onload = function(){
    $.ajax({
        type: "GET",
        url: "https://localhost:7070/State",
        success: loadStates,
        header: {},
        contentType: "application/json",
        dataType: "json",
    });

    $.ajax({
        type: "GET",
        url: "https://localhost:7070/Causes",
        success: loadCauses,
        header: {},
        contentType: "application/json",
        dataType: "json",
    });
}

$(() => {
    
    $("#btn-sign-up").click(() => {
        var tag = document.getElementById("ngo-causes");
        var idCause = tag.options[tag.selectedIndex].value;
        tag = document.getElementById("ngo-state");
        var idState = tag.options[tag.selectedIndex].value;
        tag = document.getElementById("ngo-city");
        var idCity = tag.options[tag.selectedIndex].value;
        const values = {
            ngoName: $("#ngo-name")[0].value,
            description: "",
            site: $("#ngo-social")[0].value,
            headPerson: $("#ngo-head-name")[0].value,
            telephone: $("#ngo-phone")[0].value,
            email: $("#ngo-email")[0].value,
            password: $("#ngo-password")[0].value,
            profileImage: "",
            role: "ngo",   
            causesId: idCause,
            cityId: idCity,
            cityStateId: idState,                
        }
        

        if (!values.ngoName) {
            alert("Favor informar o nome da ONG!");
            $("#ngo-name").addClass("invalid");
            return;
        }
        $("#ngo-name").removeClass("invalid");

        if (values.cityStateId == "Estado") {
             alert("Favor informar o estado!");
            $("#ngo-state").addClass("invalid");
             return;
        }
        $("#ngo-state").removeClass("invalid");

        if (values.cityId == "Cidade") {
            alert("Favor informar a cidade!");
            $("#ngo-city").addClass("invalid");
            return;
        }
        $("#ngo-city").removeClass("invalid");
        if (!values.site) {
            alert("Favor informar o site ou rede social!");
            $("#ngo-social").addClass("invalid");
            return;
        }
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

        if (values.causesId == "Causas") {
            alert("Favor informar a área de atuação!");
            $("#ngo-causes").addClass("invalid");
            return;
        }
        $("#ngo-causes").removeClass("invalid");

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

        
        sendDataBase(values);
    })
})

function loadStates(item){
    
    item.forEach(linha => {
        
        const stateOption = `
            <option value="${linha.id}">${linha.name}</option>
        `;
        $(`#ngo-state`).append($(stateOption));
    });
}

function sendDataBase(values){
    $.ajax({
        type: "POST",
        url: "https://localhost:7070/ngo",
        data: JSON.stringify(values),
        statusCode: {
            200: function () {
                login(values);
            }
        },
        contentType: "application/json",
        dataType: "json",
    });
}

function login(ong){  
    const valores ={
        email: ong.email,
        password: ong.password
    };
    $.ajax({
        type: "POST",
        url: "https://localhost:7070/ngo/login",
        data: JSON.stringify(valores),
        success: (result) => {
           localStorage.clear();
           localStorage.setItem(`token`, result.token); 
           localStorage.setItem(`user`, JSON.stringify(result.user)); 
           localStorage.setItem(`ong`, true);
           location.href = "perfil-edicao-ong.html"; 
        },
        contentType: "application/json",
        dataType: "json",
    });
}

function loadCity(){
    event.preventDefault();
    var id = document.getElementById('ngo-state').value;
    $.ajax({
        type: "GET",
        url: `https://localhost:7070/City/${id}`,
        success: loadCityHtml,
        header: {},
        contentType: "application/json",
        datatype: "json",
    });
}

function loadCityHtml(item){
    var limpa = document.getElementById("ngo-city");
    limpa.innerText = "";
    item.forEach(linha => {
        
        const cityOption = `
            <option value="${linha.id}">${linha.name}</option>
        `;
        $(`#ngo-city`).append($(cityOption));
    });
}

function loadCauses(item){
    item.forEach(linha => {       
        const options = `
        <option value="${linha.id}">${linha.name}</option>`;
        $(`#ngo-causes`).append($(options));
    });
}