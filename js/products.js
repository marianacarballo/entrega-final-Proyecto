const ORDER_ASC_BY_COST = "mM";
const ORDER_DESC_BY_COST = "Mm";
const ORDER_BY_PROD_COUNT = "Cant.";
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;
var list_prod = [];
var filtrar = "";
//ordeno 
function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_COST) {
        result = array.sort(function(a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_COST) {
        result = array.sort(function(a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_COUNT) {
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    }
    return result;
}

function showProductsList(list_prod) {

    let htmlContentToAppend = "";
    for (let i = 0; i < list_prod.length; i++) {
        let products = list_prod[i];
        console.log(filtrar.toLowerCase());
        console.log(products.name.toLowerCase());

        // console.log((filtrar.toLowerCase().indexOf(products.name.toLowerCase())));
        // console.log(products.name);
        if (((minCount == undefined) || (minCount != undefined && parseInt(products.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(products.cost) <= maxCount)) &&
            ((filtrar == "") || (products.name.toLowerCase().indexOf(filtrar.toLowerCase()) > -1))) {

            htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
             <div class="col-md-4">
                   <div class="card mb-4 shadow-sm custom-card " style="width: 18rem;">
                       <img src="` + products.imgSrc + `" class="card-img-top" alt="` + products.description + `">
                             <div class="card-body">
                                     <div class="d-flex w-100 justify-content-between">
                                          <h5 class="mb-1">` + products.name + `</h5>
                                          <small class="text-muted"> ` + products.soldCount + `</small>
                                      </div>
                                         <small class="mb-1">` + products.description + `</small>
                             </div>
                                  <h5> U$S ` + products.cost + `</h5>
                   </div>
             </div>
            `;
        }

        document.getElementById("pro-list-container").innerHTML = htmlContentToAppend;
    }
}


function sortAndShowProducts(sortCriteria, productsArray) {
    currentSortCriteria = sortCriteria;

    if (productsArray != undefined) {
        list_prod = productsArray;
    }

    list_prod = sortProducts(currentSortCriteria, list_prod);

    //Muestro las categorías ordenadas
    showProductsList(list_prod);

}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) { //EVENTO Q SE ACTIVA CUANDO ABRIMOS EL HTML 
    getJSONData(PRODUCTS_URL).then(function(resultObj) { //LLAMA LA FUNCION getJSONData con la url de products y nos devuelve una promesa, si se resuelve la promesa entra en el then(function)
        if (resultObj.status === "ok") { //resultObj es lo que te devolvio el getJSONData.Si status del resultObj es ok 
            list_prod = resultObj.data;
            showProductsList(list_prod);
        }
    });
    //accede a el boton m-M,M-m,Cant. y limpiar añade evento al hacer click
    document.getElementById("sortAsc").addEventListener("click", function() {
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDesc").addEventListener("click", function() {
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortByCount").addEventListener("click", function() {
        sortAndShowProducts(ORDER_BY_PROD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function() {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList(list_prod);
    });
    //accede a la caja de max. y min. crea evento al hacer click en filtrar
    document.getElementById("rangeFilterCount").addEventListener("click", function() {
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
        } else {
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        } else {
            maxCount = undefined;
        }

        showProductsList(list_prod);
    });

    //crear filtro de busqueda
    document.getElementById("buscador").addEventListener("keyup", function() {

        filtrar = document.getElementById("buscador").value;

        console.log(filtrar);
        showProductsList(list_prod);
    });
});