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

import 'cypress-file-upload';
require('cypress-downloadfile/lib/downloadFileCommand');

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

Cypress.Commands.add('login', (cpf, senha='Agu123456') => {
    cy.visit('/');
    cy.location('pathname').should('include', 'auth/login');

    cy.get('[formControlName="username"]')
    .clear()
    .type(cpf !== undefined ? cpf : '10000000004');

    cy.get('[formControlName="password"]')
    .clear()
    .type(senha);

    cy.get('.mat-button-wrapper:contains("Login")').click();
    cy.url().should('include', '/apps/painel');
    cy.contains('Bem-vindo').should('be.visible');
}
);

Cypress.Commands.add('navegarProtocolo', () => {
    return cy
    .get('.mat-icon:contains("menu")').eq(1).click()
    .get('.nav-link:contains("Protocolo")').scrollIntoView()
    .get('.nav-link:contains("Protocolo")').click()
    .get('.nav-link:contains("Administrativo")').click()

});

Cypress.Commands.add("autocomplete", (elemento, paramentro) => {
    cy.get(elemento)
    .clear()
    .type(paramentro)
    .then(() => {
        cy.contains(".mat-option-text", paramentro)
        .should('be.visible')
        .click()
    })
})

Cypress.Commands.add("gerarNup", (elemento) => {

    var numero = ""
    var soma = 0
    var dv1 = 0
    var dv2 = 0
    var possibilidade = "0123456789"

    for (var i = 0; i < 11; i++)
    numero += possibilidade.charAt(Math.floor(Math.random() * possibilidade.length))

    numero += new Date().getFullYear()

    for (i=1; i<=15; i++)
    soma += parseInt(numero.substring(i-1, i)) * (17 - i);

    dv1 = (soma * 10) % 11;
    if ((dv1 == 10) || (dv1 == 11))  dv1 = 0

    soma = 0
    numero += dv1

    for (i = 1; i <= 16; i++) soma += parseInt(numero.substring(i-1, i)) * (18 - i);
    dv2 = (soma * 10) % 11;

    if ((dv2 == 10) || (dv2 == 11))  dv2 = 0;

    numero += dv2

    cy.get(elemento)
    .clear()
    .type(numero)
});
