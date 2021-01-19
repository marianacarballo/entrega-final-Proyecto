//tosar.agustin@gmail.com
//Entregable 3. ejercicio: 1.
//Realizar una petición web a una URL con un identificador del producto donde se encuentra toda la información detallada del mismo. 
//Toda la información se deberá desplegar en HTML.
var estrellas = "";
var usuario = "";
var estrellitas = "";

//mostramos el carrusel de imagenes
function showImagesGallery(array) {

    let htmlContentToAppend = "";

    htmlContentToAppend += `

          <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
          <ol class="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>   
         </ol>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img class="img-responsive" src="` + array[0] + `" alt="First slide">
            </div>
            <div class="carousel-item">
              <img class="img-responsive" src="` + array[1] + `" alt="Second slide">
            </div>
            <div class="carousel-item">
              <img class="img-responsive" src="` + array[2] + `" alt="Third slide">
            </div>
            <div class="carousel-item">
            <img class="img-responsive" src="` + array[3] + `" alt="Third slide">
          </div>
          <div class="carousel-item">
          <img class="img-responsive" src="` + array[4] + `" alt="Third slide">
        </div>
          </div>
          <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      `

    document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;

}

//Mostramos productos relacionados
function showRelatedProducts(productos, prodRel) {

    let htmlContentToAppend = "";

    for (let i = 0; i < prodRel.length; i++) {
        // console.log(prodRel);
        let posicion = prodRel[i];
        //console.log(productos);
        //console.log(posicion);
        let relatepr = productos[posicion];

        htmlContentToAppend += `
        <a href="product-info.html" class="list-group-item list-group-item-action">
        <div class="row">
            <div class="col-3">
                <img src="` + relatepr.imgSrc + `" alt="` + relatepr.description + `" class="img-thumbnail">
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">` + relatepr.name + `</h4>
                </div>
            </div>
        </div>
        </a>            
        `

        document.getElementById("relatedProducts").innerHTML = htmlContentToAppend;
    }
    //  console.log(productos.length);
};
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;
            //console.log(product);
            document.getElementById("productName").innerHTML = product.name;
            document.getElementById("productCurrency").innerHTML = product.currency;
            document.getElementById("productCost").innerHTML = product.cost;
            showImagesGallery(product.images);
            document.getElementById("productDescription").innerHTML = product.description;
            document.getElementById("productCount").innerHTML = product.soldCount;
            document.getElementById("productCategory").innerHTML = product.category;

            getJSONData(PRODUCTS_URL).then(function(resultObj) {
                if (resultObj.status === "ok") {
                    showRelatedProducts(resultObj.data, product.relatedProducts);

                    // console.log(product.relatedProducts);

                };
            });
        }
    });
});


//Entregable 3. ejercicio: 2.
//Realizar una petición web a una URL donde ya se encuentran los comentarios y puntuación precargados del producto del punto anterior.
// Mostrar en HTML la información. ¿Quieres aplicar la puntuación en formato de estrellas?

//comentarios y puntuación
function showComments(comentarios) {
    let htmlContentToAppend = "";

    for (let i = 0; i < comentarios.length; i++) {
        let detalle = comentarios[i]; {}
        showStars(detalle.score);

        htmlContentToAppend += `
        <div class="com">
        <div class="chip">
  <img src="img/img-perfil.jpg" alt="Person" width="96" height="96">
  <p id="user">` + detalle.user + `</p>
</div>
        <p>` + estrellas + `</p>
        <p>` + detalle.description + `</p>
        <p class="time-right">` + detalle.dateTime + `</p>
        <br>       
        </div>
        `

        estrellas = "";
        document.getElementById("comentarios").innerHTML = htmlContentToAppend;
    }
}

//aplicar la puntuación en formato de estrellas
function showStars(cantidad) {

    for (let i = 0; i < cantidad; i++) {
        estrellas += `<span class="fa fa-star checked"></span>`
    };
    for (let i = 0; i < 5 - cantidad; i++) {
        estrellas += `<span class="fa fa-star"></span>`
    };
}

document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            //console.log(comentarios);
            showComments(resultObj.data);
        }
    });
});

//Desafiate
//Si bien el comentario ingresado no será enviado a ningún servidor, cuando se simule el envío del mismo,
// intenta agregarlo cómo un
//comentario más de los mostrados referente al producto.
function showCyP() {
    let htmlContentToAppend = "";

    var date = new Date();

    htmlContentToAppend += `
    <div Class="miComentario">
    <p id="user">` + usuario + `</p>
    <p >` + estrellitas + `</p>
    <p>` + mensaje + `</p>
    <p Class="time-right">` + date + `</p>
    <br>
    </div>
    `
    estrellitas = "";
    document.getElementById("miComentario").innerHTML += htmlContentToAppend;
}

document.addEventListener("DOMContentLoaded", function(e) { //EVENTO Q SE ACTIVA CUANDO ABRIMOS EL HTML 

    document.getElementById("enviar").addEventListener("click", function(e) {

        mensaje = document.getElementById("comentario").value;
        //  console.log(mensaje);

        var userlog = localStorage.getItem("user"); //leer el ítem almacenado en localStorage.
        userlog = JSON.parse(userlog); //JSON.parse: los datos se convertirán en un objeto JavaScript
        //console.log(userlog);
        usuario = userlog;
        showCyP();
    });
});