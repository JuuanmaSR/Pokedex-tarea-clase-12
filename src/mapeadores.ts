/* eslint-disable import/extensions */
import ListaPokemones from './entidades/ListaPokemon.js';
import Pokemon from './entidades/pokemon.js';

/* eslint-disable no-unused-vars */
export default function mapearRespuestaApi(datosApi: {
  id: number, name: string, sprites: { front_default: string, back_default: string }, height: number, weight: number
}): Pokemon {
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

export function mapearListadoPokemones(datosApi: { next: string, previous: string, results: [] }): ListaPokemones {
  const {
    next: urlSiguiente,
    previous: urlAnterior,
    results: resultados,
  } = datosApi;

  return new ListaPokemones(
    urlSiguiente,
    urlAnterior,
    resultados.map((pokemon: { name: string }) => pokemon.name),
  );
}
