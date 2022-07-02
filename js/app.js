// ----------------Variables----------------
const form = document.querySelector("#formulario");
const tweetList = document.querySelector("#lista-tweets");
let tweets = [];






// ----------------Eventos----------------
eventListeners();
function eventListeners(){
    // El documento está listo.
    document.addEventListener("DOMContentLoaded", () => {
        // Obtener tweets almacenados.
        tweets = JSON.parse(localStorage.getItem("tweets")) || [];

        // Mostrar tweets.
        generateTweetHTML();
    });

    // El usuario agrega un nuevo tweet.
    form.addEventListener("submit", addTweet);
}





// ----------------Funciones----------------
// Agregar tweets
function addTweet(e){
    // Prevenir acciones predefinidas.
    e.preventDefault();

    // Textarea donde el usuario escribe su tweet.
    const tweet = document.querySelector("#tweet").value;

    // Validación.
    if(tweet === ""){
        showError("El tweet no puede ir vacío");

        return;
    }

    // Objeto del tweet.
    const tweetObj = {
        ID: Date.now(),
        tweet
    }

    // Añadir tweet al HTML.
    tweets = [...tweets, tweetObj];

    // Crear HTML.
    generateTweetHTML();

    // Reiniciar el formulario.
    form.reset();
}

// Mostrar listado de Tweets.
function generateTweetHTML(){
    // Limpiar HTML.
    clearHTML();

    // Si sí contiene tweets.
    if(tweets.length > 0){
        // Iterar por cada tweet.
        tweets.forEach( (tweet) => {
            // Crear botón para eliminar.
            const deleteBtn = document.createElement("a");
            deleteBtn.classList.add("borrar-tweet");
            deleteBtn.textContent = "X";

            // Añadir la función de eliminar.
            deleteBtn.onclick = () => {
                deleteTweet(tweet.ID);
            };

            // Crear li.
            const li = document.createElement("li");
            li.textContent = tweet.tweet;

            // Asignar botón al li.
            li.appendChild(deleteBtn);

            // Agregar al HTML.
            tweetList.appendChild(li);
        });
    }

    // Guardar en el local storage.
    syncStorage();
}

// Mostrar mensaje de error.
function showError(message){
    // Crear elemento HTML.
    const errorMessage = document.createElement("p");
    errorMessage.textContent = message;
    errorMessage.classList.add("error");

    // Insertar elemento en el contenido.
    const content = document.querySelector("#contenido");

    // Validar que sea un solo mensaje de error.
    if(content.querySelector("p.error") !== null){
        return;
    }

    // Añadir elemento.
    content.appendChild(errorMessage);
    
    // Iniciar el timer para quitar el mensaje de error.
    setTimeout( () => {
        errorMessage.remove();
    }, 3000);
}

// Limpiar HTML.
function clearHTML(){
    while(tweetList.firstChild){
        tweetList.removeChild(tweetList.firstChild);
    }
}

// Agregar al local storage.
function syncStorage(){
    localStorage.setItem("tweets", JSON.stringify(tweets));
}

// Eliminar tweet.
function deleteTweet(ID){
    // Tweets que no contengan tal ID.
    tweets = tweets.filter( (tweet) => tweet.ID !== ID);

    // Generar HTML.
    generateTweetHTML();
}