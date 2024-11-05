/* PIDIENDO DATOS PARA EL PRESTAMO */
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
}


//PRESTAMOS FIJOS
class Prestamo {
    constructor(nombre, cantidad, totalCuotas, montoPorCuota, totalAPagar){
        this.nombre = nombre,
        this.cantidad = cantidad,
        this.cuotasAPagar ={
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
        beneficios: "" // ESPACIO VACIO PARA PENSAR BIEN LA IDEA SOBRE LOS BENEFICIOS A OTORGAR
    },

    {
        id:2,
        nombre: "tarjeta azul",
        tipo: "debito",
        beneficios: "" // ESPACIO VACIO PARA PENSAR BIEN LA IDEA SOBRE LOS BENEFICIOS A OTORGAR
    },

    {
        id:3,
        nombre: "tarjeta roja",
        tipo: "credito",
        beneficios: "" // ESPACIO VACIO PARA PENSAR BIEN LA IDEA SOBRE LOS BENEFICIOS A OTORGAR
    },

    {
        id:4,
        nombre: "tarjeta negra",
        tipo: "credito",
        beneficios: "" // ESPACIO VACIO PARA PENSAR BIEN LA IDEA SOBRE LOS BENEFICIOS A OTORGAR
    }
]

let solicitados = [];

function mostrarTarjetas(){
    const TARJETAS_SECTION = document.getElementById('prod-tarjetas');
    TARJETAS.forEach(producto =>{
        const TARJETA_DIV = document.createElement('div');
        TARJETA_DIV.className = 'card-conteiner'
        TARJETA_DIV.innerHTML =
        `
        <h3>${producto.nombre}</h3>
        <p>${producto.tipo}</p>
        <button onclick="solicitarTarjeta(${producto.id})">Solicitar</button>
        
        `
        TARJETAS_SECTION.appendChild(TARJETA_DIV);
    })
}

mostrarTarjetas()