
// PIDIENDO DATOS PARA EL PRESTAMO 
let edad = parseInt( prompt("Ingrese su edad"));

let clearing = true;

if (edad >= 18 && clearing === true){
    console.log("Esta habilitado para sacar un prestamo")
}else{
    console.log("Usted no puede sacar un prestamo");
}

//FUNCION PARA CALCULAR INTERESES DEL PRESTAMO PERSONALIZADO
function calcularMonto(monto){
    if (monto <=15000){
        return monto + (monto *0.30);//CALCULO DEL 30%
    } else if (monto <=20000){
        return monto + (monto *0.20);//CALCULO DEL 20%
    } else if (monto >=30001);{
        return monto + (monto *0.10)//CALCULO DEL 10%
    }
} 
let monto = parseInt(prompt("ingrese monto a pedir"));
if (isNaN(monto) || monto <=0){
    console.log("Por favor, ingresar un monto válido");
} else {
    let montoFinal = calcularMonto(monto);
    console.log("el monto a pagar es de $" + montoFinal)
};


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

const TARJETAS = [

    {
        id: 1,
        nombre: "tarjeta verde",
        tipo: "debito",
        beneficios: {
            descuentoSupermercados: "5% de descuento en supermercados seleccionados",
            cine2x1: "2X1 en cines Movie de lunes a jueves",
        }
    },

    {
        id: 2,
        nombre: "tarjeta azul",
        tipo: "debito",
        beneficios: {
            descuentoSupermercados: "5% de descuento en supermercados seleccionados",
            cine2x1: "2X1 en cines Movie de lunes a jueves",
            puntosRegalo: "acumulación de 'puntos regalo' $500 = 1 punto", //"puntos regalo" es un sistema de acumulación de puntos, por cada $500 gastados sumas 1 "punto regalo (PR)". 1 PR = $1
        }
    },

    {
        id: 3,
        nombre: "tarjeta roja",
        tipo: "credito",
        beneficios: {
            descuentoSupermercados: "10% de descuento en supermercados seleccionados",
            cine2x1: "2X1 en cines Movie todos los días",
            puntosRegalo: "acumulación de 'puntos regalo' $300 = 1 punto", //"puntos regalo" es un sistema de acumulación de puntos, por cada $300 gastados sumas 1 "punto regalo (PR)". 1 PR = $1
        }
    },

    {
        id: 4,
        nombre: "tarjeta negra",
        tipo: "credito",
        beneficios: {
            descuentoSupermercados: "10% de descuento en supermercados seleccionados",
            cine2x1: "2X1 en cines Movie todos los días",
            puntosRegalo: "acumulación de 'puntos regalo' $100 = 1 punto", //"puntos regalo" es un sistema de acumulación de puntos, por cada $100 gastados sumas 1 "punto regalo (PR)". 1 PR = $1
            descuentoGasolineras: "10% de descuento en todas las gasolineras del país (máximo acumulable por mes $1000)",
            tasaPreferencial: "tasa preferencial en préstamos por buen pagador",
            sorteosSemanales: "participación en sorteos semanales de compra gratis"
        }
    }
]
let tarjetasJson = JSON.stringify(TARJETAS);
localStorage.setItem('TARJETAS', tarjetasJson);

let objetoJson = JSON.parse(localStorage.getItem("TARJETAS"));
console.log(objetoJson);

function mostrarTarjetas() {
    const TARJETAS_SECTION = document.getElementById('prod-tarjetas');
    TARJETAS_SECTION.innerHTML = '';
    TARJETAS.forEach(producto => {
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

mostrarTarjetas();

function solicitarTarjeta(id) {
    let SOLICITAR = JSON.parse(localStorage.getItem('solicitar')) || [];
    let tarjeta = TARJETAS.find(prod => prod.id === id);
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
    mostrarTarjetas();
    mostrarSolicitados();
});
