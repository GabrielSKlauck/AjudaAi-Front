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
})