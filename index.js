const form = document.getElementsByTagName("form")[0];
const tbody = document.getElementsByTagName("tbody")[0];
const cantidadTotalElement = document.getElementById("cantidad-total");
const precioTotalElement = document.getElementById("precio-total");
const granTotalElement = document.getElementById("gran-total");
/** @type {HTMLInputElement} */ 
const inputCodigo = document.getElementById("codigo");
/** @type {HTMLInputElement} */ 
const inputNombre = document.getElementById("nombre");
/** @type {HTMLInputElement} */ 
const inputCantidad = document.getElementById("cantidad");
/** @type {HTMLInputElement} */ 
const inputPrecio = document.getElementById("precio");
/** @type {HTMLSelectElement} */ 
const selectCategoria = document.getElementById("categoria");

let indice = 0;
let cantidadTotal = 0;
let precioTotal = 0;
let granTotal = 0;
let currentRow;

let edit = false; 
form.addEventListener("submit", onSubmit);
/**
 * 
 * @param {Event} event 
 */
function onSubmit(event){

    event.preventDefault();

    const data = new FormData(form);
    const [frmCodigo, frmNombre, frmCantidad, frmPrecio, frmCategoria] = Array.from(data.entries());
    
    let codigo = frmCodigo[1];
    const nombre = frmNombre[1];
    const cantidad = frmCantidad[1];
    const precio = frmPrecio[1];
    const categoria = frmCategoria[1];
    const total = cantidad * precio;

    cantidadTotal = parseFloat(cantidad) + cantidadTotal;
    precioTotal = parseFloat(precio) + precioTotal;
    granTotal = parseFloat(total) + granTotal;
    let tr;
    if (!edit){
        indice++;
        codigo= indice;
        tr = document.createElement("tr");
        tbody.appendChild(tr);
    } else {
        tr = currentRow;
    }


    tr.dataset.categoria = categoria;
    tr.innerHTML = `
        <td>${codigo}</td>
        <td>${nombre}</td>
        <td>${cantidad}</td>
        <td>${precio}</td>
        <td>${total}</td>
        <td>
            <section class="btn-group">
                <a class="btn btn-sm btn-outline-secondary" href="#" onclick="onEdit(event)">
                    <i class="bi bi-pencil-square"></i>
                </a>
                <a class="btn btn-sm btn-outline-danger" href="#" onclick="onDelete(event)">
                    <i class="bi bi-trash"></i>
                </a>
            </section>
        </td>
    `
    

    cantidadTotalElement.innerText = cantidadTotal;
    precioTotalElement.innerText = precioTotal;
    granTotalElement.innerText = granTotal;

    edit = false;
    form.reset();
    form[1].focus();
}

/**
 * 
 * @param {Event} event 
 */
function onDelete(event){

    event.preventDefault();

    edit = false;
    form.reset();

    /** @type {HTMLAnchorElement} */
    const anchor = event.currentTarget;
    const tr = anchor.parentElement.parentElement.parentElement;
    tbody.removeChild(tr);
}

/**
 * 
 * @param {Event} event 
 */
function onEdit(event){

    event.preventDefault();

    edit = true;

    /** @type {HTMLAnchorElement} */
    const anchor = event.currentTarget;
    const tr = anchor.parentElement.parentElement.parentElement;
    currentRow = tr;
    const celdas = tr.getElementsByTagName("td");

    const [tdCodigo, tdNombre, tdCantidad, tdPrecio] = celdas;

    
    inputCodigo.value = tdCodigo.innerText;
    inputNombre.value = tdNombre.innerText;
    inputCantidad.value = tdCantidad.innerText;
    inputPrecio.value = tdPrecio.innerText;
    selectCategoria.value = tr.dataset.categoria;
}
