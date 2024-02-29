const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

window.onload = function() {

  try{   
    const user = JSON.parse(localStorage.getItem("user"));
    const id = user.id;
    const isNgo = localStorage.getItem("ong");

    console.log(isNgo);
    
    if(id != null){
        
        if(isNgo == 'true'){
            let link = document.getElementById('profile-page');
            link.setAttribute("href","perfil-edicao-ong.html");
            let linkSmall = document.getElementById('small-profile-page');

            linkSmall.setAttribute("href","perfil-edicao-ong.html");
        }else{            
            let link = document.getElementById('profile-page');
            link.setAttribute("href","perfil-edicao.html");

            let linkSmall = document.getElementById('small-profile-page');

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



    $.ajax({
        type: "GET",
        url: `https://localhost:7070/ads/NgoId/${id}`,
        success: carregaAnuncios,
        header: {},
        contentType: "application/json",
        datatype: "json",
    });
};


function logout(){
  localStorage.clear();
}

function carregaOng(){       
    var titulo = document.getElementById("title-ong");
    var descricao = document.getElementById("description-ong");
    titulo.innerHTML = title;
    descricao.innerHTML = desc;
}

function carregaAnuncios(item){
    if(item.length == 0){
        var tagP = document.getElementById("oport");
        tagP.innerHTML = "Sem oportunidades no momento";
    }else{
        item.forEach(linha => {
        
            const cardAds = `
            <div id = "${linha.id}" class="cards card flex flex-col items-center h-96" onclick="abrirPagina(${linha.id})">
            <img src="assets/images/logo anuncio.jpg" alt="" class="h-40 w-60">
            <h1 class="text-xl mt-4 mb-4">${linha.title}</h1>
            <p class="text-center">
                ${linha.description}
            </p>
          </div>
            
           `;
            $(`.ongs-ads-list`).append($(cardAds));
        });  
    }
    
}

function abrirPagina(id){
    window.location.href = `paginaAnuncio.html?id=${id}`;
} 

$(() => {
  let selecionado = 0;

  $(".estrelaa-avaliacao").click((e) => {
    selecionado = $(e.currentTarget).data('number');
    $(".estrelaa-avaliacao").each((i, el) => {
      if ($(el).data('number') <= selecionado) {
        $(el).addClass('selected');
      } else {
        $(el).removeClass('selected');
      }
    })

  })


  const caixas = document.querySelectorAll(".caixa h1 ")
  const conteudos = document.querySelectorAll(".conteudo div")

  caixas.forEach((caixa, index) => {
    caixa.addEventListener("click", () => {
      conteudos.forEach((remover) => {
        remover.classList.remove("active")
      })
      caixas.forEach((caixa) => {
        caixa.classList.remove("active")
      })
      caixas[index].classList.add("active")
      conteudos[index].classList.add("active")
    })
  })

  $.ajax({
    type: "GET",
    url: `https://localhost:7070/ngo/${id}`,
    success: function (data) {
      document.getElementById('ngo-name').innerHTML = data.ngoName;
      document.getElementById('ngo-description').innerHTML = data.description;
      loadLocation(data.cityId);
      loadCause(data.causesId);
      loadOngPictures();
      loadAds();
    },
    header: {},
    contentType: "application/json",
    datatype: "json",
  });
})

const openModals = document.getElementsByClassName('open-modal');
const modalArray = Array.from(openModals).entries();
const modals = document.getElementsByClassName('modal');
const closeButtons = document.getElementsByClassName('close-modal');

for (let [index, trigger] of modalArray) {
  const toggleModal = () => {
    modals[index].classList.toggle('modal-active');
  }
  trigger.addEventListener("click", toggleModal);
  //closeButtons[index].addEventListener("click", toggleModal);
}

function loadOngPictures(){
  $.ajax({
    type: "GET",
    url: `https://localhost:7070/NgoImages/${id}`,
    success: function(data){
      if(data != null){
        data.forEach(linha => {
      
          const pics = 
          `<img id="${'picture' + linha.id}" src="${linha.image}" alt="" class="pictures-ongs mt-7 pl-3" >`;
          $(`#pictures-list`).append($(pics));
        });
      }       
    },
    contentType: "application/json",
    dataType: "json",
  });
}

function loadLocation(cityId, stateId) {

  $.ajax({
    type: "GET",
    url: `https://localhost:7070/City/GetLocalization/${cityId}`,
    success: function (data) {      
      document.getElementById('ngo-location').innerHTML = data;
    },
    header: {},
    contentType: "application/json",
    datatype: "json",
  });


}

function loadCause(causeId) {
  $.ajax({
    type: "GET",
    url: `https://localhost:7070/Causes/GetById/${causeId}`,
    success: function (data) {
      document.getElementById('ngo-causes').innerHTML = data.name;
    },
    header: {},
    contentType: "application/json",
    datatype: "json",
  });
}

function loadAds(){
  $.ajax({
    type: "GET",
    url: `https://localhost:7070/ads/NgoId/${id}`,
    success: function (data) {
      data.forEach(linha => {
        const ads = `
        <h2 class="anuncio cursor-pointer" onclick="candidatar(${linha.id})" >
        <span class="fundo-anuncio min-[777px]:flex max-[776px]:grid ">
          <h3 class="grid min-[777px]:ml-[0.7vw] min-[777px]:mt-[0.5vw] min-[777px]:mr-[0.7vw] max-[776px]:mt-[3vw]">
            <span class="min-[777px]:text-[1.1vw] max-[776px]:text-[5vw] font-semibold trabalho-voluntario-titulo">${linha.title}</span>
            <span class="max-[776px]:ml-[3vw] min-[777px]:text-[0.78vw] max-[776px]:text-[4vw] italic">${document.getElementById('ngo-location').innerHTML}</span>
            <span class="max-[776px]:ml-[3vw] min-[777px]:text-[0.78vw] max-[776px]:text-[4vw] italic">Expira dia: ${refactorDate(linha.expires)}</span>
          </h3>
        </span>
        <span
          class="max-[776px]:ml-[3vw] max-[776px]:mt-[2vw] font-['Inter'] italic  leading-[1vw] descricao-escrita">
          ${linha.description}
        </span>
      </h2>
        `;
        $('#ads-area').append(ads);        
      });  
    },
    header: {},
    contentType: "application/json",
    datatype: "json",
  });
}
function refactorDate(date){
  let correctDate = new Date(date);
  date =  correctDate.toLocaleDateString();    
  return date;
}

function candidatar(adsId){
    window.location.href = `paginaAnuncio.html?id=${adsId}`;
}