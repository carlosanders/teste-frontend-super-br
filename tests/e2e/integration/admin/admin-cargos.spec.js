context('Administrador', () => {
  beforeEach(() => {
    cy.login();
  })
  it('Administrador -> Cargos', () => {
    cy.get('[fxflex="1 0 auto"] > .mat-focus-indicator > .mat-button-wrapper > .mat-icon').click();
    cy.get('.nav-link:contains("Administrador")').scrollIntoView();
    cy.get('.nav-link:contains("Administrador")').click();
    cy.get('.mat-ripple:contains("Cargos")').click();
    cy.get('.back > .mat-focus-indicator > .mat-button-wrapper > .mat-icon:contains("add")',{timeout: 40000}).click();
    cy.wait(3000);
    cy.get('.mat-input-element[name="nome"]').type("teste");
    cy.get('.mat-input-element[name="descricao"]').type("teste");
    cy.get('.mat-button-wrapper:contains("SALVAR")').click();
    cy.get('.mat-row > .cdk-column-nome:contains("TESTE")').first().parent().find('.mat-icon-no-color:contains("delete")').click();
    cy.get('.mat-row > .cdk-column-nome:contains("TESTE")').first().should('have.class','deleted');
  })
})
