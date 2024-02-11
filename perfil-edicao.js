const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

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

    //Faz requisição para o banco do tipo GET para pegar o usuario com o id especificado
    $.ajax({
      type: "GET",
      url: `https://localhost:7070/user/GetById/${id}`,
      success: carregaPerfil, //Se tiver sucesso na requisição ira a chamar a função
      header: {},
      contentType: "application/json",
      datatype: "json",
    });

    //Faz requisição para carregar as conquistas concluidas
    $.ajax({
      type: "GET",
      url: `https://localhost:7070/AchievementsUser/ConquistasCompletas/${id}`,
      success: function(data){
        data.forEach(linha => {
          const conquistas = `<img id="${linha.id}" class="btn-conquistas open-modal flex justify-center" src="${linha.image}" alt="Conquista">`;
          $(`#conquistas-completas`).append($(conquistas));        
        });        
      }, 
      header: {},
      contentType: "application/json",
      datatype: "json",
    });

    //Faz requisição para pegar as conquistas nao concluidas
    $.ajax({
      type: "GET",
      url: `https://localhost:7070/AchievementsUser/ConquistasIncompletas/${id}`,
      success: function(data){
        var primeiro = 0
        //Para cada elemento retornado sera feito um HTML para o elemento
        //Usando seus valores vindos do banco
        data.forEach(linha => {
          console.log(linha.image)
          if(primeiro == 0){
            const incompletas =`<div class="flex flex-row mt-10">
            <div class="uncollected-achievement-icon-box flex items-center justify-center">
              <img class="achievement-icons unachieved-icons" src="${linha.image}" />
            </div>
            <div class="uncollected-achievement-description-box flex items-center">
              <h1>${linha.description}</h1>
            </div>
          </div>`;
          $(`#conquistas-incompletas`).append($(incompletas)); 
          primeiro = 1;
          }else{
            const incompletas = `<div class="flex flex-row mt-3">
            <div class="uncollected-achievement-icon-box flex items-center justify-center">
              <img class="achievement-icons unachieved-icons" src="${linha.image}" />
            </div>
            <div class="uncollected-achievement-description-box flex items-center">
              <h1>${linha.description}.</h1>
            </div>
          </div>`;
          $(`#conquistas-incompletas`).append($(incompletas)); 
          }
          
                 
        });        
      }, 
      header: {},
      contentType: "application/json",
      datatype: "json",
    });

    //Requisição para pegar todos os estados do banco
    $.ajax({
      type: "GET",
      url: "https://localhost:7070/State",
      success: loadStates,
      header: {},
      contentType: "application/json",
      dataType: "json",
    });

})

function loadStates(item){
  item.forEach(linha => {    
      const stateOption = `
          <option value="${linha.id}">${linha.name}</option>`;
      $(`#volunteer-state`).append($(stateOption));
  });
}

function loadCity(){
  event.preventDefault();
  var id = document.getElementById('volunteer-state').value;
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
  var limpa = document.getElementById("volunteer-city");
  limpa.innerText = "";
  item.forEach(linha => {
      
      const cityOption = `
          <option value="${linha.id}">${linha.name}</option>
      `;
      $(`#volunteer-city`).append($(cityOption));
  });
}

function carregaPerfil(obj){
  document.getElementById('nome-voluntario').innerHTML = obj.name;
  cityName(obj.cityId); //Chama funcao contendo ajax 
  stateName(obj.cityStateId);

  var name = obj.name.split(' ');
  document.getElementById('volunteer-first-name').placeholder = name[0];
  
  let lastName = "";
  for(var i = 1; i < name.length; i++){    
    lastName += name[i] + " ";
  }
  document.getElementById('volunteer-last-name').placeholder = lastName;
  document.getElementById('volunteer-email').placeholder = obj.email;
}

function cityName(id){
  $.ajax({
    type: "GET",
    url: `https://localhost:7070/City/GetByCityId/${id}`,
    success: function(data){
      document.getElementById('cidade-estado').innerHTML = data.name + ", ";
      document.getElementById('default-city').innerHTML = data.name;
      document.getElementById('default-city').value = data.id;
    }, 
    header: {},
    contentType: "application/json",
    datatype: "json",
  });
}

