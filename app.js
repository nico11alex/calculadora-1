const input = document.getElementById('resultado')
const operadores = document.querySelectorAll('.operador')
const numeros = document.querySelectorAll('.numero')

input.value = "0";
let temporizador = null;

function limpiarPantalla() {
    input.value = "0";
}

function quitarValor() {
    if (input.value.length === 1) {
        return input.value = "0"
    } else {
        return input.value = input.value.slice(0, -1);
    }
}

function ingresarOperadores(operadores) {
    if (input.value[0] === "0" && input.value.length === 1) {
        if ("+-×/%=".includes(operadores.textContent)) {
            alert("El formato usado no es válido!")
            return;
        } else {
            input.value += operadores.textContent
            return;
        }
    }

    if (operadores.textContent === ".") {
        ingresarPunto();
        return;
    }
    
    if (operadores.textContent === "=") {
        manejoDeErrores()
    } else {
        input.value += operadores.textContent
    }

}

function ingresarPunto() {
    const ultimoSimbolo = input.value.at(-1);
    if ("+-×/%".includes(ultimoSimbolo)) {
        return;
    }
    const partes = input.value.split(/[\+\-\×\/]/);
    const numeroActual = partes[partes.length - 1];
    if (numeroActual.includes(".")) {
        return;
    }
    input.value += ".";
}


function ingresarUnNumero(numeros) {
    if (input.value[0] === "0" && input.value.length === 1) {
        input.value = input.value.replace("0", numeros.textContent);
    } else {
        input.value += numeros.textContent
    }
}

function manejoDeErrores() {
    try {
        input.value = eval(input.value.replaceAll("%", "/100")
            .replace("×", "*"));

        if (input.value==Infinity){
            throw new Error("División por cero");
        }

        clearTimeout(temporizador);

        temporizador = setTimeout(() => {
            input.value = "0"; 
        }, 2000);

    } catch (err) {
        input.value = "Error";
        temporizador = setTimeout(() => {
            input.value = "0"; 
        }, 2000);
    }
    return;
}

numeros.forEach(numeros => {
    numeros.addEventListener('click', () => {
        clearTimeout(temporizador);
        ingresarUnNumero(numeros)
    })
})

operadores.forEach(operadores => {
    operadores.addEventListener('click', () => {
        if (operadores.textContent === "C") {
            limpiarPantalla()
        } else if (operadores.textContent === "←") {
            quitarValor()
            clearTimeout(temporizador);
        } else {
            clearTimeout(temporizador);
            ingresarOperadores(operadores)
        }
    })
})

