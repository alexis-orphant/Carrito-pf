class RickyMorty{
    constructor(id, name, image, species, cantidad, stock){
        this.id = id;
        this.name = name;
        this.image = image;
        this.species = species;
        this.cantidad = cantidad || 0;
        this.stock = 5;
    }
    // metodos
    aumentarCantidad(){
        this.cantidad ++;
    };
    alertaSinStock() {
        Swal.fire({
            title: 'No hay mas stock',
            text: 'No es posible agregar al carrito',
            width: 300,
            icon: 'error',
            confirmButtonText: 'Continuar',
            confirmButtonColor: '#3085d6'
        });
    };
};