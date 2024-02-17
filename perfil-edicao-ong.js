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

    if (!dataExpiracaoValue ) {
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

    if (isValid) {
      alert("Informações atualizadas com sucesso!");
    }
  }

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
    closeButtons[index].addEventListener("click", toggleModal);
  }

})
