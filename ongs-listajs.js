window.onload = function() {
  
    $.ajax({
        type: "GET",
        url: "https://localhost:7070/NGO",
        success: mostraOng,
        header: {},
        contentType: "application/json",
        datatype: "json",
    });
    
    try{
        const user = JSON.parse(localStorage.getItem("user"));
        const id = user.id;

        if(id != null){
            document.getElementById('btn-login').style.display = 'none';
            document.getElementById('btn-logout').style.display = 'block';

            document.getElementById('btn-login-small').style.display = 'none';
            document.getElementById('btn-logout-small').style.display = 'block';

            document.getElementById('sign-up').style.display = 'none';
            document.getElementById('btn-sign-up-small').style.display = 'none';
            document.getElementById('profile-page').style.display = 'block';
            document.getElementById('profile-page-small').style.display = 'block';
        }
    }catch{}
};

function logout(){
    localStorage.clear();
}

function mostraOng(item) {
    var cont = 1;
    console.log(item);

    item.forEach(linha => {
        if (cont % 2 == 0) {
            const cardOng = `
            <div id="${linha.id}" class="caixa-esq md:mt-10 mt:ml-6 w-2/4 h-64 rounded-3xl" onclick="abrirPagina(${linha.id})">
                <img src="assets/images/ong-exemplo.jpg" alt="" class="img-anuncio-esq relative h-64 float-left">
                <h1 class="text-center">${linha.ngoName}</h1> <!-- Jomhura-->
                <p class="text-justify ml-3 mr-3 text-base">
                ${linha.description}
                </p>
            </div>
        `;
        $(`#container`).append($(cardOng));
            cont++;
        }else{
            const cardOng = `
            <div id="${linha.id}" class="caixa-dir md:mt-10 mt:ml-6 w-2/4 h-64 rounded-3xl" onclick="abrirPagina(${linha.id})">
            <img src="assets/images/ong-exemplo.jpg" alt="" class="img-anuncio-dir relative h-64 float-right">
            <h1 class="text-center">${linha.ngoName}</h1> <!-- Jomhura-->
            <p class="text-justify ml-3 mr-3 text-base">
            ${linha.description}
            </p>
            </div>
        `;
        $(`#container`).append($(cardOng));
        cont++;
        }

    });
}

function abrirPagina(id){
    window.location.href = `paginaOng.html?id=${id}`;
}