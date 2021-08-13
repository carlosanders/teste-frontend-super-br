/// <reference types="cypress" />

import Protocolo from '../pageObjects/protocolo'

describe('Criar processo pasta/dossiê', function () {
  const protocolo = new Protocolo()
  let paramPessoa, 
      paramOrgao, 
      paramProcessoDeTrabalho, 
      paramMeio, 
      paramClassificacao,
      paramTitulo,
      paramEspecieTarefa,
      paramAssuntos,
      paramModalidadeInteressado,
      paramUsuarioResponsavel 

      paramPessoa = "ADVOCACIA-GERAL DA UNIÃO"
      paramOrgao = "SECRETARIA (SEI)"
      paramProcessoDeTrabalho = "COMUM"
      paramMeio = "ELETRÔNICO"
      paramClassificacao = "MODERNIZAÇÃO E REFORMA ADMINISTRATIVA PROJETOS, ESTUDOS E NORMAS"
      paramTitulo = "PROCESSO DE TESTE"
      paramAssuntos = "RECURSOS HUMANOS"
      paramModalidadeInteressado = "REQUERENTE (PÓLO ATIVO)"
      paramEspecieTarefa = "ADOTAR PROVIDÊNCIAS ADMINISTRATIVAS"
      paramUsuarioResponsavel = "JOÃO ADMIN"      

  it('Protocolo -> Administrativo -> Processo -> Pasta/Dossiê', function () {

    //locar no sistema
    cy.login('00000000004')

    /**Aba Dados básicos */
    cy.navegarProtocolo()
    protocolo.getUnidadeArquivisticaPastaDossie().click({force:true})
    protocolo.getNaoPossuiProtocolo().click()
    protocolo.completeProcedencia(paramPessoa)
    protocolo.completeProcessoDeTrabalho(paramProcessoDeTrabalho)
    protocolo.completeMeio(paramMeio)
    protocolo.completeClassificacao(paramClassificacao)
    protocolo.getTitulo().clear().type(paramTitulo)
    protocolo.completeSetorResponsavelDadosBasicos(paramOrgao)

    protocolo.salvarDadosBasicos().click()

    cy.location('pathname', {timeout: 20000}).should('include', '/editar/dados-basicos-steps/administrativo')

    /**Aba assustos */
    protocolo.abaAssuntos().click()
    protocolo.getPrincipal().click()
    protocolo.completeAssuntos(paramAssuntos)
    protocolo.salvarAssuntos().click()
    cy.wait(5000)
    protocolo.getTabelaAssuntos().should("be.visible")
    protocolo.getTabelaAssuntos().should("contain.text", paramAssuntos)

    /**Aba Interessados */
    protocolo.abaInteressados().click()
    protocolo.completePessoa(paramPessoa)
    protocolo.completeModalidadeInteressado(paramModalidadeInteressado)
    protocolo.salvarInteressados().click()
    cy.wait(5000)
    protocolo.getTabelaInteressados().should("be.visible")
    protocolo.getTabelaInteressados().should("contain.text", paramPessoa)

    /**Aba Distribuição */
    protocolo.abaDistribuicao().click()
    protocolo.getProcessoDistribuicao().invoke('val').should("not.be.empty")
    protocolo.completeEspecieTarefa(paramEspecieTarefa)
    protocolo.getDistribuicaoAutomatica().click()
    protocolo.getBlocoResponsaveis().click()
    protocolo.getUnidadeResponsavel().invoke('val').should("not.be.empty")
    protocolo.completeSetorResponsavelDistribuicao(paramOrgao)
    protocolo.getDistribuicaoAutomatica().click()
    protocolo.getBlocoResponsaveis().click()    
    protocolo.completeUsuarioResponsavel(paramUsuarioResponsavel)
    protocolo.getPrazoDias().invoke('val').should("not.be.empty")
    protocolo.getDataHoraInicioPrazo().invoke('val').should("not.be.empty")
    protocolo.getDataHoraFinalPrazo().invoke('val').should("not.be.empty")
    protocolo.completeSetorOrigem(paramOrgao)
    protocolo.salvarDistribuicao().click()

    protocolo.getMenuJuntada().click()
    protocolo.getCapaProcesso().should("contain.text", "CAPA")
    cy.location('pathname').should('include', 'capa/mostrar')

  })

})
