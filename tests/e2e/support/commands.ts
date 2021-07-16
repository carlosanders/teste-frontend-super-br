// ***********************************************
// This example namespace declaration will help
// with Intellisense and code completion in your
// IDE or Text Editor.
// ***********************************************
// declare namespace Cypress {
//   interface Chainable<Subject = any> {
//     customCommand(param: any): typeof customCommand;
//   }
// }
//
// function customCommand(param: any): void {
//   console.warn(param);
// }
//
// NOTE: You can use it like so:
// Cypress.Commands.add('customCommand', customCommand);
//
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('iframe', (iframeSelector, elSelector) => {
    return cy
      .get(`iframe${iframeSelector || ''}`, { timeout: 10000 })
      .should($iframe => {
        expect($iframe.contents().find(elSelector||'body')).to.exist
      })
      .then($iframe => {
        return cy.wrap($iframe.contents().find('body'))
      })
  })

Cypress.Commands.add('login', (cpf, senha) => {
    cy.visit('/');
    cy.location('pathname').should('include', 'auth/login');

  // https://on.cypress.io/interacting-with-elements

    var login = cy.get('#mat-input-1');
    login.clear();
    login.type(cpf !== undefined ? cpf : '10000000004');

    var senha = cy.get('#mat-input-2');

    senha.clear();
    senha.type('Agu123456');

    cy.get('.mat-button-wrapper:contains("Login")').click();
});
