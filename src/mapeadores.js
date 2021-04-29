/* eslint-disable import/extensions */
import Pokemon from './clases.js';

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
