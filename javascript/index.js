
// PIDIENDO DATOS PARA EL PRESTAMO 
(async () => {
    const { value: formValues } = await Swal.fire({
        title: "Multiple inputs",
        html: `
        <input id="swal-input1" class="swal2-input">
        <input id="swal-input2" class="swal2-input">
    `,
        focusConfirm: false,
        preConfirm: () => {
            return [
                document.getElementById("swal-input1").value,
                document.getElementById("swal-input2").value
            ];
        }
    });
    if (formValues) {
        Swal.fire(JSON.stringify(formValues));
    }
})()

// let habilitado = edad >= 18 ? 'Está habilitado a sacar un préstamo' : 'No está habilitado a sacar un préstamo';
// console.log(habilitado)




function calcularMonto(monto) {
    return monto <= 10000
        ? monto + (monto * 0.30) // CALCULO DEL 30%
        : monto <= 20000
            ? monto + (monto * 0.20) // CALCULO DEL 20%
            : monto + (monto * 0.10); // CALCULO DEL 10%
}

function obtenerMontoUsuario() {
    let monto = parseInt(prompt("Ingrese monto a pedir"));
    return monto;
}

function esMontoValido(monto) {
    return !isNaN(monto) && monto > 0;
}

function mostrarMensaje(mensaje) {
    console.log(mensaje);
}

let monto = obtenerMontoUsuario();

esMontoValido(monto)
    ? mostrarMensaje("El monto a pagar es de $" + calcularMonto(monto))
    : mostrarMensaje("Por favor, ingrese un monto válido.");

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
            <button onclick="solicitarTarjeta(${producto.id})">Solicitar</button>
        `;
        TARJETAS_SECTION.appendChild(TARJETA_DIV);
    });
}

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

function eliminarSeleccion(index) {
    let SOLICITAR = JSON.parse(localStorage.getItem('solicitar')) || [];
    SOLICITAR.splice(index, 1);
    localStorage.setItem('solicitar', JSON.stringify(SOLICITAR));
    mostrarSolicitados();
}

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

document.addEventListener('DOMContentLoaded', () => {
    inicializar();
});

