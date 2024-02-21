$(document).ready(function () {
    // Función para contar hacia atrás desde un número dado y mostrar el contador en pantalla
    function countdown(seconds) {
        return new Promise((resolve, reject) => {
            let count = seconds;
            const interval = setInterval(() => {
                if (count > 0) {
                    $("#contador").text(count);
                    count--;
                } else {
                    $("#contador").text("¡Dispara!");
                    clearInterval(interval);
                    resolve();
                }
            }, 1000);
        });
    }

    // Llamada a la función countdown antes de ejecutar el código principal
    countdown(3).then(() => {
        $(document).ready(function () {
            var puntuacion = 0; // Inicializamos la puntuación

            // Escuchamos el evento de clic en la imagen
            $("#enemigo").on("click", function () {
                // Cambiar el cursor al cursor de disparo
                $("#contenedorPartida").css("cursor", 'url("img/disparo.png") 16 16, auto');
                //Vaciamos el texto del contador cuándo el usuario pulse por primera vez
                $("#contador").text(" ");

                // Incrementar la puntuación
                setTimeout(function () {
                    puntuacion++;
                    // Actualizar la puntuación en el HTML
                    $("#puntuacion").text("Puntuación: " + puntuacion);

                    // Restaurar el cursor al de apuntar
                    setTimeout(function () {
                        $("#contenedorPartida").css("cursor", 'url("img/puntero.png") 16 16, auto');
                    }, 1);
                }, 100);
            });

            //Al finalizar
            function finalizar(puntuacion) {
                //Ocultamos el enemigo
                $("#enemigo").css("display", "none");
                //Enseñamos la puntuación al finalizar
                $("#contenedorPartida").text("Tu puntuación es: "+ puntuacion);
            }

            function tal(veces) {
                // Función para establecer la posición aleatoria y tamaño principal de la imagen
                function setInitialPosition() {
                    $("#enemigo").css("display","block");
                    var numAleatorio = Math.floor(Math.random() * 100) + 50;//Tamaño aleatorio

                    var $enemigo = $("#enemigo");
                    var $contenedorPartida = $("#contenedorPartida");

                    var contenedorWidth = $contenedorPartida.width();
                    var contenedorHeight = $contenedorPartida.height();

                    $("#enemigo").width(numAleatorio);
                    $("#enemigo").height(numAleatorio);

                    var imageWidth = $enemigo.width();
                    var imageHeight = $enemigo.height();

                    // Generar posiciones aleatorias en ambos ejes
                    var randomLeft = Math.random() * (contenedorWidth - imageWidth);
                    var randomTop = Math.random() * (contenedorHeight - imageHeight);

                    // Establecer la posición inicial aleatoria
                    $enemigo.css({
                        "left": randomLeft + "px",
                        "top": randomTop + "px"
                    });
                }

                // Función para mover la imagen fuera del contenedor
                function moveImageOut() {
                    var $enemigo = $("#enemigo");
                    var $contenedorPartida = $("#contenedorPartida");
                    var contenedorWidth = $contenedorPartida.width();
                    var contenedorHeight = $contenedorPartida.height();
                    var imageWidth = $enemigo.width();
                    var imageHeight = $enemigo.height();

                    // Establecer la posición fuera del contenedor en un lado aleatorio
                    var side = Math.floor(Math.random() * 4); // 0: arriba, 1: derecha, 2: abajo, 3: izquierda
                    var left, top;

                    switch (side) {
                        case 0: // arriba
                            left = Math.random() * (contenedorWidth - imageWidth);
                            top = -imageHeight;
                            break;
                        case 1: // derecha
                            left = contenedorWidth;
                            top = Math.random() * (contenedorHeight - imageHeight);
                            break;
                        case 2: // abajo
                            left = Math.random() * (contenedorWidth - imageWidth);
                            top = contenedorHeight;
                            break;
                        case 3: // izquierda
                            left = -imageWidth;
                            top = Math.random() * (contenedorHeight - imageHeight);
                            break;
                    }

                    var segundos = Math.random() * 1000 + 500;

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
                        } else {
                            finalizar(puntuacion);
                        }
                    });
                }

                // Establecer la posición inicial aleatoria de la imagen
                setInitialPosition();

                // Llamar a moveImageOut() para iniciar el movimiento
                moveImageOut();
            }

            // Llamar a tal() para que se ejecute 10 veces
            tal(10);

            // Evitar el arrastre de la imagen al mantener pulsado
            $("#enemigo").on('mousedown', function (e) {
                e.preventDefault();
            });
        });
    }).catch(error => {
        console.error('Error en el contador: ', error);
    });

   
});
