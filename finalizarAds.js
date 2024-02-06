function finalizar(){
    $.ajax({
        type: "POST",
            url: `https://localhost:7070/user/SendTokenToEmail/${email}`,
            data: String,
            contentType: "application/json",  
            
            statusCode: {
                200: function() {
                  enableTokenPage(email);
                },
                401: function(){
                    emailIncorreto();
                }
              },               
                              
            dataType: "string",
    });
}