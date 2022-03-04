const ui={

    onFormSubmit: (data) => {},
    onEliminarClick: (codigo) => {},
    onEditarClick: (codigo) => {},
    renderForm,
    renderTable,
    
};

const form = document.getElementsByTagName("form")[0];
const tbody = document.getElementsByTagName("tbody")[0];
const cantidadTotalElement = document.getElementById("cantidad-total");
const precioTotalElement = document.getElementById("precio-total");
const granTotalElement = document.getElementById("gran-total");
const inputCodigo = document.getElementById("codigo");
const inputNombre = document.getElementById("nombre");
const inputCantidad = document.getElementById("cantidad");
const inputPrecio = document.getElementById("precio");
const selectCategoria = document.getElementById("categoria");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const [frmCodigo, frmNombre, frmCantidad, frmPrecio, frmCategoria] = Array.from(data.entries());
    
    const codigo = parseInt(frmCodigo[1]);
    const nombre = frmNombre[1];
    const cantidad = parseFloat(frmCantidad[1]);
    const precio = parseFloat(frmPrecio[1]);
    const categoria = parseInt(frmCategoria[1]);

    ui.onFormSubmit({
        codigo,
        nombre,
        cantidad,
        precio,
        categoria
    });

    form[1].focus();
});

function renderForm(producto){
    inputCodigo.value = producto.codigo || "";
    inputNombre.value = producto.nombre || "";
    inputCantidad.value = producto.cantidad || "";
    inputPrecio.value = producto.precio || "";
    selectCategoria.value = producto.categoria || 1;
}

function renderTable(productos){
    
    const filas = productos.map((item)=> {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${item.codigo}</td>
            <td>${item.nombre}</td>
            <td>${item.cantidad}</td>
            <td>${item.precio}</td>
            <td>${item.total}</td>
            <td>
                <section class="btn-group">
                    <a class="btn btn-sm btn-outline-secondary" href="#">
                        <i class="bi bi-pencil-square"></i>
                    </a>
                    <a class="btn btn-sm btn-outline-danger" href="#">
                        <i class="bi bi-trash"></i>
                    </a>
                </section>
            </td>
        `;

        const [editar, eliminar] = tr.getElementsByTagName("a");

        eliminar.addEventListener("click", (event) => {
            event.preventDefault();
            ui.onEliminarClick(item.codigo);
        });

        editar.addEventListener("click", (event) => {
            event.preventDefault();
            ui.onEditarClick(item.codigo);
        });

        
        return tr;

    });

    tbody.innerHTML = "";
    filas.forEach((tr) => {
        tbody.appendChild(tr)    
    });

    cantidadTotalElement.innerText = sum(productos , x => x.cantidad);
    precioTotalElement.innerText = sum(productos , x => x.precio);
    granTotalElement.innerText = sum(productos , x => x.total);

    function sum(elementos, selector) {
        return elementos 
        .map(selector)
        .reduce((a,b) => a + b, 0);
    }

}