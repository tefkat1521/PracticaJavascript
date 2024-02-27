$(document).ready(function(){//Usamos jquery para indicar que se ejecute el código cuándo se cargue toda la página.
    $("#start").click(function(){//Cuándo pulsemos el elemento con id start se ejecuta
        $("#start").css("display", "none");//Se oculta el elemento
        $("#opciones").fadeIn(1000);//Aparecen los elementos con id opciones de manera lenta
        $("#opciones").css("display", "grid");//ponemos display grid al mismo tiempo
    })   
});