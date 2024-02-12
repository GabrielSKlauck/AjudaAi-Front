const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
//const id = urlParams.get('id');
const id = 7;

$(() => {
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
          const conquistas = `<img id="${linha.id}" class="btn-conquistas open-modal flex justify-center"
                               src="${linha.image}" alt="Conquista" onclick="openConquestModal(${linha.id})">`;
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
    //console.log(obj);
    loadProfileImage();
    loadProfileInterest();
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

function loadProfileInterest(){
    $.ajax({
      type: "GET",
      url: `https://localhost:7070/userInterest/${id}`,
      success: function(data){ 
        if(data.length != 0){
          data.forEach(item =>{
            const interest = `<li class="btn-interesses flex justify-center" id="${item.id}">${item.name}</li>`;
            $(`#interest-list`).append($(interest));
          })       
        }       
      }, 
      header: {},
      contentType: "application/json",
      datatype: "json",
    });
  }

function loadProfileImage(){
    $.ajax({
      type: "GET",
      url: `https://localhost:7070/user/GetImageById/${id}`,
      success: function(data){ 
        if(data.length == 0){
          let profileImg = document.getElementById("img-profile-load");
                       
          if(profileImg) {
            profileImg.src = "assets/images/personimg1.png";
          } 
        }else{
          var img = document.getElementById("img-profile-load");
          img.setAttribute('src', `${data}`);         
        }           
      }, 
      header: {},
      contentType: "application/json",
      datatype: "json",
    });
  }

  function openConquestModal(achieId){
    $.ajax({
      type: "GET",
      url: `https://localhost:7070/AchievementsUser/ConquistaUser/${id}/${achieId}`,
      success: function(data){
        loadAchievementInfo(achieId);
        refactorDate(data.completionDate);
        
        $(`#modal-achievement`).addClass("modal-active");
      },
      header: {},
      contentType: "application/json",
      dataType: "json",
    });
  }

  function refactorDate(date){
    let correctDate = new Date(date);
    date =  correctDate.toLocaleDateString();    
    let achievementDate = document.getElementById('achievement-date-conclusion').innerHTML = "Alcançada em: " + date;
  }
  
  function loadAchievementInfo(achieId){
    $.ajax({
      type: "GET",
      url: `https://localhost:7070/Achievements/${achieId}`,
      success: function(data){
        let achievementImage = document.getElementById('achievement-icon-conclusion');
        achievementImage.setAttribute('src', `${data.image}`);
        let achievementDescription = document.getElementById('achievement-description').innerHTML = data.description;
      },
      header: {},
      contentType: "application/json",
      dataType: "json",
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