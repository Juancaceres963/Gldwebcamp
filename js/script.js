(function () {
  "use strict";

  var regalo = document.getElementById("regalo");

  document.addEventListener("DOMContentLoaded", function () {
    //Mapa
    var map = L.map("mapa").setView([51.505, -0.09], 13);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker([51.5, -0.09])
      .addTo(map)
      .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
      .openPopup();

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
    const lista_productos = document.getElementById("lista_productos");
    const suma = document.getElementById("suma_total");

    //Extras
    var etiquetas = document.getElementById("etiquetas");
    var camisas = document.getElementById("camisa-evento");

    pase_dia.addEventListener("blur", mostrarDias); //Evento que espera a que un input termine de tener su valor
    pase_dos_dias.addEventListener("blur", mostrarDias);
    pase_completo.addEventListener("blur", mostrarDias);

    //Validacion de campos
    nombre.addEventListener("blur", validarCampos);
    apellido.addEventListener("blur", validarCampos);
    email.addEventListener("blur", validarCampos);
    email.addEventListener("blur", validarEmail);

    function validarCampos() {
      if (this.value == "") {
        errorDiv.style.display = "block";
        errorDiv.innerHTML = "Este campo es obligatorio.";
        this.style.border = "1px solid red";
        errorDiv.style.border = "1px solid red";
      } else {
        this.style.border = "1px solid #222";
        errorDiv.innerHTML = "";
        errorDiv.style.border = "none";
        errorDiv.style.display = "none";
      }
    }

    function validarEmail() {
      if (this.value.indexOf("@") > -1) {
        this.style.border = "1px solid #222";
        errorDiv.innerHTML = "";
        errorDiv.style.border = "none";
        errorDiv.style.display = "none";
      } else {
        errorDiv.style.display = "block";
        errorDiv.innerHTML = "Debes ingresar una direccion de correo valida.";
        this.style.border = "1px solid red";
        errorDiv.style.border = "1px solid red";
      }
    }

    calcular.addEventListener("click", calcularMontos); // Evento que se activa al hacer click

    //Funciones
    //Calcular Montos
    function calcularMontos(event) {
      event.preventDefault();
      if (regalo.value === "") {
        alert("Debes elegir un Regalo");
        regalo.focus();
      } else {
        // ParseInt se utiliza para que evitemos posibles numeros raros que puedan salir
        var valorPaseDia = parseInt(pase_dia.value, 10) || 0,
          valorPaseDosDias = parseInt(pase_dos_dias.value, 10) || 0,
          valorPaseCompleto = parseInt(pase_completo.value, 10) || 0,
          cantCamisas = parseInt(camisas.value, 10) || 0,
          cantEtiquetas = parseInt(etiquetas.value, 10) || 0;

        var totalPagar =
          valorPaseDia * 30 +
          valorPaseDosDias * 45 +
          valorPaseCompleto * 50 +
          cantCamisas * 10 * 0.93 +
          cantEtiquetas * 2;

        var listadoProductos = [];
        if (valorPaseDia >= 1) {
          listadoProductos.push(valorPaseDia + " Pase por dia");
        }
        if (valorPaseDosDias >= 1) {
          listadoProductos.push(valorPaseDosDias + " Pase por dos dias");
        }
        if (valorPaseCompleto >= 1) {
          listadoProductos.push(valorPaseCompleto + " Pase completo");
        }
        if (cantCamisas >= 1) {
          listadoProductos.push(cantCamisas + " Camisetas");
        }
        if (cantEtiquetas >= 1) {
          listadoProductos.push(cantEtiquetas + " Etiquetas");
        }

        lista_productos.style.display = "block"; //Para que el bg-color del listado en el HTML se vea de color dierente al cargar
        // Codigo para imprimir los elementos de listadoProductos en el div lista_productos que esta en el HTML
        lista_productos.innerHTML = ""; // Este innerHTML vacio es para que no reimprima todo lo que se selecciono
        // si el usuario agrega algo mas despues de calcular
        for (var i = 0; i < listadoProductos.length; i++) {
          lista_productos.innerHTML += listadoProductos[i] + "<br/>";
        }

        //Imprimir el total
        suma.innerHTML = "$ " + totalPagar.toFixed(2); //Con tofixed recortamos para que solo tenga la cantidad de decimales que queremos
      }
    }

    function mostrarDias() {
      var valorPaseDia = parseInt(pase_dia.value, 10) || 0,
        valorPaseDosDias = parseInt(pase_dos_dias.value, 10) || 0,
        valorPaseCompleto = parseInt(pase_completo.value, 10) || 0;

      var diasElegidos = [];
      if (valorPaseDia > 0) {
        diasElegidos.push("viernes");
      }
      if (valorPaseDosDias > 0) {
        diasElegidos.push("viernes", "sabado");
      }
      if (valorPaseCompleto > 0) {
        diasElegidos.push("viernes", "sabado", "domingo");
      }

      for (let i = 0; i < diasElegidos.length; i++) {
        document.getElementById(diasElegidos[i]).style.display = "block";
      }
    }
  }); //Don content Loaded
})();
