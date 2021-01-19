//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) { //activa un evento cuando abre el html
    document.getElementById("boton").addEventListener("click", function() { //activa evento cuando hace click en el boton
        correo = document.getElementById("inputEmail").value;
        contraseña = document.getElementById("inputContraseña").value;
        modifCorreo = document.getElementById("inputEmail").style.background = "pink";
        modifContraseña = document.getElementById("inputContraseña").style.background = "pink";

        //si contraseña y usuario no estan vacios redirije al indej 
        if (correo != "") {
            localStorage.setItem("user", JSON.stringify(correo)); //JSON lo convertimos en string (strignify)
        }
        if (contraseña != "") { //si contraseña y usuario no estan vacios redirije al indej 
            if (correo != "" && contraseña != "")
                location.href = "inicio.html";
        } else {
            return modifCorreo.placeholder || modifContraseña;
        }
    });
});