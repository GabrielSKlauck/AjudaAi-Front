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
})