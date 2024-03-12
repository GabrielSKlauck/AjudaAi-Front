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
        const isNgo = localStorage.getItem("ong");
        if(id != null){
            
            if(isNgo == "true"){
                let link = document.getElementById('profile-page');
                link.setAttribute("href","perfil-edicao-ong.html");
                let linkSmall = document.getElementById('profile-page-small');
                linkSmall.setAttribute("href","perfil-edicao-ong.html");
            }else{            
                let link = document.getElementById('profile-page');
                link.setAttribute("href","perfil-edicao.html");
                let linkSmall = document.getElementById('profile-page-small');
                linkSmall.setAttribute("href","perfil-edicao.html");
            }
            document.getElementById('btn-login').style.display = 'none';
            document.getElementById('btn-logout').style.display = 'block';

            document.getElementById('btn-login-small').style.display = 'none';
            document.getElementById('btn-logout-small').style.display = 'block';

            document.getElementById('sign-up').style.display = 'none';
            document.getElementById('profile-page').style.display = 'block';
            document.getElementById('profile-page-small').style.display = 'block';
        }
    }catch{}
};

function logout(){
    localStorage.clear();
}

function mostraOng(item) {
    item.forEach(linha => {
            const cardOng = `
            <div id="${linha.id}" class="cards-ong md:mt-10 mt:ml-6 w-[20rem] h-20 rounded-3xl ml-10 mb-3" onclick="abrirPagina(${linha.id})">
            <h1 class="text-center mt-2">${linha.ngoName}</h1> <!-- Jomhura-->
            <div class="w-full flex justify-center mt-2 div-card-cause">
              <h1 class="text-center card-cause w-auto" id="causa${linha.id}"></h1>
            </div>
            </div>
        `;
        getCauseName(linha.causesId).then(function(causeName) {
        document.getElementById(`causa${linha.id}`).innerText = causeName;
        });
        $(`#container-ongs`).append($(cardOng));
        
    });
}

function getCauseName(id){
    
    return new Promise(function(resolve, reject) {
        $.ajax({
            type: "GET",
            url: `https://localhost:7070/Causes/GetById/${id}`,
            success: function(data) {
                resolve(data.name);
            },
            error: function(xhr, status, error) {
                reject(error); // Caso ocorra algum erro na requisição AJAX
            },
            header: {},
            contentType: "application/json",
            dataType: "json", // Correção de 'datatype' para 'dataType'
        });
    });
    
}

function abrirPagina(id){
    window.location.href = `paginaOng.html?id=${id}`;
}