const apiUrl = "https://localhost:7070";

const redirect = (url) => {
    let baseUrl = window.location.href.split("/");
    baseUrl.pop();
    baseUrl = baseUrl.join("/");
  
    window.location.replace(baseUrl + "/" + url);
  };