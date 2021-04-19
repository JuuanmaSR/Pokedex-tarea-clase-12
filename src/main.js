import { mostrarListaPokemones, mostrarResultado } from './ui.js';
import { manejarBotonera } from './ux.js';

function inicializarPokédex() {
  mostrarListaPokemones();
  manejarBotonera();
  mostrarResultado();
}
inicializarPokédex();
