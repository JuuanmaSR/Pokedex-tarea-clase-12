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
let listaStoragePokemones: [] = [];

async function informacionApi(url: string) {
  const respuesta = await fetch(url);
  const respuestaJSON = await respuesta.json();
  if (respuesta.status !== 200) throw new Error('La URL no funciona correctamente');

  return respuestaJSON;
}

async function informacionApiPokemon(namePokemon: string) {
  const urlBaseLocal = `https://pokeapi.co/api/v2/pokemon/${namePokemon}`;
  const respuesta = await fetch(urlBaseLocal);
  const respuestaJSON = await respuesta.json();
  if (respuesta.status !== 200) throw new Error('La URL con el pokemon seleccionado no funciona correctamente');

  return respuestaJSON;
}

export async function crearListaPokemones() {
  const listaPokemones = document.querySelector('.list-pokemon__ul') as HTMLUListElement;

  if (analizarLocalStorage(indiceLista)) {
    const keyLista = JSON.parse(localStorage.getItem(`listaPokemones__${indiceLista}`) as string);
    crearListaPokemonesStorage(keyLista, listaPokemones);
  } else {
    try {
      const respuestaJSON = await informacionApi(urlBase);
      const $ListaPokemones = mapearListadoPokemones(respuestaJSON);
      if ($ListaPokemones.urlAnterior === null) {
        ocultarBotonAnterior();
      }

      Object.keys($ListaPokemones.nombresPokemones).forEach((key: any) => {
        const nombrePokemon: string = $ListaPokemones.nombresPokemones[key];
        // localStorage //
        listaStoragePokemones.push(nombrePokemon as never);
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
  const $siguiente = document.querySelector('#boton-siguiente-list') as HTMLButtonElement;

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
  const $anterior = document.querySelector('#boton-anterior-list') as HTMLButtonElement;

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

function aplicarDatosPokemonSeleccionado(datosPokemon: { nombre: string, id: number, fotoFront: string, fotoBack: string, altura: number, peso: number }) {
  const elementNombre = document.querySelector('.mostrar-pokemon__header-p-name') as HTMLParagraphElement;
  const elementId = document.querySelector('.mostrar-pokemon__header-p-id') as HTMLParagraphElement;
  const elementImgFront = document.querySelector('.mostrar-pokemon-img__front') as HTMLImageElement;
  const elementImgBack = document.querySelector('.mostrar-pokemon-img__back') as HTMLImageElement;
  const elementHeight = document.querySelector('.mostrar-pokemon-datos__altura-p') as HTMLParagraphElement;
  const elementWeight = document.querySelector('.mostrar-pokemon-datos__peso-p') as HTMLParagraphElement;

  elementNombre.textContent = datosPokemon.nombre;
  elementId.textContent = `Nº${datosPokemon.id}`;
  elementImgFront.src = datosPokemon.fotoFront;
  elementImgBack.src = datosPokemon.fotoBack;
  elementHeight.textContent = `${datosPokemon.altura}`;
  elementWeight.textContent = `${datosPokemon.peso}`;
}

async function obtenerDatosPokemonSeleccionado(namePokemon: string) {
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
  const $lista = document.querySelector('.list-pokemon__ul') as HTMLUListElement;
  let namePokemon;

  $lista.onclick = (e) => {
    const $elemento = e.target as HTMLLIElement;
    if ($elemento.classList.contains('pokemon')) {
      namePokemon = $elemento.id;
      obtenerDatosPokemonSeleccionado(namePokemon);
      mostrarResultadoPokemon();
    }


  };
}
