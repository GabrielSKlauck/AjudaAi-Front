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
})
