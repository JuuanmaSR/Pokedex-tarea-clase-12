/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */
import { ocultarBotonAnterior } from './ui.js';

export function guardarListaPokemones(pokemones, indice) {
  const listaStoragePokemones = pokemones;
  localStorage.setItem(`listaPokemones__${indice}`, JSON.stringify(listaStoragePokemones));
}

