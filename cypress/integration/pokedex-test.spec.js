describe('Testando pokédex tarea-clase-12',()=> {
    before(()=>{
        cy.visit('http://192.168.1.2:8080');
    });

    it('Testeando existencia de una lista', () => {
        cy.get(`.list-pokemon__ul`).should(`be.visible`);
        cy.get(`.list-pokemon__ul li`).should(`have.length`, `20`);
    });

    it('Testeando comportamiento adecuado de los botones', () => {
        cy.get(`#boton-anterior-list`).should(`not.visible`);
        cy.get(`#boton-siguiente-list`).click();
        cy.get(`#boton-anterior-list`).should(`be.visible`);
        cy.get(`#boton-anterior-list`).click();
        cy.get(`#boton-anterior-list`).should(`not.visible`);
    });
    it('Testando visibilidad de los resultados antes de seleccionar elemento de la lista', () => {
        cy.get(`.mostrar-pokemon`).should(`not.visible`);
    });
    it('Seleccionando pokemon y mostrando sus datos', () => {
        cy.get(`.list-pokemon__ul li`).eq(0).click(); 
        cy.get(`.mostrar-pokemon`).should(`be.visible`);
    });
});
