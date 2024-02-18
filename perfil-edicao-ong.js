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
      caixa.addEventListener("click",() => {
        conteudos.forEach((remover) => {
          remover.classList.remove("active")
        })
        caixas.forEach((caixa)=> {
          caixa.classList.remove("active")
        })
        caixas[index].classList.add("active")
        conteudos[index].classList.add("active")
      })
    })

    try{
      const user = JSON.parse(localStorage.getItem("user"));
      const id = user.id;

      if(id != null){
          document.getElementById('btn-login').style.display = 'none';
          document.getElementById('btn-logout').style.display = 'block';

          document.getElementById('btn-login-small').style.display = 'none';
          document.getElementById('btn-logout-small').style.display = 'block';

          document.getElementById('sign-up').style.display = 'none';
          document.getElementById('btn-sign-up-small').style.display = 'none';
          document.getElementById('profile-page').style.display = 'block';
          document.getElementById('profile-page-small').style.display = 'block';
      }
  }catch{}
})

function logout(){
  localStorage.clear();
}