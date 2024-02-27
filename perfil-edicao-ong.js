const id = JSON.parse(localStorage.getItem("user")).id
$(() => {

  try{   
    const user = JSON.parse(localStorage.getItem("user"));
    const id = user.id;
    const isNgo = localStorage.getItem("ong");
    
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

function logout(){
  localStorage.clear();
}


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

function loadLocation(cityId) {

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
        <h2 class="anuncio">
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
        <span class="fundo-anuncio2">
          <button class="botao-anuncio font-['Inter']" onclick="encerrarAds(${linha.id})">
            Encerrar
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