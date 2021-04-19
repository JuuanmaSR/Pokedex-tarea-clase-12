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
