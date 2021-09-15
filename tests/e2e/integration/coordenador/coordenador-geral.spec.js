/// <reference types="cypress" />

context('Coordenador', () => {
    beforeEach(() => {
        cy.login('00000000005');
    })

    // https://on.cypress.io/interacting-with-elements
    it.skip('Coordenador -> Unidades -> Refresh', () => {

        cy.intercept('GET', '/profile', { fixture: 'coordenador/profile-coordenador.json' })
        cy.intercept({
            pathname: '/v1/administrativo/setor',
            query: {
                where: '{"parent":"isNull","modalidadeOrgaoCentral.id":"eq:6"}',
            },
        }, { fixture: 'setor/resposta-setor.json' });

        //v1/administrativo/setor?where={"parent":"isNull","modalidadeOrgaoCentral.id":"6"}
        //Acessa o menu Administrador -> Avisos
        cy.get('[fxflex="1 0 auto"] > .mat-focus-indicator > .mat-button-wrapper > .mat-icon').click();
        cy.get('.nav-link:contains("Coordenador")').scrollIntoView();
        cy.get('.nav-link:contains("Coordenador")').click();
        cy.get('.mat-ripple:contains("Unidades")').click();
        cy.wait(3000);
        //Clica no botão de refresh
        cy.get('mat-icon:contains("refresh")').click();
        cy.get('.mat-cell').should('includes.text', 'ADVOCACIA-GERAL DA UNIÃO 1');
        cy.wait(3000);
        cy.get('simple-snack-bar').should('not.exist');
    })
})
