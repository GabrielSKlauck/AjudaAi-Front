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