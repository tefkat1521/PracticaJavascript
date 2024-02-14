// Función para mover la imagen aleatoriamente hacia abajo

function moveImage() {
    $("#enemigo").width(200);
    
    
    var alturaTotal = $("#todo").height();
    $("#enemigo").height();

    var a = img.clientHeight;
    var maxTop = windowHeight - imageHeight;

    var randomTop = Math.floor(Math.random() * (maxTop + 1));


    img.style.top = randomTop + "px";
}

// Llamar a la función inicialmente
$(document).ready(function () {
moveImage();


setInterval(moveImage, 3000);

});