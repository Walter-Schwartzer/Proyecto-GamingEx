




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


/////////////////////////////////////////////////

// !Carrito

const btnCart = document.querySelector('.ctn-cart-icon');
const containerCartProducts = document.querySelector('.container-cart-products');

btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart')
});


const cartInfo = document.querySelector(`.cart-product`);
const rowProduct = document.querySelector(`.row-product`);

/////

const productList = document.querySelector(`.cont-general`);

let allProducts = [];

document.addEventListener(`DOMContentLoaded`,() =>{
    if(localStorage.getItem(`carrito`))
        carrito  = JSON.parse(localStorage.getItem(`carrito`));
        productList
});

const valorTotal = document.querySelector(`.total-pagar`);

const countProducts = document.querySelector(`#contador-productos`)




productList.addEventListener(`click`, e =>{
    
    if(e.target.classList.contains(`addtoCart`)){
        const products = e.target.parentElement;
        
        const infoProduct = {
            quantity: 1,
            title: products.querySelector(`h2`).textContent,
            price: products.querySelector(`p`).textContent,
        };

        const existe = allProducts.some(product => product.title === infoProduct.title);

        if(existe){
            const product = allProducts.map(product =>{
                if(product.title === infoProduct.title){
                    product.quantity++;
                    return product
                }else{
                    return product
                }
            })
            allProducts = [...product];
        } else{
            allProducts = [...allProducts, infoProduct];
        }
        

        showHTMl()
        
    }


});

rowProduct.addEventListener(`click`, (e) =>{
    if(e.target.classList.contains(`icon-close`)){
        const product = e.target.parentElement;
        const title = product.querySelector(`p`).textContent;

        allProducts = allProducts.filter(product => product.title !== title);

        console.log(allProducts);
        showHTMl()
    }
})


const showHTMl = () =>{

    if(!allProducts.length){
        containerCartProducts.innerHTML = `
        <p class="cart-empty" style="text-align: center">El carrito esta vacio</p>
        `
    }

    rowProduct.innerHTML = "";

    let total = 0;
    let totalOfProducts = 0;

    allProducts.forEach(product =>{
        const containerProduct = document.createElement(`div`);
        containerProduct.classList.add(`cart-product`);

        containerProduct.innerHTML = `
        <div class="info-cart-product">
            <span class="cantidad-producto-carrito">${product.quantity}</span>
            <p class="titulo-producto-carrito">${product.title}</p>
            <span class="precio-producto-carrito">${product.price}</span>
        </div>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="icon-close"
            >
            <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
            />
        </svg>
        `;

        rowProduct.append(containerProduct);

        localStorage.setItem(`carrito`, JSON.stringify(rowProduct))

        total = total + parseInt(product.quantity * product.price.slice(1));

        totalOfProducts = totalOfProducts + product.quantity;

    })

    valorTotal.innerText = `$${total}`;
    countProducts.innerText = totalOfProducts;

}

