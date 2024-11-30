
// Función para calcular el monto 
function calcularMonto(monto) {
    return monto <= 10000
        ? monto + (monto * 0.30) // CALCULO DEL 30%
        : monto <= 20000
            ? monto + (monto * 0.20) // CALCULO DEL 20%
            : monto + (monto * 0.10); // CALCULO DEL 10%
}

// Función para obtener el monto 
function obtenerMontoUsuario() {
    const monto = parseInt(document.getElementById('monto').value);
    return monto;
}

// Función para verificar si el monto es válido
function esMontoValido(monto) {
    return !isNaN(monto) && monto > 0;
}

// Función para verificar si la edad es válida
function esEdadValida(edad) {
    return !isNaN(edad) && edad >= 18;
}


document.getElementById('solicitudForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombreUsuario').value.trim();
    const apellido = document.getElementById('apellidoUsuario').value.trim();
    const edad = parseInt(document.getElementById('edadUsuario').value.trim());
    const monto = obtenerMontoUsuario();

    // Validando datos
    if (nombre === "" || apellido === "" || isNaN(edad) || edad <= 0 || isNaN(monto) || monto <= 0) {
        Swal.fire({
            icon: 'error',
            title: 'Datos inválidos',
            text: 'Por favor, complete todos los campos correctamente.',
            confirmButtonText: 'Ok'
        });
    } else if (!esEdadValida(edad)) {
        Swal.fire({
            icon: 'error',
            title: 'Edad inválida',
            text: 'Debes tener al menos 18 años para solicitar un préstamo.',
            confirmButtonText: 'Ok'
        });
    } else {
        
        const datosUsuario = {
            nombre: nombre,
            apellido: apellido,
            edad: edad,
            monto: monto
        };
        sessionStorage.setItem('datosUsuario', JSON.stringify(datosUsuario));

        // Calcular el monto a pagar
        const montoTotal = calcularMonto(monto);

        Swal.fire({
            icon: 'success',
            title: 'Datos enviados',
            text: `Los datos se han enviado correctamente. El monto a pagar es de $${montoTotal.toFixed(2)}`,
            confirmButtonText: 'Ok'
        });

        document.getElementById('solicitudForm').reset();
    }
});



//PRESTAMOS FIJOS
class Prestamo {
    constructor(nombre, cantidad, totalCuotas, montoPorCuota, totalAPagar) {
        this.nombre = nombre,
            this.cantidad = cantidad,
            this.cuotasAPagar = {
                totalCuotas: totalCuotas,
                montoPorCuota: montoPorCuota
            }
        this.totalAPagar = totalAPagar
    }
}

const PRESTAMO1 = new Prestamo(
    "Prestamo 1",
    6000,
    6,
    1200,
    7800
)
console.log(PRESTAMO1)

const PRESTAMO2 = new Prestamo(
    "Prestamo 2",
    8000,
    12,
    1000,
    12000
)
console.log(PRESTAMO2)

const PRESTAMO3 = new Prestamo(
    "Prestamo 3",
    12000,
    12,
    1500,
    18000
)
console.log(PRESTAMO3)

//SECCION DE DISTINTOS TIPOS DE TARJETAS Y BENEFICIOS

async function miJson() {
    const miJson = "../datos.json";
    try {
        const responseJson = await fetch(miJson);
        const dataJson = await responseJson.json();
        return dataJson;
    } catch (error) {
        console.log('hay un error');
        return [];
    }
}

async function inicializar() {
    const data = await miJson();
    if (data.length > 0) {
        localStorage.setItem('TARJETAS', JSON.stringify(data));
        const objetoJson = JSON.parse(localStorage.getItem('TARJETAS'));
        console.log(objetoJson);
        mostrarTarjetas(objetoJson);
    } else {
        console.log('hay un error');
    }
}

function mostrarTarjetas(tarjetas) {
    const TARJETAS_SECTION = document.getElementById('prod-tarjetas');
    TARJETAS_SECTION.innerHTML = '';
    tarjetas.forEach(producto => {
        const TARJETA_DIV = document.createElement('div');
        TARJETA_DIV.className = 'card-container';
        TARJETA_DIV.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>${producto.tipo}</p>
            <img src="${producto.imagen}">
            <button onclick="solicitarTarjeta(${producto.id})">Solicitar</button>
        `;
        TARJETAS_SECTION.appendChild(TARJETA_DIV);
    });
}

// Función para solicitar tarjeta
function solicitarTarjeta(id) {
    let SOLICITAR = JSON.parse(localStorage.getItem('solicitar')) || [];
    let tarjeta = JSON.parse(localStorage.getItem('TARJETAS')).find(prod => prod.id === id);
    let TARJETA_SOLICITADA = SOLICITAR.find(prod => prod.id === id);

    if (TARJETA_SOLICITADA) {
        TARJETA_SOLICITADA.cantidad += 1;
    } else {
        SOLICITAR.push({ ...tarjeta, cantidad: 1 });
    }

    localStorage.setItem('solicitar', JSON.stringify(SOLICITAR));
    mostrarSolicitados();
}

// Función para mostrar tarjetas
function mostrarSolicitados() {
    let SOLICITAR = JSON.parse(localStorage.getItem('solicitar')) || [];
    const SOLICITADOS_LISTA = document.getElementById('solicitados');
    SOLICITADOS_LISTA.innerHTML = '';
    let total = 0;

    SOLICITAR.forEach((producto, index) => {
        let li = document.createElement('li');
        li.textContent = `${producto.nombre} - ${producto.tipo}`;
        li.innerHTML += `<button onclick="eliminarSeleccion(${index})">Eliminar selección</button>`;
        SOLICITADOS_LISTA.appendChild(li);
        total += producto.cantidad;
    });

    document.getElementById('total').textContent = `Total: ${total}`;
}

// Función para eliminar selección
function eliminarSeleccion(index) {
    let SOLICITAR = JSON.parse(localStorage.getItem('solicitar')) || [];
    SOLICITAR.splice(index, 1);
    localStorage.setItem('solicitar', JSON.stringify(SOLICITAR));
    mostrarSolicitados();
}

// Función para inicializar la carga y mostrar tarjetas
async function inicializar() {
    try {
        const response = await fetch('datos.json');
        const data = await response.json();
        localStorage.setItem('TARJETAS', JSON.stringify(data));
        mostrarTarjetas(data);
        mostrarSolicitados();
    } catch (error) {
        console.error('Error al cargar el JSON:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    inicializar();
});
