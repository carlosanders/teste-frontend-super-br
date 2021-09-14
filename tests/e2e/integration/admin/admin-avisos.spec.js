/// <reference types="cypress" />

import Administracao from '../pageObjects/administracao'

describe('Teste para cadastrar, editar e exluir avisos', function () {

  beforeEach(function () {
    cy.fixture('admin/admin-avisos.json').then((fixture) => {
        this.admin = fixture.admin;
    })
  })

  it('Deve permitir cadastrar, editar e exluir avisos', function () {

    //locar no sistema
    cy.login('00000000004') 
    cy.visit("./apps/admin/avisos/listar")
    const administracao = new Administracao()

    administracao.getAdicionar().click()
    cy.wait(1000)
    administracao.getNome().clear().type(this.admin.nome)
    administracao.getDescricao().clear().type(this.admin.descricao)
    this.admin.tipoDocumentacao.map(function(data){
      administracao.getTipoDocumentacao(data.tipo1).invoke('text').should('eq', data.tipo1)
    })
    administracao.completeUnidade(this.admin.unidade)
    administracao.salvar().click()

     // Pesquisar item cadastrado
    administracao.getFiltrar().click()
    administracao.getNome().clear().type(this.admin.nome)
    administracao.buscar().click()    
    administracao.getTabelaAviso().should('be.visible')
    administracao.getTabelaAviso().should("contain.text", this.admin.nome)

    // Editar registro
    administracao.getItemEditar(this.admin.nome, "edit").should('be.visible')
    administracao.getItemEditar(this.admin.nome, "edit").click()
    this.admin.tipoDocumentacao.map(function(data){
      administracao.getTipoDocumentacao(data.tipo2).invoke('text').should('eq', data.tipo2)
    })
    administracao.completeModalidadeOrgaoCentral(this.admin.modalidadeOrgaoCentral)
    administracao.salvar().click()

    // Remover registro
    administracao.getItemEditar(this.admin.nome, "delete").should('be.visible')
    administracao.getItemEditar(this.admin.nome, "delete").click()
    administracao.getItemEditar(this.admin.nome, "edit").should('not.be.enabled')
    administracao.getItemEditar(this.admin.nome, "delete").should('not.be.enabled')

  })

})
