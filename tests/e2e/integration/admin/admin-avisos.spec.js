/// <reference types="cypress" />

context('Administrador', () => {
  beforeEach(() => {
    cy.login();
  })

  // https://on.cypress.io/interacting-with-elements

  it('Administrador -> Avisos', () => {

    //Acessa o menu Administrador -> Avisos
    cy.get('[fxflex="1 0 auto"] > .mat-focus-indicator > .mat-button-wrapper > .mat-icon').click();
    cy.get('.nav-link:contains("Administrador")').scrollIntoView();
    cy.get('.nav-link:contains("Administrador")').click();
    cy.get('.mat-ripple:contains("Avisos")').click();

    //Clica no botão de adicionar
    cy.get('.back > .mat-focus-indicator > .mat-button-wrapper > .mat-icon:contains("add")').click();
    cy.wait(3000);

    // Preenche o form
    cy.get('.mat-input-element[name="nome"]').type("teste");
    cy.get('.mat-input-element[name="descricao"]').type("teste");
    cy.get('#mat-select-value-7').click();
    cy.get('.mat-option-text:contains("Unidade")').click();
    cy.get('.mat-input-element[data-placeHolder="Unidade"]').type("ADV");
    cy.get('.mat-option-text:contains("ADVOCACIA")').click();
    cy.get('.mat-button-wrapper:contains("SALVAR")').click();

    // Localiza e clica em remover da linha recém adicionada
    cy.get('.mat-row > .cdk-column-nome:contains("TESTE")').first().parent().find('.mat-icon-no-color:contains("delete")').click();
    cy.get('.mat-row > .cdk-column-nome:contains("TESTE")').first().should('have.class','deleted');
  })
})
