export default class Tarefa {

    getAdicionar(){
        return cy.get('.header > .mat-focus-indicator:contains("add")')
    }

    getBtnProcurarProcesso() {
        return cy.get('.mat-form-field > .mat-form-field-suffix > .button:contains("Processo")');
    }

    completeProcesso(parametro){
        return cy.autocomplete('#mat-input-39', parametro);
    }

    completeEspecieTarefa(parametro){
        return cy.autocomplete('#mat-input-40', parametro);
    }

    completeSetorResponsavel(parametro) {
        return cy.autocomplete('#mat-input-46', parametro);
    }

    completeUsuarioResponsavel(parametro) {
        return cy.autocomplete('#mat-input-50', parametro);
    }

    getBotaoSalvar() {
            return cy.get('.mat-button-base:contains("SALVAR")')
    }
}