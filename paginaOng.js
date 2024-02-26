/* const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

var title = "";
var desc = "";
window.onload = function() {
    request('GET', `ngo/${id}`, {}, function(result) {
        title = result.ngoName;
        desc = result.description;
       // console.log(title + " " + desc);
        carregaOng();
    });

    $.ajax({
        type: "GET",
        url: `https://localhost:7070/ads/NgoId/${id}`,
        success: carregaAnuncios,
        header: {},
        contentType: "application/json",
        datatype: "json",
    });
};

function carregaOng(){       
    var titulo = document.getElementById("title-ong");
    var descricao = document.getElementById("description-ong");
    titulo.innerHTML = title;
    descricao.innerHTML = desc;
}

function carregaAnuncios(item){
    console.log(item);
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


function request(method, url, headers, successCallback) {
    $.ajax({
        type: method,
        url: `https://localhost:7070/${url}`,
        headers: headers,
        success: successCallback,
        contentType: 'application/json',
        dataType: 'json',
    });
}

function abrirPagina(id){
    window.location.href = `paginaAnuncio.html?id=${id}`;
} */
const id = JSON.parse(localStorage.getItem("user")).id
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
      loadLocation(data.cityId, data.cityStateId);
      loadCause(data.causesId);
      loadAds();
    },
    header: {},
    contentType: "application/json",
    datatype: "json",
  });
})

const form = document.getElementById("criador-oportunidades");
const titulo = document.getElementById("titulo");
const dataExpiracao = document.getElementById("data-expiracao");
const descricao = document.getElementById("descricao");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  checkForm();
})

titulo.addEventListener("blur", () => {
  checkInputFirstName();
})

dataExpiracao.addEventListener("blur", () => {
  checkInputLastName();
})

descricao.addEventListener("blur", () => {
  checkInputState();
})

function checkInputFirstName() {
  const tituloValue = titulo.value;

  if (!tituloValue) {
    invalidInput(titulo, "Informe o título.");
  } else {
    const formItem = titulo.parentElement;
    formItem.className = "caixa-entrada";
  }
}

function checkInputLastName() {
  const dataExpiracaoValue = dataExpiracao.value;

  if (!dataExpiracaoValue) {
    invalidInput(dataExpiracao, "Informe a data de expiração.");
  } else {
    const formItem = dataExpiracao.parentElement;
    formItem.className = "caixa-entrada";
  }
}

function checkInputState() {
  const descricaoValue = descricao.value;

  if (!descricaoValue) {
    invalidInput(descricao, "Informe uma descrição para a oportunidade.");
  } else {
    const formItem = descricao.parentElement;
    formItem.className = "caixa-entrada";
  }
}

function checkForm() {
  checkInputFirstName();
  checkInputLastName();
  checkInputState();

  const formItems = form.querySelectorAll(".caixa-entrada");
  const isValid = [...formItems].every((item) => {
    return item.className === "caixa-entrada";
  });
  return isValid;
};

$("#btn-create-ads").click(() => {
  if (checkForm()) {
  
    const values = {
      title: document.getElementById('titulo').value,
      description: document.getElementById('descricao').value,
      expires: document.getElementById('data-expiracao').value,
      ngo_Id: JSON.parse(localStorage.getItem("user")).id
    }
    
    $.ajax({
      type: "POST",
      url: "https://localhost:7070/ads",
      data: JSON.stringify(values),
      header:{
        "Authorization": `Bearer ${localStorage.getItem(`token`)}`
      },
      statusCode:{
        200: function(){
          let tag = document.getElementById('modal-anunciar');
          tag.remove('modal-anunciar');
        },
      },
      contentType: "application/json",
      dataType: "json",
     });
  }
});

function invalidInput(banana, message) {
  const formItem = banana.parentElement;
  const textMessage = formItem.querySelector("a");

  textMessage.innerText = message;

  formItem.className = "caixa-entrada invalid"
}


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




let ngoLocation;

function loadLocation(cityId, stateId) {

  $.ajax({
    type: "GET",
    url: `https://localhost:7070/City/GetByCityId/${cityId}`,
    success: function (data) {
      ngoLocation = data.name + ", ";
    },
    header: {},
    contentType: "application/json",
    datatype: "json",
  });

  $.ajax({
    type: "GET",
    url: `https://localhost:7070/State/${stateId}`,
    success: function (data) {
      ngoLocation = ngoLocation + data.name;
      document.getElementById('ngo-location').innerHTML = ngoLocation;
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
        <h2 class="anuncio ">
        <span class="fundo-anuncio">
          <h3 class="grid min-[777px]:ml-[0.7vw] min-[777px]:mt-[0.5vw] min-[777px]:mr-[0.7vw] ">
            <span class="text-[1.1vw] font-semibold trabalho-voluntario-titulo">${linha.title}</span>
            <span class="text-[0.78vw] italic">${document.getElementById('ngo-location').innerHTML}</span>
            <span class="text-[0.78vw] italic">Expira dia: ${refactorDate(linha.expires)}</span>
          </h3>
        </span>
        <span
          class="flex min-[777px]:ml-[0.5vw] min-[777px]:mt-[0.1vw] min-[777px]:mr-[0.5vw] font-['Inter'] italic text-[0.60vw] leading-[1vw] descricao-escrita">
          ${linha.description}
        </span>
        <span class="fundo-anuncio2">
          <button class="botao-anuncio font-['Inter']" onclick="encerrarAds(${linha.id})">
            Candidatar
          </button>
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

function encerrarAds(adsId){
  $.ajax({
    type: "POST",
    url: `https://localhost:7070/ads/Finalizar/${adsId}`,
    header: {},
    contentType: "application/json",
    datatype: "json",
  });
}