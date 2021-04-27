/* eslint-disable no-console */
/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */
import { guardarListaPokemones, analizarLocalStorage, crearListaPokemonesStorage } from './localStorage.js';
import {
  ocultarBotonAnterior,
  mostrarBotonAnterior,
  borrarLista,
  mostrarResultadoPokemon,
} from './ui.js';

let urlBase = 'https://pokeapi.co/api/v2/pokemon';
let indiceLista = 0;
let listaStoragePokemones = [];

async function informacionApi(url) {
  const respuesta = await fetch(url);
  const respuestaJSON = await respuesta.json();
  if (respuesta.status !== 200) throw new Error('La URL no funciona correctamente');

  return respuestaJSON;
}

async function informacionApiPokemon(namePokemon) {
  const urlBaseLocal = `https://pokeapi.co/api/v2/pokemon/${namePokemon}`;
  const respuesta = await fetch(urlBaseLocal);
  const respuestaJSON = await respuesta.json();
  if (respuesta.status !== 200) throw new Error('La URL con el pokemon seleccionado no funciona correctamente');

  return respuestaJSON;
}

export async function crearListaPokemones() {
  const listaPokemones = document.querySelector('.list-pokemon__ul');

  if (analizarLocalStorage(indiceLista)) {
    const keyLista = JSON.parse(localStorage.getItem(`listaPokemones__${indiceLista}`));
    crearListaPokemonesStorage(keyLista, listaPokemones);
  } else {
    await informacionApi(urlBase)
      .then((respuestaJSON) => {
        Object.keys(respuestaJSON.results).forEach((key) => {
          const nombrePokemon = respuestaJSON.results[key].name;
          // localStorage //
          listaStoragePokemones.push(nombrePokemon);

          const newAelement = document.createElement('a');
          newAelement.className = 'list-pokemon__a';
          newAelement.href = '#resultado-pokemon';

          const newLi = document.createElement('li');
          newLi.textContent = nombrePokemon;
          newLi.id = nombrePokemon;
          newLi.className = 'pokemon';
          newAelement.appendChild(newLi);
          listaPokemones.appendChild(newAelement);

          // localStorage //
          guardarListaPokemones(listaStoragePokemones, indiceLista);
        });

        if (respuestaJSON.previous === null) {
          ocultarBotonAnterior();
        }
      })
      .catch((e) => console.log(`Error: ${e}`));
  }
}

function crearSiguienteListaPokemon() {
  const $siguiente = document.querySelector('#boton-siguiente-list');

  $siguiente.onclick = async () => {
    await informacionApi(urlBase)
      .then((respuestaJSON) => {
        if (respuestaJSON.next != null) {
          urlBase = (respuestaJSON.next);
          borrarLista();
          indiceLista += 1;
          crearListaPokemones();
          mostrarBotonAnterior();
          listaStoragePokemones = [];
        }
      })
      .catch((e) => console.log(`Error: ${e}`));
  };
}

function crearAnteriorListaPokemon() {
  const $anterior = document.querySelector('#boton-anterior-list');

  $anterior.onclick = async () => {
    await informacionApi(urlBase)
      .then((respuestaJSON) => {
        urlBase = respuestaJSON.previous;
        borrarLista();
        indiceLista -= 1;
        crearListaPokemones();
        listaStoragePokemones = [];
      })
      .catch((e) => console.log(`Error: ${e}`));
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
async function obtenerDatosPokemonSeleccionado(namePokemon) {
  const nombrePokemon = namePokemon;
  let idPokemon;
  let urlPictureFrontPokemon;
  let urlPictureBackPokemon;
  let heightPokemon = '';
  let weightPokemon = '';
  await informacionApiPokemon(nombrePokemon)
    .then((respuestaJSON) => {
      idPokemon = respuestaJSON.id;
      urlPictureFrontPokemon = respuestaJSON.sprites.front_default;
      urlPictureBackPokemon = respuestaJSON.sprites.back_default;
      heightPokemon = respuestaJSON.height;
      weightPokemon = respuestaJSON.weight;
      aplicarDatosPokemonSeleccionado(nombrePokemon, idPokemon,
        urlPictureFrontPokemon, urlPictureBackPokemon, heightPokemon, weightPokemon);
    })
    .catch((e) => console.log(`Error: ${e}`));
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
