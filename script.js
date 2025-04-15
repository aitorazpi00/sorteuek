
//let muslayek = ['Thor', 'Gorka', 'Ame', 'Zabarte', 'Merino', 'Txiki', 'Umerez', 'Una', 'Bersa', 'Etxe', 'Carrizo'];

const pertsonak = JSON.parse(localStorage.getItem('pertsonak'));

// Función para mezclar el array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        // Intercambiar elementos
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Función para mezclar y mostrar los valores
function shuffleAndDisplay() {
    // Crear una copia del array original para mezclar
    // const shuffledValues = [...muslayek];
    const shuffledValues = [...pertsonak];
    
    // Mezclar el array
    shuffleArray(shuffledValues);
    
    // Obtener la lista de salida
    const outputList = document.getElementById('outputList');
    outputList.innerHTML = ''; // Limpiar la lista anterior
    
    // Mostrar los valores mezclados
    shuffledValues.forEach(value => {
        const listItem = document.createElement('li');
        listItem.textContent = value; // Asignar el valor al elemento de la lista
        outputList.appendChild(listItem); // Agregar el elemento a la lista
        // Crear un botón "X" para eliminar el elemento
        const removeButton = document.createElement('button');
        removeButton.textContent = 'X';
        removeButton.className = 'remove-button'; // Clase para el botón, opcional para estilos

        // Añadir un evento al botón para eliminar el elemento de la lista
        removeButton.addEventListener('click', function() {
            outputList.removeChild(listItem); // Eliminar el elemento de la lista
        });

        // Añadir el botón al elemento de lista
        listItem.appendChild(removeButton);

    });
}

function muslaye_gehitu() {
    // Obtener la lista de salida donde se agregarán los elementos
    let outputList = document.getElementById('outputList');
    
    // Crear un nuevo elemento de lista
    const listItem = document.createElement('li');
    
    // Obtener el valor del input
    const inputValue = document.getElementById('muslai_berriye').value;

    if(inputValue.trim() !== ""){
        // Crear un texto para el elemento de lista
        listItem.textContent = inputValue;

        // Crear un botón "X" para eliminar el elemento
        const removeButton = document.createElement('button');
        removeButton.textContent = 'X';
        removeButton.className = 'remove-button'; // Clase para el botón, opcional para estilos

        // Añadir un evento al botón para eliminar el elemento de la lista
        removeButton.addEventListener('click', function() {
            outputList.removeChild(listItem); // Eliminar el elemento de la lista
        });

        // Añadir el botón al elemento de lista
        listItem.appendChild(removeButton);

        // Agregar el nuevo elemento de lista a la lista
        outputList.appendChild(listItem);

        // Limpiar el campo de entrada después de agregar
        document.getElementById('muslai_berriye').value = '';
    }
    
}

shuffleAndDisplay();

function parejak_in(){
    let outputList = document.getElementById('outputList');

    let parejasArray = [];

    // Obtener todos los elementos de la lista
    const participants = Array.from(outputList.getElementsByTagName('li')).map(li => li.firstChild.textContent);

    // Barajar los participantes
    shuffleArray(participants);

    // Crear parejas
    for (let i = 0; i < participants.length; i += 2) {
        let pareja;
        if (i + 1 < participants.length) {
            pareja = [participants[i], participants[i + 1]];
        } else {
            pareja = [participants[i], 'bakarrik']; // Manejar el caso impar
        }
        parejasArray.push(pareja); // Añadir la pareja al array
    }

    return parejasArray;
    
}

// Función para generar el cuadro de torneo
function generarCuadro(nombresEquipos) {
    const container = document.getElementById('tournamentContainer');
    container.innerHTML = ''; // Limpiar cualquier contenido previo

    const numEquipos = nombresEquipos.length; // Obtener el número de equipos a partir del array

    // Calcular la potencia de 2 más cercana hacia abajo
    let potenciaCercana = Math.pow(2, Math.floor(Math.log2(numEquipos)));
    let equiposExtra = numEquipos - potenciaCercana;
    equiposExtra = equiposExtra * 2;

    // Si hay equipos extra, crear ronda previa
    let ganadoresRondaPrevia = 0;
    let equiposRondaPrevia = [];

    // Si hay más de 1 equipo extra, se enfrentan los últimos dos equipos extra
    if (equiposExtra > 0) {
        equiposRondaPrevia = nombresEquipos.slice(numEquipos - equiposExtra); // Equipos extra
        crearRondaPrevia(container, equiposRondaPrevia); // Crear la ronda previa
        ganadoresRondaPrevia = Math.ceil(equiposRondaPrevia.length / 2); // Ganadores de la ronda previa
    }

    // Total de equipos que jugarán en la Primera Ronda
    let numEquiposPrimeraRonda = potenciaCercana - ganadoresRondaPrevia; // Equipos restantes en potencia de 2

    // Crear primera ronda (enfrentamientos completos)
    crearPrimeraRonda(container, nombresEquipos, ganadoresRondaPrevia, numEquiposPrimeraRonda);
}

