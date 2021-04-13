import {
  ocultarBotonAnterior,
  mostrarListaPokemones,
  mostrarBotonAnterior,
  borrarLista,
  mostrarResultadoPokemon,
} from './ui.js';

let urlBase = 'https://pokeapi.co/api/v2/pokemon';

export function crearListaPokemones() {
  const listaPokemones = document.querySelector('.list-pokemon__ul');

  fetch(urlBase)
    .then((respuesta) => respuesta.json())
    .then((respuestaJSON) => {
      Object.keys(respuestaJSON.results).forEach((key) => {
        const newAelement = document.createElement('a');
        newAelement.className = 'list-pokemon__a';
        newAelement.href = '#resultado-pokemon';

        const newLi = document.createElement('li');
        newLi.textContent = respuestaJSON.results[key].name;
        newLi.id = respuestaJSON.results[key].name;
        newLi.className = 'pokemon';
        newAelement.appendChild(newLi);
        listaPokemones.appendChild(newAelement);
      });

      if (respuestaJSON.previous === null) {
        ocultarBotonAnterior();
      }
    });
}

function crearSiguienteListaPokemon() {
  const $siguiente = document.querySelector('#boton-siguiente-list');

  $siguiente.onclick = () => {
    fetch(urlBase)
      .then((respuesta) => respuesta.json())
      .then((respuestaJSON) => {
        if (respuestaJSON.next != null) {
          urlBase = (respuestaJSON.next);
          borrarLista();
          crearListaPokemones();
          mostrarBotonAnterior();
        }
      });
  };
}

function crearAnteriorListaPokemon() {
  const $anterior = document.querySelector('#boton-anterior-list');

  $anterior.onclick = () => {
    fetch(urlBase)
      .then((respuesta) => respuesta.json())
      .then((respuestaJSON) => {
        urlBase = respuestaJSON.previous;
        borrarLista();
        mostrarListaPokemones();
      });
  };
}

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
export function manejarBotonera() {
  crearSiguienteListaPokemon();
  crearAnteriorListaPokemon();
}
export function manejarClicks() {
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
