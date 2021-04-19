/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */
import { crearListaPokemones, manejarClicks } from './ux.js';

export function mostrarListaPokemones() {
  crearListaPokemones();
}

export function ocultarBotonAnterior() {
  const $anterior = document.querySelector('#boton-anterior-list');
  $anterior.className = 'button oculto';
}

export function mostrarBotonAnterior() {
  const $anterior = document.querySelector('#boton-anterior-list');
  if ($anterior.className === 'button oculto') {
    $anterior.className = 'button';
  }
}

export function borrarLista() {
  const liElements = document.querySelectorAll('.list-pokemon__ul li');

  liElements.forEach((li) => {
    li.remove();
  });
}

export function mostrarResultadoPokemon() {
  const resultadoPokemon = document.querySelector('#resultado-pokemon');
  resultadoPokemon.className = 'container-pokemon';
}

export function mostrarResultado() {
  manejarClicks();
}
