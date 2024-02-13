$(document).ready(function(){
    $("#start").click(function(){
        $("#start").css("display", "none");
        $("#opciones").fadeIn(1000);
        $("#opciones").css("display", "grid");
    })

});



// class Enemigo extends HTMLElement{
//     constructor(){
//         super();
//     }
//     connectedCallback(){
//         this.innerHTML = "Hola ";
//         this.style.color = "red";
//     }
// }

// window.customElements.define("enemigo-aparecer", Enemigo);