$(() => {

    $("#folder-title-green").click(() => {        
        $("#for-ngos").css('z-index', 1);
        $("#for-volunteers").css('z-index', 0);
        $(".folder-topic-ngo").css('z-index', 1);
        $(".folder-topic-volunteer").css('z-index', 0);
        $("#advertisement-icon-ngo").css('z-index', 1);
        $("#handshake-icon-volunteer").css('z-index', 0);
        $("#training-icon-ngo").css('z-index', 1);
        $("#medal-icon-volunteer").css('z-index', 0);

    });

    $("#folder-title-blue").click(() => {        
        $("#for-ngos").css('z-index', 0);
        $("#for-volunteers").css('z-index', 1);
        $(".folder-topic-ngo").css('z-index', 0);
        $(".folder-topic-volunteer").css('z-index', 1);
        $("#advertisement-icon-ngo").css('z-index', 0);
        $("#handshake-icon-volunteer").css('z-index', 1);
        $("#training-icon-ngo").css('z-index', 0);
        $("#medal-icon-volunteer").css('z-index', 1);
    });
 
    try{
        const user = JSON.parse(localStorage.getItem("user"));
        const id = user.id;
        const isNgo = localStorage.getItem("ong");
        if(id != null){
            
            if(isNgo == "true"){
                let link = document.getElementById('profile-page');
                link.setAttribute("href","perfil-edicao-ong.html");
                let linkSmall = document.getElementById('small-profile-page');
                linkSmall.setAttribute("href","perfil-edicao-ong.html");
            }else{            
                let link = document.getElementById('profile-page');
                link.setAttribute("href","perfil-edicao.html");
                let linkSmall = document.getElementById('small-profile-page');
                linkSmall.setAttribute("href","perfil-edicao.html");
            }
            document.getElementById('btn-login').style.display = 'none';
            document.getElementById('btn-logout').style.display = 'block';

            document.getElementById('btn-login-small').style.display = 'none';
            document.getElementById('btn-logout-small').style.display = 'block';

            document.getElementById('sign-up').style.display = 'none';
            document.getElementById('profile-page').style.display = 'block';
            document.getElementById('profile-page-small').style.display = 'block';
        }
    }catch{}
    
});

function logout(){
    localStorage.clear();
}
