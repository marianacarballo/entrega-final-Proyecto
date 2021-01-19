const CATEGORIES_URL = "http://localhost:1984/category"; //"https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "http://localhost:1984/publish"; //"https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "http://localhost:1984/category-info"; //"https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "http://localhost:1984/products"; //"https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "http://localhost:1984/product-info"; //"https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "http://localhost:1984/comments"; //"https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "http://localhost:1984/cart"; //"https://japdevdep.github.io/ecommerce-api/cart/654.json";
const CART_BUY_URL = "http://localhost:1984/cart-buy"; //"https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function() {
    document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function() {
    document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url) {
    var result = {};
    showSpinner();
    return fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
        })
        .then(function(response) {
            result.status = 'ok';
            result.data = response;
            hideSpinner();
            return result;
        })
        .catch(function(error) {
            result.status = 'error';
            result.data = error;
            hideSpinner();
            return result;
        });
}

//Boton con nombre usuario, carrito, mi perfil y cierre de sesion
function showDropdowns() {

    let htmlContentToAppend = "";

    htmlContentToAppend += `
    <div class="dropdown">
    <a class="btn btn-secondary dropdown-toggle" href="cart.html" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    </a>
  
    <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
      <a class="dropdown-item" href="cart.html"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-cart3" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
    </svg>Carrito</a>
      <a class="dropdown-item" href="my-profile.html"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-person-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
    </svg>Mi perfil</a>
      <a class="dropdown-item" id="cerrarSesion" href="index.html"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-return-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" d="M1.5 1.5A.5.5 0 0 0 1 2v4.8a2.5 2.5 0 0 0 2.5 2.5h9.793l-3.347 3.346a.5.5 0 0 0 .708.708l4.2-4.2a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 8.3H3.5A1.5 1.5 0 0 1 2 6.8V2a.5.5 0 0 0-.5-.5z"/>
    </svg>Cierre de sesión</a>
    </div>
  </div>
    `

    document.getElementById("nombreU").innerHTML = htmlContentToAppend;
    document.getElementById("dropdownMenuLink").innerHTML += localStorage.getItem("user");
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    var userlog = localStorage.getItem("user"); //leer el ítem almacenado en localStorage.
    userlog = JSON.parse(userlog); //JSON.parse: los datos se convertirán en un objeto JavaScript
    console.log(userlog);

    document.getElementById("nombreU").innerHTML = userlog; //inner.HTML: establece o devuelve el contenido al HTML.
    showDropdowns();

    //evento al boton cerrar sesion
    document.getElementById("cerrarSesion").addEventListener("click", function() {

        localStorage.clear(); // elimina todos los usuario almacenados
    })
});