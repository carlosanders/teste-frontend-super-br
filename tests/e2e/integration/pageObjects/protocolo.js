export default class Protocolo {

    /**Atributos */
    getUnidadeArquivisticaProcesso(){
        return cy.get('.mat-radio-button:contains("Processo")')
    }

    getUnidadeArquivisticaDocAvulso(){
        return cy.contains('Documento Avulso')
    }

    getUnidadeArquivisticaPastaDossie(){
        return cy.contains('Pasta/Dossiê')
    }

    getAtribuirNovoProtocolo(){
        return cy.contains('Atribuir Novo Protocolo')
    }

    getInformarProtocoloExistente(){
        return cy.contains('Informar Protocolo Existente')
    }

    getNaoPossuiProtocolo(){
        return cy.contains('Não Possui Protocolo')
    }

    completeProcedencia(paramentro){
        return cy.autocomplete('#inputProcedencia', paramentro)
    }

    getProcedencia(){
        return cy.get('#inputProcedencia')
    }

    getBtnProcessoOrigem(){
        return cy.get('#cdk-step-content-0-0 .mat-slide-toggle-label:contains("Importar Dados de Processo Existente no Sistema")')
    }

    completeImportarProcessoOrigem(paramentro){
        return cy.autocomplete('#cdk-step-content-0-0 input[formcontrolname="processoOrigem"]', paramentro)
    }

    getImportarProcessoOrigem(paramentro){
        return cy.get('#cdk-step-content-0-0 input[formcontrolname="processoOrigem"]', paramentro)
    }

    getBuscarProcessoOrigem(){
        cy.get("form.ng-tns-c385-64 > :nth-child(3) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-suffix > .mat-focus-indicator > .mat-button-wrapper").click()
        return cy.get(":nth-child(1) > .cdk-column-actions > :nth-child(2) > .mat-focus-indicator").click()
    }

    completeProcessoDeTrabalho(paramentro){
        return cy.autocomplete('#cdk-step-content-0-0 input[formcontrolname="especieProcesso"]', paramentro)
    }

    getProcessoDeTrabalho(){
        return cy.get('#cdk-step-content-0-0 input[formcontrolname="especieProcesso"]')
    }

    getProcessoDeTrabalho(){
        return cy.get('#cdk-step-content-0-0 input[formcontrolname="especieProcesso"]')
    }

    completeMeio(paramentro){
        cy.autocomplete('#cdk-step-content-0-0 input[formcontrolname="modalidadeMeio"]', paramentro)
    }

    getMeio(){
        cy.get('#cdk-step-content-0-0 input[formcontrolname="modalidadeMeio"]')
    }

    completeClassificacao(paramentro){
        return cy.autocomplete('#cdk-step-content-0-0 input[formcontrolname="classificacao"]', paramentro)
    }

    getClassificacao(){
        return cy.get('#cdk-step-content-0-0 input[formcontrolname="classificacao"]')
    }

    getTitulo(){
        return cy.get('#cdk-step-content-0-0 input[formcontrolname="titulo"]')
    }

    getDescricao(){
        return cy.get('#cdk-step-content-0-0 input[formcontrolname="descricao"]')
    }

    getOutroNumero(){
        return cy.get('#cdk-step-content-0-0 input[formcontrolname="outroNumero"]')
    }

    completeSetorResponsavelDadosBasicos(paramentro){
        return cy.autocomplete('#cdk-step-content-0-0 input[formcontrolname="setorAtual"]', paramentro)
    }

    getSetorResponsavelDadosBasicos(){
        return cy.get('#cdk-step-content-0-0 input[formcontrolname="setorAtual"]')
    }

    getNup(){
        return cy.get('#cdk-step-content-0-0 input[formcontrolname="NUP"]')
    }

    getGerarNupProcesso(){
        return cy.gerarNup('#cdk-step-content-0-0 input[formcontrolname="NUP"]')
    }


    getChaveDeAcesso(){
        return cy.get('#cdk-step-content-0-0 input[formcontrolname="chaveAcesso"]')
    }

    getDataHoraDeAbertura(){
        return cy.get('#cdk-step-content-0-0 input[formcontrolname="dataHoraAbertura"]')
    }

    getPrincipal(){
        return cy.contains('Principal')
    }

    completeAssuntos(paramentro){
        return cy.autocomplete('#cdk-step-content-0-1 input[formcontrolname="assuntoAdministrativo"]', paramentro)
    }

    getAssuntos(){
        return cy.get('#cdk-step-content-0-1 input[formcontrolname="assuntoAdministrativo"]')
    }

    getTabelaAssuntos(){
        return cy.get('#cdk-step-content-0-1 table')
    }

    completePessoa(paramentro){
        return cy.autocomplete('#cdk-step-content-0-2 input[formcontrolname="pessoa"]', paramentro)
    }

    getPessoa(){
        return cy.get('#cdk-step-content-0-2 input[formcontrolname="pessoa"]')
    }

    completeModalidadeInteressado(paramentro){
        return cy.autocomplete('#cdk-step-content-0-2 input[formcontrolname="modalidadeInteressado"]', paramentro)
    }

    getModalidadeInteressado(){
        return cy.get('#cdk-step-content-0-2 input[formcontrolname="modalidadeInteressado"]')
    }

    getTabelaInteressados(){
        return cy.get('#cdk-step-content-0-2 table')
    }

    completeProcessoVinculado(paramentro){
        return cy.autocomplete('#cdk-step-content-0-4 input[formcontrolname="processoVinculado"]', paramentro)
    }

    getProcessoVinculado(){
        return cy.get('#cdk-step-content-0-4 input[formcontrolname="processoVinculado"]')
    }

    getCheckAnexacao(){
        return cy.contains('Estou ciente de que estes processos serão juntados para sempre e não poderão mais ser separados.')
    }

    getTabelaProcessoVinculado(){
        return cy.get('#cdk-step-content-0-4 table')
    }

    completeModalidadeVinculacaoProcesso(paramentro){
        return cy.autocomplete('#cdk-step-content-0-4 input[formcontrolname="modalidadeVinculacaoProcesso"]', paramentro)
    }

    getModalidadeVinculacaoProcesso(){
        return cy.get('#cdk-step-content-0-4 input[formcontrolname="modalidadeVinculacaoProcesso"]')
    }

    getObservacaoVinculacao(){
        return cy.get('#cdk-step-content-0-4 textarea[formcontrolname="observacao"]')
    }

    getTabelaVinculacoes(){
        return cy.get('#cdk-step-content-0-4 table')
    }

    getProcessoDistribuicao(){
        return cy.get('#cdk-step-content-0-5 input[formcontrolname="processo"]')
    }

    completeEspecieTarefa(paramentro){
        return cy.autocomplete('#cdk-step-content-0-5 input[formcontrolname="especieTarefa"]', paramentro)
    }

    getEspecieTarefa(){
        return cy.get('#cdk-step-content-0-5 input[formcontrolname="especieTarefa"]')
    }

    getDistribuicaoAutomatica(){
        return cy.get('#cdk-step-content-0-5 .mat-slide-toggle:contains("Distribuição Automática")')
    }

    getBlocoResponsaveis(){
        return cy.get('#cdk-step-content-0-5 .mat-slide-toggle:contains("Bloco de Responsáveis")')
    }

    getUnidadeResponsavel(){
        return cy.get('#cdk-step-content-0-5 input[formcontrolname="unidadeResponsavel"]')
    }

    completeSetorResponsavelDistribuicao(paramentro){
        return cy.autocomplete('#cdk-step-content-0-5 input[formcontrolname="setorResponsavel"]', paramentro)
    }

    getSetorResponsavelDistribuicao(){
        return cy.get('#cdk-step-content-0-5 input[formcontrolname="setorResponsavel"]')
    }

    completeUsuarioResponsavel(paramentro){
        return cy.autocomplete('#cdk-step-content-0-5 input[formcontrolname="usuarioResponsavel"]', paramentro)
    }

    getUsuarioResponsavel(){
        return cy.get('#cdk-step-content-0-5 input[formcontrolname="usuarioResponsavel"]')
    }

    getPrazoDias(){
        return cy.get('#cdk-step-content-0-5 input[formcontrolname="prazoDias"]')
    }

    getDataHoraInicioPrazo(){
        return cy.get('#cdk-step-content-0-5 input[formcontrolname="dataHoraInicioPrazo"]')
    }

    getDataHoraFinalPrazo(){
        return cy.get('#cdk-step-content-0-5 input[formcontrolname="dataHoraFinalPrazo"]')
    }

    completeSetorOrigem(paramentro){
        return cy.autocomplete('#cdk-step-content-0-5 input[formcontrolname="setorOrigem"]', paramentro)
    }

    getSetorOrigem(){
        return cy.get('#cdk-step-content-0-5 input[formcontrolname="setorOrigem"]')
    }

    getUrgente(){
        return cy.get('#cdk-step-content-0-5 .mat-slide-toggle:contains("Urgente")')
    }

    getObservacaoDistribuicao(){
        return cy.get('#cdk-step-content-0-5 textarea[formcontrolname="observacao"]')
    }

    getCapaProcesso(){
        return cy.get(".juntadas > .capa")
    }

    getMenuJuntada(){
        return cy.get(".header > .sidebar-toggle > .mat-button-wrapper > .mat-icon")
    }

    getNavegacaoJuntada(){
        return cy.get(".juntada-navigation")
    }

    getItemJuntada(ordemJuntada){
        return cy.get(".juntada > .index:contains('"+ordemJuntada+"')")
    }

    downloadFile(nomeArquivo){
        return cy.downloadFile('https://archive.org/download/arquivo_pdf_testes/' + nomeArquivo, 'tests/e2e/fixtures/download', nomeArquivo)
    }

    getBtnAnexar(){
        return cy.get('#cdk-step-content-0-3 button').eq(0)
    }

    getBtnUpload(){
        return cy.get('#fileUpload')
    }

    getBtnIniciarUpload(){
        return cy.get('.toolbar > .mb-4')
    }

    getTabelaDocumentos(){
        return cy.get('#cdk-step-content-0-3 table')
    }

    getItemTabelaDocumentos(item){
        return cy.get("#cdk-step-content-0-3 table > tbody > tr:nth-child("+item+")")
    }

    /**Navegação pelas abas */
    abaDadosBasicos(){
        return cy.contains('Dados básicos')
    }

    abaAssuntos(){
        return cy.contains('Assuntos')
    }

    abaInteressados(){
        return cy.contains('Interessados')
    }

    abaDocumentos(){
        return cy.contains('Documentos')
    }

    abaVinculacoes(){
        return cy.contains('Vinculações')
    }

    abaDistribuicao(){
        return cy.contains('Distribuição')
    }

    /**Controles */
    salvarDadosBasicos(){
        return cy.get('#cdk-step-content-0-0').contains('SALVAR')
    }

    salvarAssuntos(){
        return cy.get('#cdk-step-content-0-1').contains('SALVAR')
    }

    salvarInteressados(){
        return cy.get('#cdk-step-content-0-2').contains('SALVAR')
    }

    salvarVinculacoes(){
        return cy.get('#cdk-step-content-0-4').contains('SALVAR')
    }

    salvarDistribuicao(){
        return cy.get('#cdk-step-content-0-5').contains('SALVAR')
    }

}
