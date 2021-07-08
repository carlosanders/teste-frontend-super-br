/// <reference types="cypress" />

context('Login', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.location('pathname').should('include', 'auth/login');
  })

  it('Login e senha', () => {
    var login = cy.get('#mat-input-1');
    login.clear();
    login.type('10000000004').should('have.value','10000000004');
    var senha = cy.get('#mat-input-2');

    senha.clear();
    senha.type('Agu123456');

    cy.get('.mat-button-wrapper:contains("Login")').click();
    cy.get('.mat-button-wrapper > div > .username').debug().should('have.text','PEDRO');
  })
})
