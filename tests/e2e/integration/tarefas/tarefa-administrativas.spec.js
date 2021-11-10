/// <reference types="cypress" />

import Tarefa from '../pageObjects/trarefa';

describe('Teste de criação de uma tarefa Administrativa', function () {

    beforeEach(function () {
        cy.fixture('tarefa/tarefa.json').then((fixture) => {
            this.tarefa = fixture.tarefa;
        })
    });

    it('Deve permitir criar uma tarefa', function () {
        cy.login('00000000004');
    
        cy.visit("./apps/tarefas/administrativo/minhas-tarefas/entrada");

        const tarefa = new Tarefa();
        tarefa.getAdicionar().click();
        tarefa.completeProcesso(this.tarefa.nupProcesso);
        tarefa.completeEspecieTarefa(this.tarefa.especieTarefa);
        tarefa.completeSetorResponsavel(this.tarefa.setorResponsavel);
        tarefa.completeUsuarioResponsavel(this.tarefa.usuarioResponsavel);
        tarefa.getBotaoSalvar().click();

        





    
    });

});
