window.onload = function(){
    $.ajax({
        type: "GET",
        url: `https://localhost:7070/NgoImages/${14}`,
        success: showImages,
        header: {},
        contentType: "application/json",
        datatype: "json",
    });
}

function showImages(item){
    console.log(item);
    var img;
    item.forEach(linha => {
        if(linha.id == 2){
            img = linha.image;
            const tag = `
            <img src="${conversaoBaseParaImagem(linha.image)}" id="img">   
            `; 
            $(`#teste`).append($(tag));
        }else{
            img = linha.image;
            const tag = `
            <img src="${conversaoBaseParaImagemSemSuf(linha.image)}" id="img">   
            `; 
            $(`#teste`).append($(tag));  
        }
    });

    
}

function conversaoBaseParaImagemSemSuf(base){
    var image = new Image();
    return image.src = base
}

function conversaoBaseParaImagem(base){
    var image = new Image();
    return image.src = 'data:image/png;base64,' + base;
}

document.getElementById('inputFile').addEventListener('change', handleFileSelect);
   function handleFileSelect(event) {
     const fileInput = event.target;
     const files = fileInput.files;
     if (files.length > 0) {
       const selectedFile = files[0];
       const reader = new FileReader();
       reader.onload = function (e) {         
        const base64String = e.target.result;
        envio(base64String);
       };
       reader.readAsDataURL(selectedFile);
     }
    }

    function envio(base64){
        const envio ={
            image: base64,
            ngoId: 14
        }

        $.ajax({
            type: "POST",
            url: "https://localhost:7070/NgoImages",
            data: JSON.stringify(envio),
            contentType: "application/json",
            error: alert("Voluntario ja logado no respectivo anuncio"),
            dataType: "json",
        });
    }