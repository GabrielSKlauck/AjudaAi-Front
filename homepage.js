$(() => {

    $("#folder-title-green").click(() => {        
        $("#for-ngos").css('z-index', 1);
        $("#for-volunteers").css('z-index', 0);
    });

    $("#folder-title-blue").click(() => {        
        $("#for-ngos").css('z-index', 0);
        $("#for-volunteers").css('z-index', 1);
    });
})
