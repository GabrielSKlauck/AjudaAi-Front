let profileMenu = document.getElementById("profileMenu");

function toggleProfileMenu(){
    profileMenu.classList.toggle("open-profile-menu");
}

let profileImg = document.getElementById("profile-img");
let inputFile = document.getElementById("input-file");

inputFile.onchange = function() {
    profileImg.src = URL.createObjectURL(inputFile.files[0]);
}