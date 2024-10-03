/* PIDIENDO DATOS PARA EL PRESTAMO */
let edad = parseInt( prompt("Ingrese su edad"));

let clearing = true;

if (edad >= 18 && clearing === true){
    console.log("Esta habilitado para sacar un prestamo")
}else{
    console.log("Usted no puede sacar un prestamo")
}

let monto = parseInt(prompt("ingrese monto a pedir:"))
let adicional1 = monto + (monto*0.30);
let adicional2 = monto + (monto*0.20);
let adicional3 = monto + (monto*0.10);
if(monto <= 10000){
    console.log("El monto a pagar es de: " + adicional1 )
}else if(monto <= 20000){
    console.log("El monto a pagar es de: " + adicional2)
}else if(monto >= 20001){
    console.log("El monto a pagar es de: " + adicional3)
}


