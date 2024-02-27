var arrayEnemigos = ["img/enemigo1.png", "img/enemigo2.webp", "img/enemigo3.webp"];//Un array con las imágenes de los enemigos
var arrayPistas = ["img/batalla1.png", "img/batalla2.jpg", "img/batalla3.jpg"];//Array con las imagenes de fondo

function ejecutar() {//Se inicia cuándo se pulsa el botón iniciar
    $("#enemigo").css("display","none");//Se oculta el enemigo para mostrar el contador hacia atrás
    $(document).ready(function () {
        $("#botonIniciar").css("display","none");//Se oculta el botón para iniciar la partida.
        function countdown(seconds) {//Se crea una función al que se le pasa un segundo como parámetro
            return new Promise((resolve, reject) => {
                let count = seconds;
                const interval = setInterval(() => {//Setinterval 
                    if (count > 0) {//Si el contador es mayor que 0
                        $("#contador").text(count);
                        count--;//Se resta uno
                    } else {//Si no, aparece el mensaje Dispara!
                        $("#contador").text("¡Dispara!");
                        clearInterval(interval);//Limpiamos el intervalo
                        resolve();
                    }
                }, 1000);
            });
        }
        // Llamada a la función countdown antes de ejecutar el código principal
        countdown(3).then(() => {
            $("#enemigo").css("display", "block");
            $(document).ready(function () {
                var puntuacion = 0; // Inicializamos la puntuación

                $("#enemigo").on("click", function () {//Cuándo se haga clic en la imagen(enemigo)
                    // Cambiar el cursor al cursor de disparo
                    $("#contenedorPartida").css("cursor", 'url("img/disparo.png") 16 16, auto');
                    //Vaciamos el texto del contador cuándo el usuario pulse por primera vez

                    $("#contador").text(" ");
                    setTimeout(function () {//setTimeout que incrementa la puntuación
                        puntuacion++;
                        // Actualizar la puntuación en el HTML
                        $("#puntuacion").text("Puntuación: " + puntuacion);

 
                        setTimeout(function () {//setTimeOut que restaura el contador
                            $("#contenedorPartida").css("cursor", 'url("img/puntero1.png") 16 16, auto');
                        }, 1);
                    }, 100);
                });

                //Al finalizar
                function finalizar(puntuacion) {
                    //Ocultamos el enemigo
                    $("#enemigo").css("display", "none");
                    //Enseñamos la puntuación al finalizar
                    $("#contenedorPartida").html("Tu puntuación es: " + puntuacion + '<a href="partida.html" class="botonEstilo"><button>Volver a jugar</button></a>');


                }

                function tal(veces) {
                    // Función para establecer la posición aleatoria y tamaño principal del enemigo con parámetro de las veces que se vaya a ejecutar
                    function setInitialPosition() {
                        $("#enemigo").css("display","block");//Mostramos el enemigo por si no estuviese visible
                        var numAleatorio = Math.floor(Math.random() * 100) + 50;//Tamaño aleatorio

                        var $enemigo = $("#enemigo");
                        var $contenedorPartida = $("#contenedorPartida");

                        var contenedorWidth = $contenedorPartida.width();
                        var contenedorHeight = $contenedorPartida.height();

                        $("#enemigo").width(numAleatorio);//Indicamos un tamaño aleatorio

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
                            case 0:
                                left = Math.random() * (contenedorWidth - imageWidth);
                                top = -imageHeight;
                                break;
                            case 1: 
                                left = contenedorWidth;
                                top = Math.random() * (contenedorHeight - imageHeight);
                                break;
                            case 2:
                                left = Math.random() * (contenedorWidth - imageWidth);
                                top = contenedorHeight;
                                break;
                            case 3: 
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
}

class Enemigo extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        let contador = 1;
        const enemigoImg = document.getElementById('enemigo');
        
        const button = document.createElement('button');
        button.textContent = 'Cambiar enemigo';
        button.classList.add("botonEstilo");
        button.addEventListener('click', () => {
            enemigoImg.src = arrayEnemigos[contador];
            $("#contenedorPartida").css("background-image", "url('" + arrayPistas[contador ]+"')");
            if (contador >= arrayEnemigos.length - 1) {
                contador = 0;
            }else{
                contador++;
            }
        });
        this.appendChild(button);
        

    }
}

window.customElements.define("cambiar-enemigo", Enemigo);