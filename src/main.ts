/* eslint-disable import/extensions */
import { mostrarListaPokemones, mostrarResultado } from './ui.js';
import { manejarBotonera } from './ux.js';

function inicializarPok√©dex() {
  mostrarListaPokemones();
  manejarBotonera();
  mostrarResultado();
}
inicializarPok√©dex();
