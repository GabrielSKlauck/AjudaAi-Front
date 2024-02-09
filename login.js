const login = async (email, password) => {
  let verifica = document.getElementById('ong-checkbox');
  
  if(verifica.checked){
    
    const loginUrl = apiUrl + "/ngo/login";
    const payload = {
    email: email,
    password: password
    };

  try {
    const request = await axios.post(loginUrl, payload);

    if (request.status != 200) return false;

    localStorage.setItem("token", request.data.token);
    localStorage.setItem("user", JSON.stringify(request.data.user));
    localStorage.setItem("role", "admin");

    return true;
    } catch (error) {
    return false;
    }
    

  }else{
    const loginUrl = apiUrl + "/user/login";
    const payload = {
    email: email,
    password: password
  };

  try {
    const request = await axios.post(loginUrl, payload);

    if (request.status != 200) return false;

    localStorage.setItem("token", request.data.token);
    localStorage.setItem("user", JSON.stringify(request.data.user));
    localStorage.setItem("role", "voluntario");

    return true;
  } catch (error) {
    return false;
  }
  }
  
};

$(() => {
  if (localStorage.getItem("user")) {
    redirect("homepage.html");
  }

  $("#btn-sign-in").click(() => {
    const inputs = {
      email: $("#Voluntario-email"),
      password: $("#Voluntario-password"),
    };

    if (!inputs.email[0].value) {
      alert("email não informado!");
      inputs.email.addClass("invalid");
      return;
    }
    inputs.email.removeClass("invalid");

    if (!inputs.password[0].value) {
      alert("senha não informada!");
      inputs.password.addClass("invalid");
      return;
    }
    inputs.password.removeClass("invalid");

    login(inputs.email[0].value, inputs.password[0].value).then((success) => {
        $("#btn-sign-in").text("Enviar");

      if (!success) {
        alert("O usuario não esta cadastrado!");
        return;
      }
      if(document.getElementById('ong-checkbox').checked){
        redirect("perfil-edicao-ong.html");
      }else{
        redirect("perfil-edicao.html");
      }
      
    });

    $("#btn-sign-in").text("Carregando");
  });
});
