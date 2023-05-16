




// Buscador

//variables

let barsSearch = document.getElementById("ctn-bars-search");
let coverSearch = document.getElementById("cover-ctn-search");
let inputSeach  =document.getElementById("inputSearch");
let boxSearch = document.getElementById("box-search");

// functions
const mostrarbuscador = () =>{
    barsSearch.style.top = "66px";
    coverSearch.style.display = "block";
    inputSeach.focus();
    
    if(inputSeach.value === ""){
        boxSearch.style.display = "none";
    }
}

//esconder barra
const ocultarBuscador = () =>{
    barsSearch.style.top = "-100px";
    coverSearch.style.display = "none";
    inputSeach.value = "";
    boxSearch.style.display = "none";
}

//creando filtrado de busqueda
const buscadorInterno = () =>{
    let filter = inputSeach.value.toUpperCase();
    let li = boxSearch.getElementsByTagName("li");

    // recorriendo elementos a filtrar
    for (let i = 0; i < li.length; i++){
        let a = li[i].getElementsByTagName("a")[0];
        let textValue = a.textContent || a.innerText;
        
        if(textValue.toUpperCase().indexOf(filter) > -1){
            li[i].style.display = "";
            boxSearch.style.display = "block";
            if(inputSeach.value === ""){
                boxSearch.style.display = "none";
            }
        } else{
            li[i].style.display = "none";
        }
    }
}

//activar funcion
document.getElementById("icon-search").addEventListener("click", mostrarbuscador);
document.getElementById("cover-ctn-search").addEventListener("click", ocultarBuscador);
document.getElementById("inputSearch").addEventListener("keyup", buscadorInterno);

