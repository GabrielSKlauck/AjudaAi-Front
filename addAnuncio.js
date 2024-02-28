window.onload = function(){
    $.ajax({
        type: "GET",
        url: "https://localhost:7070/Ads",
        success: mostraAds,
        header: {},
        contentType: "application/json",
        datatype: "json",
    });

    $.ajax({
      type: "GET",
      url: "https://localhost:7070/Causes",
      success: loadCauses,
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
}

function logout(){
  localStorage.clear();
}

function carregarId(){
  event.preventDefault();
  var id = document.getElementById('causes-menu').value; 
  filtraAds(id);  
}

function filtraAds(id){
  if(id == 0){
    $.ajax({
      type: "GET",
      url: "https://localhost:7070/Ads",
      success: mostraAds,
      header: {},
      contentType: "application/json",
      datatype: "json",
  });
  }else{
    $.ajax({
      type: "GET",
      url: `https://localhost:7070/Ads/CausesId/${id}`,
      success: mostraAdsEspec,
      header: {},
      contentType: "application/json",
      datatype: "json",
    });
  }
  
}

function mostraAdsEspec(item){
  //LIMPA CARDS DO CONTAINER-INTERNO
  var limpo = document.getElementById("container-interno");
  limpo.innerText = "";

  //VERIFICA SE EXISTEM ELEMENTO NO BANCO
  //SE NAO EXISTE COLOCA UM AVISO NA TELA
  if(item.length == 0){
    var tag = document.getElementById("aviso-sem-anuncios");
    tag.style.display = 'block';

  }else{
    var tag = document.getElementById("aviso-sem-anuncios");
    tag.style.display = 'none';
    item.forEach(linha => {
        
      const cardAds = `
      <div id = "${linha.id}" class="cards card border-2 p-2 flex flex-col items-center h-96" onclick="abrirPagina(${linha.id})">
      <img src="assets/images/logo anuncio.jpg" alt="" class="h-40 w-60">
      <h1 class="text-xl mt-4 mb-4">${linha.title}</h1>
      <p class="text-center">
          ${linha.description}
      </p>
    </div>
      
     `;
      
      $(`.container-interno`).append($(cardAds));
  });
  }  
}

function mostraAds(item){
  if(item.length == 0){
    var tag = document.getElementById("aviso-sem-anuncios");
    tag.style.display = 'block';

  }else{
    var limpo = document.getElementById("container-interno");
    limpo.innerText = "";
    var tag = document.getElementById("aviso-sem-anuncios");
    tag.style.display = 'none';
    item.forEach(linha => {
        
      const cardAds = `
      <div id = "${linha.id}" class="cards card border-2 p-2 flex flex-col items-center h-96" onclick="abrirPagina(${linha.id})">
      <img src="assets/images/logo anuncio.jpg" alt="" class="h-40 w-60">
      <h1 class="text-xl mt-4 mb-4">${linha.title}</h1>
      <p class="text-center">
          ${linha.description}
      </p>
    </div>
      
     `;
      $(`.container-interno`).append($(cardAds));
    });
  }    
}

function loadCauses(item){
  console.log(item)
  item.forEach(linha => {
        
    const op = `
    <option value="${linha.id}">${linha.name}</option>
    
   `;
    $(`#causes-menu`).append($(op));
});
}



function abrirPagina(id){
  window.location.href = `paginaAnuncio.html?id=${id}`;
}