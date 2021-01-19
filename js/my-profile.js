//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
    // This function will display the specified tab of the form ...
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "block";
    // ... and fix the Previous/Next buttons:
    if (n == 0) {
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }
    if (n == (x.length - 1)) {
        document.getElementById("nextBtn").innerHTML = "Submit";
    } else {
        document.getElementById("nextBtn").innerHTML = "Next";
    }
    // ... and run a function that displays the correct step indicator:
    fixStepIndicator(n)
}

function nextPrev(n) {
    // This function will figure out which tab to display
    var x = document.getElementsByClassName("tab");
    // Exit the function if any field in the current tab is invalid:
    if (n == 1 && !validateForm()) return false;
    // Hide the current tab:
    x[currentTab].style.display = "none";
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;
    // if you have reached the end of the form... :
    if (currentTab >= x.length) {
        //...the form gets submitted:
        document.getElementById("regForm").submit();
        return false;
    }
    // Otherwise, display the correct tab:
    showTab(currentTab);
}

function validateForm() {
    // This function deals with validation of the form fields
    var x, y, i, valid = true;
    x = document.getElementsByClassName("tab");
    y = x[currentTab].getElementsByTagName("input");
    // A loop that checks every input field in the current tab:
    for (i = 0; i < y.length; i++) {
        // If a field is empty...
        if (y[i].value == "") {
            // add an "invalid" class to the field:
            y[i].className += " invalid";
            // and set the current valid status to false:
            valid = false;
        }
    }
    // If the valid status is true, mark the step as finished and valid:
    if (valid) {
        document.getElementsByClassName("step")[currentTab].className += " finish";
    }
    return valid; // return the valid status
}

function fixStepIndicator(n) {
    // This function removes the "active" class of all steps...
    var i, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
    }
    //... and adds the "active" class to the current step:
    x[n].className += " active";

    //Obtener una referencia al elemento de imagen
    var imgPerfil = document.getElementById("imgPerfil");
    // Actúa cuando la imagen se haya cargado
    imgPerfil.addEventListener("load", function() {
        imgPerfil.crossOrigin = "Anonymous";
        var imgCanvas = document.createElement("canvas"),
            imgContext = imgCanvas.getContext("2d");
        // Asegúrate de que el lienzo sea tan grande como la imagen
        imgCanvas.width = imgPerfil.width;
        imgCanvas.height = imgPerfil.height;
        // Dibujar la imagen en el elemento de lienzo
        imgContext.drawImage(imgPerfil, 0, 0, imgPerfil.width, imgPerfil.height);
        // Obtener el contenido del lienzo como una URL de datos
        var imgAsDataURL = imgCanvas.toDataURL("image/jpeg");
        // Guardar imagen en localStorage
        try {
            localStorage.setItem("imgPerfil", imgAsDataURL);
        } catch (e) {
            console.log("Storage failed:" + e);
        }
    }, false);
}


document.addEventListener("DOMContentLoaded", function(e) {
    document.getElementById("nextBtn").addEventListener("click", function() {

        pNombre = document.getElementById("1name").value;
        sNombre = document.getElementById("2name").value;
        pApellido = document.getElementById("1apellido").value;
        sApellido = document.getElementById("2apellido").value;
        email = document.getElementById("email").value;
        edad = document.getElementById("edad").value;
        telefone = document.getElementById("telefone").value;
        imagen = document.getElementById("myFile").value;
        //si pNombre no estan vacios guardar los datos 
        //JSON.stringify lo convertimos en string
        if (pNombre != "") {
            localStorage.setItem("pNombre", JSON.stringify(pNombre));
        }
        if (sNombre != "") {
            localStorage.setItem("sNombre", JSON.stringify(sNombre));
        }
        if (pApellido != "") {
            localStorage.setItem("pApellido", JSON.stringify(pApellido));
        }
        if (sApellido != "") {
            localStorage.setItem("sApellido", JSON.stringify(sApellido));
        }
        if (email != "") {
            localStorage.setItem("email", JSON.stringify(email));
        }
        if (edad != "") {
            localStorage.setItem("edad", JSON.stringify(edad));
        }
        if (telefone != "") {
            localStorage.setItem("telefone", JSON.stringify(telefone));
        }

    })

    //leer el ítem almacenado en localStorage.getItem
    //JSON.parse: los datos se convertirán en un objeto JavaScript
    var userpNombre = localStorage.getItem("pNombre");
    userpNombre = JSON.parse(userpNombre);
    console.log(userpNombre);

    var usersNombre = localStorage.getItem("sNombre");
    usersNombre = JSON.parse(usersNombre);
    console.log(usersNombre);

    var userpApellido = localStorage.getItem("pApellido");
    userpApellido = JSON.parse(userpApellido);
    console.log(userpApellido);

    var usersApellido = localStorage.getItem("sApellido");
    usersApellido = JSON.parse(usersApellido);
    console.log(usersApellido);

    var useremail = localStorage.getItem("email");
    useremail = JSON.parse(useremail);
    console.log(useremail);

    var useredad = localStorage.getItem("edad");
    useredad = JSON.parse(useredad);
    console.log(useredad);

    var usertelefone = localStorage.getItem("telefone");
    usertelefone = JSON.parse(usertelefone);
    console.log(usertelefone);

    //inner.HTML: establece o devuelve el contenido al HTML.
    document.getElementById("1").innerHTML = userpNombre;
    document.getElementById("2").innerHTML = usersNombre;
    document.getElementById("3").innerHTML = userpApellido;
    document.getElementById("4").innerHTML = usersApellido;
    document.getElementById("5").innerHTML = useremail;
    document.getElementById("6").innerHTML = useredad;
    document.getElementById("7").innerHTML = usertelefone;

});