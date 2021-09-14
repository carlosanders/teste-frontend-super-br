/// <reference types="cypress" />

context('Administrador', () => {
  beforeEach(() => {
    cy.login();
  })

  // https://on.cypress.io/interacting-with-elements

  //Teste desativado por erro de implementação, deverá ser reativado assim que for corrigido
  it.skip('Administrador -> Classificações -> Pesquisa na Árvore', () => {

    //Acessa o menu Administrador -> Classificações - Árvore
    cy.get('[fxflex="1 0 auto"] > .mat-focus-indicator > .mat-button-wrapper > .mat-icon').click();
    cy.get('.nav-link:contains("Administrador")').scrollIntoView();
    cy.get('.nav-link:contains("Administrador")').click();
    cy.get('.mat-ripple:contains("Classificações")').click();
    cy.get('.mat-tab-link:contains("Árvore")').click();
    cy.get('.mat-input-element[data-placeHolder="Pesquisar"]').type("PLANEJAMENTO");

    //Pesquisa pelo texto interno na subárvore
    cy.get('.mat-input-element[data-placeHolder="Pesquisar"]').type('{enter}');
    cy.wait(2000);
    cy.get('.mat-tree > .mat-tree-node:not(.display-none)').first().should('include.text', 'PLANEJAMENTO');
  })
})
