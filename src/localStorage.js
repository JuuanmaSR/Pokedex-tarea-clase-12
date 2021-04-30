/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */
import { ocultarBotonAnterior } from './ui.js';

export function guardarListaPokemones(pokemones, indice) {
  const listaStoragePokemones = pokemones;
  localStorage.setItem(`listaPokemones__${indice}`, JSON.stringify(listaStoragePokemones));
}

export function analizarLocalStorage(indice) {
  const keyLista = JSON.parse(localStorage.getItem(`listaPokemones__${indice}`));
  if (indice === 0) {
    ocultarBotonAnterior();
  }
  if (keyLista != null) {
    return true;
  }

  return false;
}

export function crearListaPokemonesStorage(pokemones, dondeMostrarPokemones) {
  const listaPokemones = pokemones;
  for (let i = 0; i < listaPokemones.length; i += 1) {
    const nombrePokemon = listaPokemones[i];

    dondeMostrarPokemones(nombrePokemon, dondeMostrarPokemones);
  }
}
