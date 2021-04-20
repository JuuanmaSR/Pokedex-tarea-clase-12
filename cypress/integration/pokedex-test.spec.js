/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
/// <reference types="Cypress" />

describe('Testando pokédex tarea-clase-12', () => {
  /// esto emula un fetch de tipo XMLhttpRequest en vez del original que usa JS///

  before(() => {
    cy.visit('http://192.168.1.5:8080', {
    });
  });

  it('Testeando existencia de una lista', () => {
    cy.get('.list-pokemon__ul').should('be.visible');
    cy.get('.list-pokemon__ul li').should('have.length', '20');
  });

  it('Testeando comportamiento adecuado de los botones', () => {
    cy.get('#boton-anterior-list').should('not.visible');
    cy.get('#boton-siguiente-list').click();
    cy.get('#boton-anterior-list').should('be.visible');
    cy.get('#boton-anterior-list').click();
    cy.get('#boton-anterior-list').should('not.visible');
  });
  it('Testando visibilidad de los resultados antes de seleccionar elemento de la lista', () => {
    cy.get('.mostrar-pokemon').should('not.visible');
  });
  it('Seleccionando pokemon y mostrando sus datos', () => {
    cy.intercept('https://pokeapi.co/api/v2/pokemon/charizard', { fixture: 'charizard.json' });
    cy.get('.list-pokemon__ul a li').eq(5).click();
    cy.get('.mostrar-pokemon').should('be.visible');
  });
});
