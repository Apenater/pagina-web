// Constantes para completar las rutas de la API.
const PRODUCTO_API = 'services/admin/producto.php';
const CATEGORIA_API = 'services/admin/categoria.php';
const ADMIN_API = 'services/admin/administrador.php';
const MARCA_API = 'services/admin/marca.php';
const PEDIDOS_aPI = 'services/admin/pedidos.php';

// add

// Constante para establecer el formulario de buscar.
const SEARCH_FORM = document.getElementById('searchForm');
// Constantes para establecer el contenido de la tabla.
const TABLE_BODY = document.getElementById('tarjetas');
// Constantes para establecer los elementos del componente Modal.


// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', () => {
    
    // Llamada a la función para llenar la tabla con los registros existentes.
    fillTable();
});

/*
*   Función asíncrona para llenar la tabla con los registros disponibles.
*   Parámetros: form (objeto opcional con los datos de búsqueda).
*   Retorno: ninguno.
*/
const fillTable = async (form = null) => {
    // Se inicializa el contenido de la tabla.
    TABLE_BODY.innerHTML = '';
    // Se verifica la acción a realizar.
    (form) ? action = 'searchRows' : action = 'readAll';
    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(PEDIDOS_API, 'readAll', form);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Se establece un icono para el estado del producto.
            (row.estado_producto) ? icon = 'bi bi-eye-fill' : icon = 'bi bi-eye-slash-fill';
            // Se crean y concatenan las filas de la tabla con los datos de cada registro.
            TABLE_BODY.innerHTML += `
            <div class="card mb-3 mx-3 mt-5" style="max-width: 400px;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="../../resources/img/iconos/usuario.png" class="img-fluid rounded-start mt-5"
                        alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title"><b>Ricardo Melara</b></h5>
                        <br>
                        <p class="card-text">-Producto1</p>
                        <p class="card-text">-Producto2</p>
                        <p class="card-text">-Producto3</p>
                        <p class="card-text">...</p>
                        <p class="card-text"><small class="text-body-secondary">Last updated 8 mins ago</small>
                        <p class="text-danger"><b>Pendiente</b></p>
                        <button type="button" class="btn btn-outline-info" data-bs-toggle="modal"
                            data-bs-target="#masInfo">Información</button>
                        <div onclick="alertMine('entregado')" class="btn btn-outline-success">
                            <img src="../../resources/img/iconos/check.png" class="imagen-pedido">
                        </div>
                        </p>
                    </div>
                </div>
            </div>
        </div>
            `;
        });
        // Se muestra un mensaje de acuerdo con el resultado.
        ROWS_FOUND.textContent = DATA.message;
    } else {
        sweetAlert(4, DATA.error, true);
    }
}



/*
*   Función asíncrona para eliminar un registro.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
const openDelete = async (id) => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Desea eliminar el producto de forma permanente?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('id_Producto', id);
        // Petición para eliminar el registro seleccionado.
        const DATA = await fetchData(PRODUCTO_API, 'deleteRow', FORM);
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            // Se muestra un mensaje de éxito.
            await sweetAlert(1, DATA.message, true);
            // Se carga nuevamente la tabla para visualizar los cambios.
            fillTable();
        } else {
            sweetAlert(2, DATA.error, false);
        }
    }
}