// Función para crear la ronda previa
function crearRondaPrevia(container, equipos) {
    const roundDiv = document.createElement('div');
    roundDiv.classList.add('round');
    roundDiv.innerHTML = `<h3>Previa</h3>`;

    // Emparejando equipos en la ronda previa
    for (let i = 0; i < equipos.length; i += 2) {
        const matchup = document.createElement('div');
        matchup.classList.add('matchup');

        const equipo1 = document.createElement('div');
        equipo1.classList.add('team');
        equipo1.textContent = equipos[i]; // Usar el nombre del primer equipo
        matchup.appendChild(equipo1);

        // Verificar si hay un segundo equipo
        if (equipos[i + 1]) {
            const equipo2 = document.createElement('div');
            equipo2.classList.add('team');
            equipo2.textContent = equipos[i + 1]; // Usar el nombre del segundo equipo
            matchup.appendChild(equipo2);
        }

        roundDiv.appendChild(matchup);
    }

    container.appendChild(roundDiv);
}

// Función para crear la primera ronda
function crearPrimeraRonda(container, nombresEquipos, ganadoresRondaPrevia, numEquiposPrimeraRonda) {
    const roundDiv = document.createElement('div');
    roundDiv.classList.add('round');
    roundDiv.innerHTML = `<h3>1 Rondie</h3>`;

    // Mantener un índice para los equipos de la primera ronda
    let indiceEquipo = 0; // Comenzamos desde el primer equipo

    // Colocar a los ganadores de la ronda previa en sus posiciones
    for (let i = 0; i < ganadoresRondaPrevia; i++) {
        const matchup = document.createElement('div');
        matchup.classList.add('matchup');

        // Agregar el ganador de la ronda previa
        const ganadorPrevio = document.createElement('div');
        ganadorPrevio.classList.add('team');
        ganadorPrevio.textContent = `Previa ${i + 1}ko garailie`; // Se deja como texto
        matchup.appendChild(ganadorPrevio);

        // Usar el siguiente equipo que pasa directamente a la primera ronda
        if (indiceEquipo < nombresEquipos.length - ganadoresRondaPrevia) {
            const equipo = document.createElement('div');
            equipo.classList.add('team');
            equipo.textContent = nombresEquipos[indiceEquipo]; // Usar el siguiente equipo
            matchup.appendChild(equipo);
            indiceEquipo++;
        }

        roundDiv.appendChild(matchup);
    }

    // Continuar con los emparejamientos de la primera ronda
    for (let i = 0; i < (numEquiposPrimeraRonda - ganadoresRondaPrevia); i += 2) {
        const matchup = document.createElement('div');
        matchup.classList.add('matchup');

        const equipo1 = document.createElement('div');
        equipo1.classList.add('team');
        equipo1.textContent = nombresEquipos[indiceEquipo]; // Primer equipo de la primera ronda
        matchup.appendChild(equipo1);
        indiceEquipo++;

        // Verificar si hay un segundo equipo
        if (indiceEquipo < nombresEquipos.length - ganadoresRondaPrevia) {
            const equipo2 = document.createElement('div');
            equipo2.classList.add('team');
            equipo2.textContent = nombresEquipos[indiceEquipo]; // Segundo equipo de la primera ronda
            matchup.appendChild(equipo2);
            indiceEquipo++; // Aumentar el índice para el próximo equipo
        }

        roundDiv.appendChild(matchup);
    }

    container.appendChild(roundDiv);
}

// Ejemplo de uso
// const nombresEquipos = [
//     'Equipo A',
//     'Equipo B',
//     'Equipo C',
//     'Equipo D',
//     'Equipo E',
// ];

function parejak_izenak_in(parejasArray){
    let nombresEquipos = [];
    let parejie_bakarrik = "";
    for(var i=0; i < parejasArray.length; i++){
        let parejie = parejasArray[i];
        let pareja_izenak = parejie[0] + " & " + parejie[1];
        if(parejie[1] === 'bakarrik'){
            parejie_bakarrik = pareja_izenak;
        }else{
            nombresEquipos.push(pareja_izenak);
        }
        
    }

    if(parejie_bakarrik !== ""){
        nombresEquipos.unshift(parejie_bakarrik);
    }

    return nombresEquipos;
}





// Llama a la función con la lista de nombres de equipos
function sorteo_in(){
    parejasArray = parejak_in();
    let pareja_izenak = parejak_izenak_in(parejasArray);
    generarCuadro(pareja_izenak);
}

