/// <reference types="cypress" />

import Protocolo from '../pageObjects/protocolo'

describe('Teste de criação de um processo simples com vinculação do tipo anexação', function () {

  beforeEach(function () {
    cy.fixture('processos/processo-simples-vinculacao-anexacao.json').then((fixture) => {
        this.processo = fixture.processo;
        this.distribuicao = fixture.distribuicao;
    })
  })

  const protocolo = new Protocolo()

  it('Deve permitir criar um processo simples (sem documentos) e distribuí-lo', function () {

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
    protocolo.getNup().invoke('val').as("numProtocolo")
    protocolo.getNup().invoke('val').should('not.be.empty')
    protocolo.getChaveDeAcesso().should('be.visible')
    protocolo.getChaveDeAcesso().invoke('val').should("not.be.empty")
    protocolo.getDataHoraDeAbertura().should('be.visible')
    protocolo.getDataHoraDeAbertura().invoke('val').should("not.be.empty")

    /**Aba assustos */
    protocolo.abaAssuntos().click()
    this.processo.assuntos.map(function(data){
        protocolo.getPrincipal().click()
        protocolo.completeAssuntos(data.nome)
        protocolo.salvarAssuntos().click()
        cy.wait(5000)
        protocolo.getTabelaAssuntos().should("be.visible")
        protocolo.getTabelaAssuntos().should("contain.text", data.nome)
    })

    /**Aba Interessados */
    protocolo.abaInteressados().click()
    this.processo.interessados.map(function(data){
        protocolo.completePessoa(data.pessoa)
        protocolo.completeModalidadeInteressado(data.modalidade)
        protocolo.salvarInteressados().click()
        cy.wait(5000)
        protocolo.getTabelaInteressados().should("be.visible")
        protocolo.getTabelaInteressados().should("contain.text", data.pessoa)
    })

    /**Aba Distribuição */
    protocolo.abaDistribuicao().click()
    protocolo.getProcessoDistribuicao().invoke('val').should("not.be.empty")
    protocolo.completeEspecieTarefa(this.distribuicao.especieTarefa)
    protocolo.getDistribuicaoAutomatica().click()
    protocolo.getBlocoResponsaveis().click()
    protocolo.getUnidadeResponsavel().invoke('val').should("not.be.empty")
    protocolo.completeSetorResponsavelDistribuicao(this.distribuicao.setorOrigem)
    protocolo.getDistribuicaoAutomatica().click()
    protocolo.getBlocoResponsaveis().click()    
    protocolo.completeUsuarioResponsavel(this.distribuicao.responsavel)
    protocolo.getPrazoDias().invoke('val').should("not.be.empty")
    protocolo.getDataHoraInicioPrazo().invoke('val').should("not.be.empty")
    protocolo.getDataHoraFinalPrazo().invoke('val').should("not.be.empty")
    protocolo.completeSetorOrigem(this.distribuicao.setorOrigem)
    protocolo.salvarDistribuicao().click()

    protocolo.getCapaProcesso().should("contain.text", "CAPA")
    cy.location('pathname').should('include', 'capa/mostrar')

  })

  it('Deve permitir criar um processo simples com vinculação do tipo anexação (sem documentos) e distribuí-lo', function () {

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

    /**Aba assustos */
    protocolo.abaAssuntos().click()
    this.processo.assuntos.map(function(data){
        protocolo.getPrincipal().click()
        protocolo.completeAssuntos(data.nome)
        protocolo.salvarAssuntos().click()
        cy.wait(5000)
        protocolo.getTabelaAssuntos().should("be.visible")
        protocolo.getTabelaAssuntos().should("contain.text", data.nome)
    })

    /**Aba Interessados */
    protocolo.abaInteressados().click()
    this.processo.interessados.map(function(data){
        protocolo.completePessoa(data.pessoa)
        protocolo.completeModalidadeInteressado(data.modalidade)
        protocolo.salvarInteressados().click()
        cy.wait(5000)
        protocolo.getTabelaInteressados().should("be.visible")
        protocolo.getTabelaInteressados().should("contain.text", data.pessoa)
    })

    /**Aba Vinculações */
    protocolo.abaVinculacoes().click()
    protocolo.completeProcessoVinculado(this.numProtocolo)
    this.processo.vinculacoes.map(function(data){
      protocolo.completeModalidadeVinculacaoProcesso(data.modalidade)
      protocolo.getCheckAnexacao().click()
      protocolo.getObservacaoVinculacao().type(data.observacao)
      protocolo.salvarVinculacoes().click()
    })
    protocolo.getTabelaProcessoVinculado().should("contain.text", this.numProtocolo)

    /**Aba Distribuição */
    protocolo.abaDistribuicao().click()
    protocolo.getProcessoDistribuicao().invoke('val').should("not.be.empty")
    protocolo.completeEspecieTarefa(this.distribuicao.especieTarefa)
    protocolo.getDistribuicaoAutomatica().click()
    protocolo.getBlocoResponsaveis().click()
    protocolo.getUnidadeResponsavel().invoke('val').should("not.be.empty")
    protocolo.completeSetorResponsavelDistribuicao(this.distribuicao.setorOrigem)
    protocolo.getDistribuicaoAutomatica().click()
    protocolo.getBlocoResponsaveis().click()    
    protocolo.completeUsuarioResponsavel(this.distribuicao.responsavel)
    protocolo.getPrazoDias().invoke('val').should("not.be.empty")
    protocolo.getDataHoraInicioPrazo().invoke('val').should("not.be.empty")
    protocolo.getDataHoraFinalPrazo().invoke('val').should("not.be.empty")
    protocolo.completeSetorOrigem(this.distribuicao.setorOrigem)
    protocolo.salvarDistribuicao().click()

    protocolo.getMenuJuntada().click()
    protocolo.getCapaProcesso().should("contain.text", "CAPA")
    cy.location('pathname').should('include', 'capa/mostrar')

  })

})
