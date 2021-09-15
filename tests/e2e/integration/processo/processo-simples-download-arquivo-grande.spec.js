/// <reference types="cypress" />

import Protocolo from '../pageObjects/protocolo'

describe('Teste de bloqueo de criação de processo simples contendo um documento grande juntado', function () {
  
    const protocolo = new Protocolo()

    before(function () {
      cy.fixture('processos/processo-simples-download-varios-arquivos.json').then((fixture) => {
          this.processo = fixture.processo;
          this.distribuicao = fixture.distribuicao;
      })
    })

    beforeEach(function () {
      this.processo.documentos.map(function(data){
        data.nome.forEach(($nome) => {
          protocolo.downloadFile($nome)
        })
      })
    })

    it.skip('Deve bloquear a juntanda de um documento grande', function () {   

    //locar no sistema
    cy.login('00000000004')

    /**Aba Dados básicos */
    cy.visit("./apps/processo/criar/editar/dados-basicos-steps/administrativo")
    protocolo.getUnidadeArquivisticaProcesso().click()
    protocolo.getAtribuirNovoProtocolo().click()
    protocolo.completeProcedencia(this.processo.procedencia)
    protocolo.completeProcessoDeTrabalho(this.processo.processoDeTrabalho)
    protocolo.completeMeio(this.processo.meio)
    protocolo.completeClassificacao(this.processo.classificacao)
    protocolo.getTitulo().clear().type(this.processo.titulo)
    protocolo.completeSetorResponsavelDadosBasicos(this.processo.setorOrigem)      

    protocolo.salvarDadosBasicos().click()

    cy.location('pathname', {timeout: 20000}).should('include', '/editar/dados-basicos-steps/administrativo')
  
    protocolo.abaDadosBasicos().click()
    protocolo.getNup().should('be.visible')
    protocolo.getNup().invoke('val').should('not.be.empty')
    protocolo.getChaveDeAcesso().should('be.visible')
    protocolo.getChaveDeAcesso().invoke('val').should("not.be.empty")
    protocolo.getDataHoraDeAbertura().should('be.visible')
    protocolo.getDataHoraDeAbertura().invoke('val').should("not.be.empty")

    //Aba assustos
    protocolo.abaAssuntos().click()
    this.processo.assuntos.map(function(data){
        protocolo.getPrincipal().click()
        protocolo.completeAssuntos(data.nome)
        protocolo.salvarAssuntos().click()
        cy.wait(5000)
        protocolo.getTabelaAssuntos().should("be.visible")
        protocolo.getTabelaAssuntos().should("contain.text", data.nome)
    })

    //Aba Interessados
    protocolo.abaInteressados().click()
    this.processo.interessados.map(function(data){
        protocolo.completePessoa(data.pessoa)
        protocolo.completeModalidadeInteressado(data.modalidade)
        protocolo.salvarInteressados().click()
        cy.wait(5000)
        protocolo.getTabelaInteressados().should("be.visible")
        protocolo.getTabelaInteressados().should("contain.text", data.pessoa)
    })

    /**Aba Documentos */
    protocolo.abaDocumentos().click()
    protocolo.getBtnAnexar().click()
    this.processo.documentos.map(function(data){
      data.nome.forEach(($nome) => {
        protocolo.getBtnUpload().attachFile("download/"+$nome)
      })
    })
    protocolo.getBtnIniciarUpload().click()
    cy.wait(3000);
    protocolo.getTabelaDocumentos().should("be.visible")
    protocolo.getItemTabelaDocumentos(1).should('be.visible')

    //Aba Distribuição
    protocolo.abaDistribuicao().click()
    protocolo.getProcessoDistribuicao().invoke('val').should("not.be.empty")
    cy.wait(5000)
    protocolo.completeEspecieTarefa(this.distribuicao.especieTarefa)
    protocolo.getDistribuicaoAutomatica().click()
    protocolo.getBlocoResponsaveis().click()
    protocolo.getUnidadeResponsavel().invoke('val').should("not.be.empty")
    protocolo.completeSetorResponsavelDistribuicao(this.processo.setorOrigem)
    protocolo.getDistribuicaoAutomatica().click()
    protocolo.getBlocoResponsaveis().click()
    protocolo.completeUsuarioResponsavel(this.distribuicao.responsavel)
    protocolo.getPrazoDias().invoke('val').should("not.be.empty")
    protocolo.getDataHoraInicioPrazo().invoke('val').should("not.be.empty")
    protocolo.getDataHoraFinalPrazo().invoke('val').should("not.be.empty")
    protocolo.completeSetorOrigem(this.distribuicao.setorOrigem)
    protocolo.salvarDistribuicao().click()

    protocolo.getMenuJuntada().click()
    protocolo.getCapaProcesso().click()
    protocolo.getCapaProcesso().should("contain.text", "CAPA")
    cy.location('pathname').should('include', 'capa/mostrar')

    this.processo.documentos.map(function(data){
      data.nome.forEach(($nome, $i) => {
        protocolo.getItemJuntada($i+1).click()
        protocolo.getNavegacaoJuntada().should("contain.text", Cypress._.toUpper($nome))
      })
    })

  })

})
