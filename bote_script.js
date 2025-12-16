const params = new URLSearchParams(window.location.search);
const pertsonak = params.get('pertsonak');

let muslayek = ['Thor', 'Gorka', 'Ame', 'Zabarte', 'Merino', 'Txiki', 'Umerez', 'Una', 'Bersa', 'Etxe', 'Carrizo'];
let boteruek_neskakin = muslayek.concat(['Miren E', 'Maider', 'Sara', 'Leire', 'Araitz', 'Ania', 'Miren Z', 'Aiora', 'Mikele', 'Libe', 'Inge', 'Garazi']);

var sorteoko_pertsonak = muslayek
if (pertsonak == "dandelus"){
    sorteoko_pertsonak = boteruek_neskakin
}

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
    const shuffledValues = [...sorteoko_pertsonak];
    
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

function getRandomNames(namesArray, x) {
    if (x > namesArray.length) {
        throw new Error("El número solicitado es mayor que la cantidad de nombres disponibles.");
    }
    var shuffled = namesArray.sort(() => Math.random() - 0.5);
    // var shuffled_array = shuffled.slice(0, x)
    // const check = verifyArray(shuffled_array);
    return shuffled.slice(0, x);
}

function sorteo_boteruek(){
    var nameListElement = document.getElementById("nameList");
    nameListElement.innerHTML = "";
    //Zenbat botero
    const zenbat_botero = document.getElementById("zenbat_botero").value;
    const participants = Array.from(outputList.getElementsByTagName('li')).map(li => li.firstChild.textContent);
    var selectedNames = getRandomNames(participants, zenbat_botero);

    nameListElement = document.getElementById("nameList");

    // Recorrer el array y crear un <li> por cada nombre
    selectedNames.forEach((name, index) => {
        const li = document.createElement("li");
        li.textContent = `${name}`; // Crear texto con el número y el nombre
        nameListElement.appendChild(li); // Añadir el <li> a la lista
    });
}
