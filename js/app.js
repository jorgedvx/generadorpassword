//Elementos que necesitamos para manipular el DOM

passwordGenerado = document.getElementById("password-generada");
copiarPassword = document.getElementById("copiar-password");
longitudPassword = document.getElementById("longitud-password");
incrementoRango = document.getElementById("incrementar-rango");
disminucionRango = document.getElementById("disminuir-rango");
inputLongitud = document.getElementById("longitud");
inputMayusculas = document.getElementById("mayusculas");
inputMinusculas = document.getElementById("minusculas");
inputNumeros = document.getElementById("numeros");
inputSimbolos = document.getElementById("simbolos");
botonGenerar = document.getElementById("boton-generar");

//Console.log verificar

// console.log(passwordGenerado)
// console.log(copiarPassword)
// console.log(longitudPassword)
// console.log(incrementoRango)
// console.log(disminucionRango)
// console.log(inputLongitud)
// console.log(inputMayusculas)
// console.log(inputMinusculas)
// console.log(inputNumeros)
// console.log(inputSimbolos)
// console.log(botonGenerar)

//Variables que vamos a usar para conformar la contraseña

mayusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
minusculas = "abcdefghijklmnopqrstuvwxyz";
numeros = "0123456789";
simbolos = "!@#$%&*()_+-";

// console.log(mayusculas+minusculas+numeros+simbolos)


// Logica para que el boton "+" y el boton "-" aumente y disminuya en el rango de la contraseña y que se muestre en el lugar.

incrementoRango.addEventListener('click', function incrementarUno(){
    inputLongitud.value = parseInt(inputLongitud.value) + 1;
    longitudPassword.textContent = inputLongitud.value;
  

    // console.log(longitudPassword.textContent)

    colorsNivel();


})

disminucionRango.addEventListener('click', function disminuirUno(){
    inputLongitud.value = parseInt(inputLongitud.value) - 1;
    longitudPassword.textContent = inputLongitud.value;

    colorsNivel();
    
})

function colorsNivel(){

    niveles = document.querySelector("#password-generada");

    if(longitudPassword.textContent < 7 && longitudPassword.textContent >= 0){
        niveles.style.borderBottom = "5px solid #f87171";
    }if(longitudPassword.textContent > 6){
        niveles.style.borderBottom = "5px solid #fb923c";
    }if(longitudPassword.textContent > 13){
        niveles.style.borderBottom = "5px solid #4ade80";
    }

}

//Sincronizando valores de inicio
inputLongitud.value = longitudPassword.textContent;

//Mostrarmos el valor en el lugar correspondiente segun el valor de la barra
function mostrarCantidad(valor){
    longitudPassword.textContent = valor;

    colorsNivel();

}

// console.log(longitudPassword.textContent)

// Numero aleatorio para obtener un caracter de cada string
function numeroAleatorio(maximo){
    return Math.floor(Math.random() * maximo)
}

//Funciones para obtener un caracter de cada string
function obtenerMayusculas(){
    return mayusculas[numeroAleatorio(mayusculas.length)];
}

function obtenerMinusculas(){
    return minusculas[numeroAleatorio(minusculas.length)];
}

function obtenerNumeros(){
    return numeros[numeroAleatorio(numeros.length)];
}

function obtenerSimbolos(){
    return simbolos[numeroAleatorio(simbolos.length)];
}

//Logica para que el boton "Genera contraseña" y cree una contraseña alatoria utilizando las caracteristicas selecionadas

let contraseñaNueva = '';

botonGenerar.addEventListener('click', function generarContraseña(e){
    // console.log(obtenerMayusculas());
    // console.log(obtenerMinusculas());
    // console.log(obtenerNumeros());
    // console.log(obtenerSimbolos());

    contraseñaNueva = '';

    if(inputMayusculas.checked){
        contraseñaNueva += obtenerMayusculas();
    }if(inputMinusculas.checked){
        contraseñaNueva += obtenerMinusculas();
    }if(inputNumeros.checked){
        contraseñaNueva += obtenerNumeros();
    }if(inputSimbolos.checked){
        contraseñaNueva += obtenerSimbolos();
    }

    if(inputMayusculas.checked || inputMinusculas.checked || inputNumeros.checked || inputSimbolos.checked){
        rellenarContraseña();
    }


    passwordGenerado.textContent = contraseñaNueva;
    // console.log(passwordGenerado.textContent)

    if(checkboxDestildados()){
        mostrarError();
    }

    
});

function rellenarContraseña(){
    while(contraseñaNueva.length < parseInt(longitudPassword.textContent)){
        const aleatorio = caracterAleatorio();

        if(inputMayusculas.checked && aleatorio === 0){
            contraseñaNueva += obtenerMayusculas();
        }if(inputMinusculas.checked && aleatorio === 1){
            contraseñaNueva += obtenerMinusculas();
        }if(inputNumeros.checked && aleatorio === 2){
            contraseñaNueva += obtenerNumeros();
        }if(inputSimbolos.checked && aleatorio === 3){
            contraseñaNueva += obtenerSimbolos();
        }

    }

    
    if(contraseñaNueva.length > parseInt(longitudPassword.textContent)){
        
        // contraseñaNueva = contraseñaNueva.slice(0 , -1);
       let restado = contraseñaNueva.length - longitudPassword.textContent;
       for(i=0; i < parseInt(restado); i++){
           contraseñaNueva = contraseñaNueva.slice(0, -1);

        }      
    }



   
    // return console.log(contraseñaNueva), console.log(contraseñaNueva)
}



function caracterAleatorio(){
    return Math.floor(Math.random() * 4)

}

//Recorremos los input checkbox para saber si estan destildados

function checkboxDestildados(){
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');

    cantidadTildados = 0;
    
    for(let i =0; i < checkboxes.length; i++){
        if(checkboxes[i].checked){
            return false;
            
        }
    }

    return true;

    
    
}

//Logica para mostrar un error si no se tilda ningun caracter

function mostrarError(){
    const divError = document.querySelector("#error");
    const parrafoError = document.createElement('p');
    parrafoError.innerText = "Por favor seleciones alguna opcion";
    divError.appendChild(parrafoError);
    parrafoError.classList.add("error");

    setTimeout(()=>{
        parrafoError.remove();
    }, 3000)
}

// Logica para el boton copiar contraseña

copiarPassword.addEventListener('click', ()=>{
    const textarea = document.createElement("textarea");
    textarea.value = contraseñaNueva;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    // document.getElementById('alerta-copiado').classList.add('active');
    document.querySelector("#copiar").style.display = "grid";


    // setTimeout(function(){
    //     document.getElementById('alerta-copiado').classList.remove('active');
    // }, 3000);

    setTimeout(function(){
        document.querySelector("#copiar").style.display = "none";

    }, 2000);

    textarea.remove();
});



// const copy =  document.querySelector("#copiar").style.display = "none";

// copy.style.display = "grid";

// console.log(copy)



// console.log(numeroAleatorio(26))
// console.log(mayusculas[1-1])

