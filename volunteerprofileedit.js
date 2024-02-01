let profileMenu = document.getElementById("profile-menu");

function toggleProfileMenu() {
    profileMenu.classList.toggle("open-profile-menu");
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