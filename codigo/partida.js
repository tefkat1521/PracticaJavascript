function tal(veces) {
    $(document).ready(function () {
        // Función para establecer la posición inicial aleatoria de la imagen
        $("#enemigo").width(Math.random() * 700); // Ponemos un tamaño aleatorio

        function setInitialPosition() {
            var $enemigo = $("#enemigo");
            var windowWidth = $(window).width();
            var windowHeight = $(window).height();
            var imageWidth = $enemigo.width();
            var imageHeight = $enemigo.height();

            // Generar posiciones aleatorias en ambos ejes
            var randomLeft = Math.random() * (windowWidth - imageWidth);
            var randomTop = Math.random() * (windowHeight - imageHeight);

            // Establecer la posición inicial aleatoria
            $enemigo.css({
                "left": randomLeft + "px",
                "top": randomTop + "px"
            });
        }

        // Función para mover la imagen fuera de la pantalla
        function moveImageOut() {
            var $enemigo = $("#enemigo");
            var windowWidth = $(window).width();
            var windowHeight = $(window).height();
            var imageWidth = $enemigo.width();
            var imageHeight = $enemigo.height();

            // Establecer la posición fuera de la pantalla en un lado aleatorio
            var side = Math.floor(Math.random() * 4); // 0: arriba, 1: derecha, 2: abajo, 3: izquierda
            var left, top;

            switch (side) {
                case 0: // arriba
                    left = Math.random() * (windowWidth - imageWidth);
                    top = -imageHeight;
                    break;
                case 1: // derecha
                    left = windowWidth;
                    top = Math.random() * (windowHeight - imageHeight);
                    break;
                case 2: // abajo
                    left = Math.random() * (windowWidth - imageWidth);
                    top = windowHeight;
                    break;
                case 3: // izquierda
                    left = -imageWidth;
                    top = Math.random() * (windowHeight - imageHeight);
                    break;
            }

            var segundos = Math.random() * 4000;

            // Animar la imagen hacia la posición calculada
            $enemigo.animate({
                "left": left + "px",
                "top": top + "px"
            }, segundos, "linear", function () {
                // Llamar a setInitialPosition() después de completar la animación
                setInitialPosition();

                // Llamar a moveImageOut() nuevamente si todavía hay movimientos pendientes
                if (veces > 1) {
                    veces--;
                    moveImageOut();
                }
            });
        }

        // Establecer la posición inicial aleatoria de la imagen
        setInitialPosition();

        // Llamar a moveImageOut() para iniciar el movimiento
        moveImageOut();
    });
}

// Llamar a tal() para que se ejecute 5 veces
tal(5);

$(document).ready(function () {
    var puntuacion = 0; // Inicializamos la puntuación
    // Función para incrementar la puntuación y actualizarla en el HTML
    function incrementarPuntuacion() {
        puntuacion++; // Incrementamos la puntuación en 1
        document.getElementById("puntuacion").innerText = "Puntuación: " + puntuacion; // Actualizamos la puntuación en el HTML
    }

    // Escuchamos el evento de clic en la imagen
    document.getElementById("enemigo").addEventListener("click", function () {
        incrementarPuntuacion(); // Llamamos a la función para incrementar la puntuación cuando se haga clic en la imagen
    });
});