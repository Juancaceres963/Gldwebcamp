(function(){
    "use strict";

    var regalo = document.getElementById("regalo");

    document.addEventListener("DOMContentLoaded", function(){
// Campos datos de usuario
var nombre = document.getElementById("nombre");
var apellido = document.getElementById("apellido");
var email = document.getElementById("email");

// Campos pases
var pase_dia = document.getElementById("pase_dia");
var pase_dos_dias = document.getElementById("pase_dos_dias");
var pase_completo = document.getElementById("pase_completo");

//Botones y divs
const calcular = document.getElementById("calcular");
const errorDiv = document.getElementById("error");
const bottonRegistro = document.getElementById("btnRegistro");
const resultado = document.getElementById("lista_productos");

//Extras
var etiquetas = document.getElementById("etiquetas");
var camisas = document.getElementById("camisa-evento");

//Funciones 
//Calcular Montos 
function calcularMontos(event){
    event.preventDefault();
    if(regalo.value === ""){
        alert("Debes elegir un Regalo");
        regalo.focus();
    } else {
        var valorPaseDia = pase_dia.value ,
            valorPaseDosDias = pase_dos_dias.value ,
            valorPaseCompleto = pase_completo.value,
            cantCamisas = camisas.value,
            cantEtiquetas = etiquetas.value;

        var totalPrecioPases = (valorPaseDia * 30) + (valorPaseDosDias * 45) + (valorPaseCompleto * 50) + ((cantCamisas * 10) * .93) + (cantEtiquetas * 2);
        console.log(totalPrecioPases);
    }
}
calcular.addEventListener("click", calcularMontos)
    }); //Don content Loaded
})();