/// <reference types="cypress" />

import Administracao from '../pageObjects/administracao'

describe('Teste para cadastrar, editar e exluir modalidade órgão central', function () {

  let paramNome
  
  beforeEach(function () {
    cy.fixture('admin/admin-modalidade-orgao-central.json').then((fixture) => {
        this.admin = fixture.admin;
    })
  })

  it('Deve permitir cadastrar, editar e exluir modalidade órgão central', function () {

    //locar no sistema
    cy.login('00000000004') 
    cy.visit("./apps/admin/modalidade-orgao-central/listar")
    const administracao = new Administracao()

    paramNome = this.admin.nome + Math.random()

    administracao.getAdicionar().click()
    cy.wait(1000)
    administracao.getSituacao().click()
    administracao.getValor().clear().type(paramNome)
    administracao.getDescricaoTextArea().clear().type(this.admin.descricao)
    administracao.salvar().click()

    // Pesquisar item cadastrado
    administracao.getFiltrar().click()
    administracao.getValor().clear().type(paramNome)
    administracao.buscar().click()
    administracao.getTabelaAviso().should('be.visible')
    administracao.getTabelaAviso().should("contain.text", paramNome)

    // Editar registro
    administracao.getItemEditarValor(paramNome, "edit").should('be.visible')
    administracao.getItemEditarValor(paramNome, "edit").click()
    paramNome = this.admin.nome + Math.random()
    cy.wait(1000)
    administracao.getValor().clear().type(paramNome)
    administracao.getDescricaoTextArea().clear().type(this.admin.descricao)
    administracao.salvar().click()

    // Pesquisar item cadastrado
    administracao.getFiltrar().click()
    administracao.getValor().clear().type(paramNome)
    administracao.buscar().click()
    administracao.getTabelaAviso().should('be.visible')
    administracao.getTabelaAviso().should("contain.text", paramNome)

    // Inativar registro
    administracao.getItemEditarValor(paramNome, "edit").should('be.visible')
    administracao.getItemEditarValor(paramNome, "edit").click()
    cy.wait(1000)
    administracao.getSituacao().click()
    administracao.salvar().click()

    // Pesquisar registro inativo
    administracao.getFiltrar().click()
    administracao.getValor().clear().type(paramNome)
    administracao.buscar().click()
    cy.wait(1000)
    administracao.btnInativos().should('be.visible')
    administracao.btnInativos().should('be.enabled')
    administracao.btnInativos().click()
    administracao.getTabelaAviso().should('be.visible')
    administracao.getTabelaAviso().should("contain.text", paramNome)

  })

})
