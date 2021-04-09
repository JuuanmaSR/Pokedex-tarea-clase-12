import { mostrarListaPokemones } from "./ui.js";

export let urlBase = 'https://pokeapi.co/api/v2/pokemon';
function manejarLista(){
  mostrarListaPokemones();
  crearSiguienteListaPokemon();
  volverAnteriorListaPokemon();
}
manejarLista();

function mostrarBotonAnterior() {
  const $anterior = document.querySelector('#boton-anterior-list');
  $anterior.className = 'button';
}

/** Borrar Listas* */
function borrarLista() {
  const liElements = document.querySelectorAll('.list-pokemon__ul li');

  liElements.forEach((li) => {
    li.remove();
  });
}

//* *BOTON ANTERIOR**/
function volverAnteriorListaPokemon() {
  const $anterior = document.querySelector('#boton-anterior-list');

  $anterior.onclick =() => {
    fetch(urlBase)
      .then((respuesta) => respuesta.json())
      .then((respuestaJSON) => {
        urlBase = respuestaJSON.previous;
        borrarLista();
        mostrarListaPokemones();
      });
  };
}


//* BOTON-SIGUIENTE*//
function crearSiguienteListaPokemon() {
  const $siguiente = document.querySelector('#boton-siguiente-list');

  $siguiente.onclick = () => {
    fetch(urlBase)
      .then((respuesta) => respuesta.json())
      .then((respuestaJSON) => {
        urlBase = (respuestaJSON.next);
        borrarLista();
        mostrarListaPokemones();
        mostrarBotonAnterior();
      });
  };
}


//* *Obtener caracteristicas de pokemon seleccionado y mostrarlas**/
function aplicarDatosPokemonSeleccionado(name, id, imgFront, imgBack, height, weight) {
  const elementNombre = document.querySelector('.mostrar-pokemon__header-p-name');
  const elementId = document.querySelector('.mostrar-pokemon__header-p-id');
  const elementImgFront = document.querySelector('.mostrar-pokemon-img__front');
  const elementImgBack = document.querySelector('.mostrar-pokemon-img__back');
  const elementHeight = document.querySelector('.mostrar-pokemon-datos__altura-p');
  const elementWeight = document.querySelector('.mostrar-pokemon-datos__peso-p');

  elementNombre.textContent = name;
  elementId.textContent = `Nº${id}`;
  elementImgFront.src = imgFront;
  elementImgBack.src = imgBack;
  elementHeight.textContent = `${height}`;
  elementWeight.textContent = `${weight}`;
}

function obtenerDatosPokemonSeleccionado(namePokemon) {
  const nombrePokemon = namePokemon;
  let idPokemon;
  let urlPictureFrontPokemon;
  let urlPictureBackPokemon;
  let heightPokemon = '';
  let weightPokemon = '';
  fetch(`https://pokeapi.co/api/v2/pokemon/${namePokemon}`)
    .then((respuesta) => respuesta.json())
    .then((respuestaJSON) => {
      idPokemon = respuestaJSON.id;
      urlPictureFrontPokemon = respuestaJSON.sprites.front_default;
      urlPictureBackPokemon = respuestaJSON.sprites.back_default;
      heightPokemon = respuestaJSON.height;
      weightPokemon = respuestaJSON.weight;
      aplicarDatosPokemonSeleccionado(nombrePokemon, idPokemon,
        urlPictureFrontPokemon, urlPictureBackPokemon, heightPokemon, weightPokemon);
    });
}

function mostrarResultadoPokemon() {
  const resultadoPokemon = document.querySelector('#resultado-pokemon');
  resultadoPokemon.className = 'container-pokemon';
}

//** Manejar clicks en la lista **//
function manejarEventos() {
  const $lista = document.querySelector('.list-pokemon__ul');
  let namePokemon;

  $lista.onclick = (e) => {
    const $elemento = e.target;

    if ($elemento.classList.contains('pokemon')) {
      namePokemon = $elemento.id;
      obtenerDatosPokemonSeleccionado(namePokemon);
      mostrarResultadoPokemon();
    }
  };
}
manejarEventos();
