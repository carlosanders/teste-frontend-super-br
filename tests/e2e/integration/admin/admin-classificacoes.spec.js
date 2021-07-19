context('Administrador', () => {
    beforeEach(() => {
        cy.login('00000000004');
    })

    //Teste desativado por erro de implementação, deverá ser reativado assim que for corrigido
    it.skip('Administrador -> Classificações', () => {
        cy.get('[fxflex="1 0 auto"] > .mat-focus-indicator > .mat-button-wrapper > .mat-icon').click();
        cy.get('.nav-link:contains("Administrador")').scrollIntoView();
        cy.get('.nav-link:contains("Administrador")').click();
        cy.get('.mat-ripple:contains("Classificações")').click();
        cy.get('.back > .mat-focus-indicator > .mat-button-wrapper > .mat-icon:contains("add")',{timeout: 40000}).click();
        cy.wait(3000);
        cy.get('.mat-input-element[formControlName="codigo"]').type("000.0");
        cy.get('.mat-input-element[formControlName="nome"]').type("teste");
        cy.get('.mat-input-element[formControlName="modalidadeDestinacao"]').type("ELIMINAÇÃO");
        cy.get('.mat-input-element[formControlName="parent"]').type("020 - PESSOAL");
        cy.get('#mat-checkbox-65 > .mat-checkbox-layout > .mat-checkbox-label').click();
        cy.get('.mat-button-wrapper:contains("SALVAR")').click();
        cy.get('.mat-row > .cdk-column-nome:contains("TESTE")').first().parent().find('.mat-icon-no-color:contains("delete")').click();
        cy.get('.mat-row > .cdk-column-nome:contains("TESTE")').first().should('have.class','deleted');
    })
})
