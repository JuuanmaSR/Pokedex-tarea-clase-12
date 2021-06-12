/* eslint-disable import/named */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */
import { guardarListaPokemones, analizarLocalStorage, crearListaPokemonesStorage } from './localStorage.js';
import mapearRespuestaApi, { mapearListadoPokemones } from './mapeadores.js';

import {
  ocultarBotonAnterior,
  mostrarBotonAnterior,
  borrarLista,
  mostrarResultadoPokemon,
  mostrarNombresPokemon,
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
    try {
      const respuestaJSON = await informacionApi(urlBase);
      const $ListaPokemones = mapearListadoPokemones(respuestaJSON);
      if ($ListaPokemones.urlAnterior === null) {
        ocultarBotonAnterior();
      }

      Object.keys($ListaPokemones.nombresPokemones).forEach((key) => {
        const nombrePokemon = $ListaPokemones.nombresPokemones[key];
        // localStorage //
        listaStoragePokemones.push(nombrePokemon);
        // UI //
        mostrarNombresPokemon(nombrePokemon, listaPokemones);
        // localStorage //
        guardarListaPokemones(listaStoragePokemones, indiceLista);
      });
    } catch (error) {
      console.log(`Error: ${error}`);
    }
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

function aplicarDatosPokemonSeleccionado(datosPokemon) {
  const elementNombre = document.querySelector('.mostrar-pokemon__header-p-name');
  const elementId = document.querySelector('.mostrar-pokemon__header-p-id');
  const elementImgFront = document.querySelector('.mostrar-pokemon-img__front');
  const elementImgBack = document.querySelector('.mostrar-pokemon-img__back');
  const elementHeight = document.querySelector('.mostrar-pokemon-datos__altura-p');
  const elementWeight = document.querySelector('.mostrar-pokemon-datos__peso-p');

  elementNombre.textContent = datosPokemon.nombre;
  elementId.textContent = `Nº${datosPokemon.id}`;
  elementImgFront.src = datosPokemon.fotoFront;
  elementImgBack.src = datosPokemon.fotoBack;
  elementHeight.textContent = `${datosPokemon.altura}`;
  elementWeight.textContent = `${datosPokemon.peso}`;
}

async function obtenerDatosPokemonSeleccionado(namePokemon) {
  try {
    const respuestaJSON = await informacionApiPokemon(namePokemon);
    const pokemon = mapearRespuestaApi(respuestaJSON);
    aplicarDatosPokemonSeleccionado(pokemon);
  } catch (error) { console.log(`Error: ${error}`); }
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
