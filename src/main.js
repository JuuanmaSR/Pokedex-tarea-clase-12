console.log(`hola mundo!`);
let urlBase = `https://pokeapi.co/api/v2/pokemon`

function crearListaPokemones() {
    let listaPokemones = document.querySelector(`.list-pokemon__ul`);

    fetch(urlBase)
        .then(respuesta => respuesta.json())
        .then(respuestaJSON => {


            Object.keys(respuestaJSON.results).forEach(key => {
                let newLi = document.createElement(`li`);
                newLi.textContent = respuestaJSON.results[key].name;
                newLi.id = respuestaJSON.results[key].name;
                newLi.className = `pokemon`;
                listaPokemones.appendChild(newLi);
            });

            ocultarBotonAnterior(respuestaJSON.previous);
        });



};
crearListaPokemones();

//**BOTON SIGUIENTE**/
function crearSiguienteListaPokemon() {
    let $siguiente = document.querySelector(`#boton-siguiente-list`);

    $siguiente.onclick = function () {
        fetch(urlBase)
            .then(respuesta => respuesta.json())
            .then(respuestaJSON => {
                urlBase = (respuestaJSON.next);
                borrarLista();
                crearListaPokemones();
                mostrarBotonAnterior();

            });
    }
};
crearSiguienteListaPokemon();

//**BOTON ANTERIOR**/
function volverAnteriorListaPokemon() {
    let $anterior = document.querySelector(`#boton-anterior-list`);

    $anterior.onclick = function () {
        fetch(urlBase)
            .then(respuesta => respuesta.json())
            .then(respuestaJSON => {
                urlBase = respuestaJSON.previous
                borrarLista()
                crearListaPokemones();

            });
    }
};
volverAnteriorListaPokemon();

/**Borrar Listas**/
function borrarLista() {
    let liElements = document.querySelectorAll(`.list-pokemon__ul li`);

    liElements.forEach(li => {
        li.remove();
    });

};
//**Mostrar y ocultar boton anterior **/
function mostrarBotonAnterior() {
    let $anterior = document.querySelector(`#boton-anterior-list`);
    $anterior.className = `button`;
};

function ocultarBotonAnterior(previous) {
    let $anterior = document.querySelector(`#boton-anterior-list`);
    if (previous === null) {
        $anterior.className = `button oculto`;
    };
};