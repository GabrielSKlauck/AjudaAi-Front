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

    $.ajax({
      type: "GET",
      url: `https://localhost:7070/AchievementsUser/ConquistasCompletas/${id}`,
      success: function(data){
        data.forEach(linha => {
          const conquistas = `<img id="${linha.id}" class="btn-conquistas flex justify-center" src="./assets/images/conquista2.png" alt="Conquista">`;
          $(`#conquistas-completas`).append($(conquistas));        
        });        
      }, 
      header: {},
      contentType: "application/json",
      datatype: "json",
    });

})

function carregaPerfil(obj){
  document.getElementById('nome-voluntario').innerHTML = obj.name;
  cityName(obj.cityId); //Chama funcao contendo ajax 
  stateName(obj.cityStateId);
}

function cityName(id){
  $.ajax({
    type: "GET",
    url: `https://localhost:7070/City/GetByCityId/${id}`,
    success: function(data){
      document.getElementById('cidade-estado').innerHTML = data.name + ", ";
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
      birthdate: $("#birthdate")[0].value,
      city: $("#volunteer-city")[0].value,
      state: $("#volunteer-state")[0].value
    }

    if(!values.firstName) {
      return;
    }

    if(!values.lastName) {
      return;
    }

    if(!values.state) {
      return;
    }

    console.log(values);
    alert("Informações atualizadas com sucesso!");
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

firstName.addEventListener("blur", () => {
  checkInputFirstName();
})

lastName.addEventListener("blur", () => {
  checkInputLastName();
})

state.addEventListener("blur", () => {
  checkInputState();
})

function checkInputFirstName() {
  const volunteerFirstNameValue = firstName.value;

  if(volunteerFirstNameValue === "") {
    invalidInput(firstName, "Informe seu primeiro nome.");
  } else {
    const formItem = firstName.parentElement;
    formItem.className = "form-input-box mt-4";
  }
}

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
  checkInputFirstName();
  checkInputLastName();
  checkInputState();
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