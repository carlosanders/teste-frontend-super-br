/// <reference types="cypress" />

import Administracao from '../pageObjects/administracao'

describe('Cadastrar editar e exluir unidades', function () {
  const administracao = new Administracao()
  let paramNome,
      paramSigla,
      paramPrefixoNUP,
      paramNUPInicial,
      paramEndereco,
      paramEmail,
      paramOrgaoCentral,
      paramUnidadePai,
      paramGenero,
      paramMunicipio,
      paramSituacao,
      paramProtocolo,
      paramNumeracaoDocUnidade

      paramNome = "MODERNIZAÇÃO E REFORMA ADMINISTRATIVA PROJETOS, ESTUDOS E NORMAS " + Math.random()
      paramSigla = "MOD"
      paramNUPInicial = "00000.0"
      paramOrgaoCentral = "AGU"
      paramGenero = "ADMINISTRATIVO"
      paramMunicipio = "JUNDIAÍ DO SUL"

  it.skip('Administração -> Unidades', function () {

    //locar no sistema
    cy.login('00000000004') 

    /**Aba Dados básicos */
    cy.navegarAdministracao("Unidades")
    administracao.getAdicionar().click()
    cy.wait(1000)

    administracao.getNome().type(paramNome)
    administracao.getSigla().type(paramSigla)
    administracao.getPrefixoNUP().type(paramNUPInicial)
    administracao.completeModalidadeOrgaoCentral(paramOrgaoCentral)
    administracao.completeGenero(paramGenero)
    administracao.completeMunicipio(paramMunicipio)
    administracao.getSituacao().dblclick()

    administracao.salvar().click()

    // Pesquisar item cadastrado
    // administracao.getFiltrar().click()
    // administracao.getNome().clear().type(paramNome)
    // administracao.buscar().click()

    // administracao.getTabelaAviso().should('be.visible')
    // administracao.getTabelaAviso().should("contain.text", paramCodigo)
    // administracao.getTabelaAviso().should("contain.text", paramNome)
    // administracao.getTabelaAviso().should("contain.text", paramModalidadeDestinacao)

    // // Editar registro
    // administracao.getItemEditar(paramNome, "edit").should('be.visible')
    // administracao.getItemEditar(paramNome, "edit").click()

    // paramModalidadeDestinacao = "TRANSFERÊNCIA"
    // cy.wait(3000)

    // administracao.completeModalidadeDestinacao(paramModalidadeDestinacao)
    // administracao.getRestricaoAcesso().click()
    // administracao.getPermissaoUso().click()

    // administracao.getPrazoGuardaFaseCorrenteDia().type(10)
    // administracao.getPrazoGuardaFaseCorrenteMes().type(10)
    // administracao.getPrazoGuardaFaseCorrenteAno().type(10)
    // administracao.getPrazoGuardaFaseCorrenteEvento().type("TESTE")

    // administracao.getPrazoGuardaFaseIntermediariaDia().type(10)
    // administracao.getPrazoGuardaFaseIntermediariaMes().type(10)
    // administracao.getPrazoGuardaFaseIntermediariaAno().type(10)
    // administracao.getPrazoGuardaFaseIntermediariaEvento().type("TESTE")    

    // administracao.salvar().click()

    // // Pesquisar item cadastrado
    // administracao.getFiltrar().click()
    // administracao.getNome().clear().type(paramNome)
    // administracao.buscar().click()

    // administracao.getTabelaAviso().should('be.visible')
    // administracao.getTabelaAviso().should("contain.text", paramCodigo)
    // administracao.getTabelaAviso().should("contain.text", paramNome)
    // administracao.getTabelaAviso().should("contain.text", paramModalidadeDestinacao)

    // // Inativar registro
    // administracao.getItemEditar(paramNome, "edit").should('be.visible')
    // administracao.getItemEditar(paramNome, "edit").click()

    // paramModalidadeDestinacao = "TRANSFERÊNCIA"
    // cy.wait(3000)

    // administracao.getSituacao().click()
    // administracao.salvar().click()

    // // Pesquisar item cadastrado
    // administracao.getFiltrar().click()
    // administracao.getNome().clear().type(paramNome)
    // administracao.buscar().click()
    // administracao.btnInativos().click()

    // administracao.getTabelaAviso().should('be.visible')
    // administracao.getTabelaAviso().should("contain.text", paramCodigo)
    // administracao.getTabelaAviso().should("contain.text", paramNome)
    // administracao.getTabelaAviso().should("contain.text", paramModalidadeDestinacao)

    // // Remover registro
    // administracao.getItemEditar(paramNome, "delete").should('be.visible')
    // administracao.getItemEditar(paramNome, "delete").click()

    // administracao.getItemEditar(paramNome, "edit").should('not.be.enabled')
    // administracao.getItemEditar(paramNome, "delete").should('not.be.enabled')

  })

})
