import {urlBase} from "./main.js";

function ocultarBotonAnterior() {
  const $anterior = document.querySelector('#boton-anterior-list');
  $anterior.className = 'button oculto';

}
export function crearListaPokemones() {
  const listaPokemones = document.querySelector('.list-pokemon__ul');

  fetch(urlBase)
    .then((respuesta) => respuesta.json())
    .then((respuestaJSON) => {
      Object.keys(respuestaJSON.results).forEach((key) => {
        const newAelement = document.createElement('a');
        newAelement.className = 'list-pokemon__a';
        newAelement.href = '#resultado-pokemon';

        const newLi = document.createElement('li');
        newLi.textContent = respuestaJSON.results[key].name;
        newLi.id = respuestaJSON.results[key].name;
        newLi.className = 'pokemon';
        newAelement.appendChild(newLi);
        listaPokemones.appendChild(newAelement);
      });

      if (respuestaJSON.previous === null) {
        ocultarBotonAnterior()
      }
      
    });
}