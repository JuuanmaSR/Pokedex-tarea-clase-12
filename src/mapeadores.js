/* eslint-disable import/extensions */
import ListaPokemones from './entidades/ListaPokemon.js';
import Pokemon from './entidades/pokemon.js';

/* eslint-disable no-unused-vars */
export default function mapearRespuestaApi(datosApi) {
  const {
    id,
    name: nombre,
    sprites: { front_default: fotoFront },
    sprites: { back_default: fotoBack },
    height: altura,
    weight: peso,
  } = datosApi;

  return new Pokemon(
    id,
    nombre,
    fotoFront,
    fotoBack,
    altura,
    peso,
  );
}

export function mapearListadoPokemones(datosApi) {
  const {
    next: urlSiguiente,
    previous: urlAnterior,
    results: resultados,
  } = datosApi;

  return new ListaPokemones(
    urlSiguiente,
    urlAnterior,
    resultados.map((pokemon) => pokemon.name),
  );
}