function stateName(id){
  $.ajax({
    type: "GET",
    url: `https://localhost:7070/State/${id}`,
    success: function (data){
        var contatena = document.getElementById('cidade-estado').textContent;
        document.getElementById('cidade-estado').innerHTML = contatena + data.name;
        document.getElementById('default-state').value = data.id    
        document.getElementById('default-state').innerHTML = data.name;
    }, 
    header: {},
    contentType: "application/json",
    datatype: "json",
  });
}

let profileImg = document.getElementById("profile-img");
let inputFile = document.getElementById("input-file");

inputFile.onchange = function() {
    profileImg.src = URL.createObjectURL(inputFile.files[0]);
}

function setDefaultPic() {
  let profileImg = document.getElementById("profile-img");

  if(profileImg) {
    profileImg.src = "assets/images/personimg.png";
  }
}

$(() => {
  $("#save-personal-info-btn").click(() => {
    const values = {
      firstName: $("#volunteer-first-name")[0].value,
      lastName: $("#volunteer-last-name")[0].value,
      email: $("#volunteer-email")[0].value,
      //birthdate: $("#birthdate")[0].value,
      city: $("#volunteer-city")[0].value,
      state: $("#volunteer-state")[0].value
    }
    if(!values.firstName) {
      values.firstName = document.getElementById('volunteer-first-name').placeholder;
    }

    if(!values.lastName) {
      values.lastName = document.getElementById('volunteer-last-name').placeholder;
    }

    if(!values.email){
      values.email = document.getElementById('volunteer-email').placeholder
    }
    
    const objetoEnvio ={
      id: id,
      name: values.firstName + " " + values.lastName.substring(0, values.lastName.length),
      email: values.email,
      cityId: values.city,
      cityStateId: values.state
    }

    $.ajax({
      type: "PUT",
      url: "https://localhost:7070/user/AtualizarConta",
      data: JSON.stringify(objetoEnvio),
      statusCode:{
        200: function(){
            window.alert("Conta atualizada");
        },
      },
      contentType: "application/json",
      dataType: "json",
    });
  })
})

const form = document.getElementById("personal-info-form");
const firstName = document.getElementById("volunteer-first-name");
const lastName = document.getElementById("volunteer-last-name");
const birthdate = document.getElementById("birthdate"); 
const city = document.getElementById("volunteer-city"); 
const state = document.getElementById("volunteer-state");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  checkForm();
})

// firstName.addEventListener("blur", () => {
//   checkInputFirstName();
// })

lastName.addEventListener("blur", () => {
  checkInputLastName();
})

// state.addEventListener("blur", () => {
//   checkInputState();
// })

// function checkInputFirstName() {
//   const volunteerFirstNameValue = firstName.value;

//   if(volunteerFirstNameValue === "") {
//     invalidInput(firstName, "Informe seu primeiro nome.");
//   } else {
//     const formItem = firstName.parentElement;
//     formItem.className = "form-input-box mt-4";
//   }
// }

function checkInputLastName() {
  const volunteerLastNameValue = lastName.value;

  if(volunteerLastNameValue === "") {
    invalidInput(lastName, "Informe seu sobrenome.");
  } else {
    const formItem = lastName.parentElement;
    formItem.className = "form-input-box mt-1";
  }
}

function checkInputState() {
  const volunteerStateValue = state.value;

  if(volunteerStateValue === "") {
    invalidInput(state, "Informe seu estado de residência.");
  } else {
    const formItem = state.parentElement;
    formItem.className = "form-input-box mt-6";
  }
}

function checkForm() {
  //checkInputFirstName();
  //checkInputLastName();
  //checkInputState();
}

function invalidInput(input, message) {
  const formItem = input.parentElement;
  const textMessage = formItem.querySelector("a");

  textMessage.innerText = message;

  formItem.className = "form-input-box invalid"
}

const ul = document.querySelector("#interests-ul");
const input = document.querySelector("#interests-input")

const itemsList = [];

input.addEventListener("keydown", (e) => {
  if(e.key == "Enter" && e.target.value) {
    itemsList.push(e.target.value);
    input.value = "";

    loadItems();
  }
});

function loadItems() {
  ul.innerHTML = "";
  itemsList.forEach((item, i) => {
    const li = document.createElement("li");

    li.innerHTML = `
    <div>
      <span>${item}</span>
      <button onclick="removeItem(${i})" data-i=${i}>&times;</button>
    </div>
    `;
    ul.appendChild(li);
  });
}

function removeItem(i) {
  itemsList.splice(i, 1);
  loadItems();
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
  closeButtons[index].addEventListener("click", toggleModal);
}