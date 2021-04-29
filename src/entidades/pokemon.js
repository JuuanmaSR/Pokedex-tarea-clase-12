/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
export default class Pokemon {
  constructor(id, nombre, fotoFront, fotoBack, altura, peso) {
    this.id = id;
    this.nombre = nombre;
    this.fotoFront = fotoFront;
    this.fotoBack = fotoBack;
    this.altura = altura;
    this.peso = peso;
  }

  saludar() {
    console.log(`Hola mi nombre es ${this.nombre}`);
  }
}
