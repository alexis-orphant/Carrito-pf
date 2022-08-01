// variables
const personajes = [];
let carrito = [];
const divPersonajes = document.getElementById('divPersonajes');
const divTotal = document.getElementById('total')
const btnVaciar = document.getElementById('btnVaciar')


// desestructuracion de la clase
const {
    id,
    name,
    image,
    species,
    cantidad,
    stock
} = RickyMorty


// obtengo la API y empiezo a trabajar en ella
fetch(`https://rickandmortyapi.com/api/character/?page=1`)
    .then(response => response.json())
    .then( personajeS => personajeS.results.map(personaje => personajes.push(new RickyMorty(personaje.id, personaje.name, personaje.image, personaje.species, personaje.cantidad, personaje.stock))))
    .then(response => {
        
        // hago el recorrido del array
        for(const personaje of personajes){
            // etiqueta que va a contener a cada personaje y su card
            const div = document.createElement(`div`);
                div.className = "card mx-auto my-2 fw-semibold fs-4 fondo-card";
                div.id = `${personaje.id}`
                div.style.width = "18rem";
            div.innerHTML= "";
            // card de cada personaje
            div.innerHTML = `
                    <img src=${personaje.image} class="card-img-top pt-2" alt=${personaje.name}>
                    <div class="card-body" id=card-${personaje.id}>
                    <h5 class="card-title text-ligth">${personaje.name}</h5>
                    <h5 class="card-title text-ligth">Especie: ${personaje.species}</h5>
                    <button type="button" class="btn btn-primary mt-2" id=btn-${personaje.id}>Agregar al carrito</button>
                    </div>`;

            // agrego la card al divPersonajes que obtuvimos al principio 
            divPersonajes.appendChild(div)

            // evento de agregar al carrito
            const btnAgregar = document.getElementById(`btn-${personaje.id}`)
            btnAgregar.addEventListener("click", () => agregarAlCarrito(personaje))
        }
    });

    // eventos
    btnVaciar.addEventListener("click", ()=> vaciarCarrito())

// funciones
function agregarAlCarrito(personaje) {
    Toastify({
		text: "Producto agregado al carrito",
		gravity: "bottom",
		className: "info",
		duration: 2000,
		close: true,
		className: "alerta",
		style: {
			background: "linear-gradient(to right, #EB0000, #B80000)",
		},
	}).showToast();

    // busco si el presonaje que se agrega ya existe
    const personajeExistente = carrito.findIndex( (personajeCarrito) => {
        return personajeCarrito.name === personaje.name
    })
    //si no existe
    if(personajeExistente === -1){
        personaje.aumentarCantidad()
        carrito.push(new RickyMorty(personaje.id, personaje.name, personaje.image, personaje.species, personaje.cantidad, personaje.stock))
    } else{
        if(carrito[personajeExistente].cantidad >= carrito[personajeExistente].stock){
            carrito[personajeExistente].alertaSinStock()
        }else {
            carrito[personajeExistente].aumentarCantidad();
        }
    }
    console.log(carrito)

    // agregar lo comprado al localstorage
    localStorage.setItem("carrito", JSON.stringify(carrito));

    // pongo la funcion aca para que funcione cuando se hace click
	mostrarProductosAgregadosAlCarrito();
}

function vaciarCarrito() {
    divTotal.innerHTML = "";
    carrito = [];
    localStorage.clear()
    location.reload()
}

function mostrarProductosAgregadosAlCarrito(){
    
    divTotal.innerHTML="";
    
    const carritoJson =JSON.parse(localStorage.getItem("carrito"));

    if(carritoJson){
        for(const personaje of carritoJson){
            const divComprado = document.createElement("div")
            divComprado.className= "row w-100 mx-auto pt-3 pb-2 comprado"

            divComprado.innerHTML = `<figure class="col mx-auto">
            <img src=${personaje.image} class="w-75">
            </figure>
            <h5 class="col mx-auto pt-5">${personaje.name}</h5>
            <h5 class="col mx-auto pt-5">Especie: ${personaje.species}</h5>
            <h5 class="col mx-auto pt-5">Cantidad: ${personaje.cantidad}</h5>`
            
            divTotal.append(divComprado);
            // aca muestro en el titulo del carrito el total de personajes agregados
            const cuentaTotal = document.getElementById('cuentaTotal');
            const sumarTodos = carritoJson.map(personaje => personaje.cantidad).reduce((a, b) => a + b, 0);
            console.log(sumarTodos)
            cuentaTotal.innerText = `total de personajes: ${sumarTodos}`;
        }
    }else{
        return
    }
};

function cargarLS(){
    const carritoJson = JSON.parse(localStorage.getItem("carrito"))
    
    if(carritoJson){
        for(const personaje of carritoJson){
            carrito.push(new RickyMorty(personaje.id, personaje.name, personaje.image, personaje.species, personaje.cantidad, personaje.stock))
        }
    }
    mostrarProductosAgregadosAlCarrito(carritoJson);
}




cargarLS()
