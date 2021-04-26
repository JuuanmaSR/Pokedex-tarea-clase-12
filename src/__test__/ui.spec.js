/* eslint-disable no-undef */
/* eslint-disable import/extensions */

import {
  borrarLista, mostrarBotonAnterior, mostrarResultadoPokemon, ocultarBotonAnterior,
} from '../ui.js';

test('comprobar que se oculte un boton', () => {
  document.body.innerHTML = '<button id="boton-anterior-list">Anterior</button>';
  ocultarBotonAnterior();
  expect(document.querySelector('#boton-anterior-list').className).toContain('button oculto');
});

test('comprobar que se muestre un boton', () => {
  document.body.innerHTML = '<button class="button-oculto" id="boton-anterior-list">Anterior</button><button class="button" id="boton-anterior-list-2">Anterior motrado</button>';
  mostrarBotonAnterior();
  expect(document.querySelector('#boton-anterior-list').className).toContain('button');
  expect(document.querySelector('#boton-anterior-list-2').className).toContain('button');
});

test('comprobar que una lista se borre', () => {
  document.body.innerHTML = '<ul class="list-pokemon__ul"><li>hola</li><li>chau</li><li>adios</li></ul>';
  borrarLista();
  expect(document.querySelectorAll('.list-pokemon__ul li').length).toBe(0);
});

test('comprobar que se muestre un resultado', () => {
  document.body.innerHTML = '<div id="resultado-pokemon"></div>';
  mostrarResultadoPokemon();
  expect(document.querySelector('#resultado-pokemon').className).toContain('container-pokemon');
});
