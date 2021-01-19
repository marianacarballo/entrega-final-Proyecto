const dolar = 40;
let product = [];
//templet con la info de los productos
function showCart(array) {

    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let articulos = array[i];
        //console.log(articulos);

        htmlContentToAppend += `
        <table class="table">
        <tbody>
            <tr>
                <th scope="row">
                <div class="dropdown">
                  <img src="` + articulos.src + `" alt="Cinque Terre" style="width:90px;height:70px;">
                     <div class="dropdown-content">
                       <img src="` + articulos.src + `" alt="Cinque Terre" width="300" height="200">
                     </div>
                </div>
                <td>` + articulos.name + `</td> 
                <td><input id= "` + i + `" type="number" name="quantity" min="0" value =${articulos.count} onchange="showSubTotalArt(` + i + `)"></td>
                <td>` + articulos.currency + ` ` + articulos.unitCost + `</td>
                <td scope="col" id= "subTotalArt` + i + `" >${articulos.unitCost * articulos.count}</td>
           <td><button class="btn btn-danger" onclick="borrar(${i});">
           <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
</svg></button></td>
                </tr>
        </tbody>
    </table>
    `
    }
    document.getElementById("container").innerHTML = htmlContentToAppend;
}

//calculo sub total de cada articulo
function showSubTotalArt(posicion) {
    //console.log(posicion);

    cantmult = document.getElementById(posicion).value; //valido el input con cantidad de articulos
    console.log(cantmult);
    let precio = product[posicion].unitCost; //paso el precio en dolares
    let moneda = product[posicion].currency;

    if (moneda == "UYU") {
        precio = precio / dolar;
    }
    subTotalArticulo = precio * cantmult;
    //console.log(subTotalArticulo);
    let posicionArt = "subTotalArt" + posicion; //le pase id "subTotalArt" linea 25
    // console.log(posicionArt);
    document.getElementById(posicionArt).innerHTML = subTotalArticulo; //agrego al html

    // console.log(subTotalArticulo);
    showSubTotal(subTotalArticulo);

}

//Borro articulos 
function borrar(posicion) { //paso la posicion

    product.splice(posicion, 1); //lo quito del array
    showCart(product); //vuelvo a mostrar los productos que quedan
}

//calculo sub total
function showSubTotal() {
    var subTotal = 0;
    var envio = 0;
    var total = 0;
    for (let i = 0; i < product.length; i++) {
        subTotal += parseFloat(document.getElementById("subTotalArt" + i).innerText);
    }
    document.getElementById("subTotal").innerHTML = subTotal;

    // calculamos envio
    if (document.getElementById("premium").checked) {
        envio = subTotal * 0.15;
    }
    if (document.getElementById("express").checked) {
        envio = subTotal * 0.07;
    }
    if (document.getElementById("standard").checked) {
        envio = subTotal * 0.05;
    }
    total = subTotal + envio;
    document.getElementById("precioEnvio").innerHTML = envio;
    document.getElementById("precioTotal").innerHTML = total;
}

document.addEventListener("DOMContentLoaded", function(e) { //EVENTO Q SE ACTIVA CUANDO ABRIMOS EL HTML 
    getJSONData(CART_INFO_URL).then(function(resultObj) { //LLAMA LA FUNCION getJSONData con la url de cart-info  y nos devuelve una promesa, si se resuelve la promesa entra en el then(function)

        if (resultObj.status === "ok") { //resultObj es lo que te devolvio el getJSONData.Si status del resultObj es ok 
            product = resultObj.data.articles; //obtengo array de 2 productos del json
            // console.log(product);

            showCart(product);
            //console.log(product.articles);
            showSubTotal(product);
        }
    });
});