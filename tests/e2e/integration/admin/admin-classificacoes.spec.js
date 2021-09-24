/// <reference types="cypress" />

import Administracao from '../pageObjects/administracao'

describe('Teste para cadastrar, editar e exluir classificações', function () {

  let paramNome

  beforeEach(function () {
    cy.fixture('admin/admin-classificacoes.json').then((fixture) => {
        this.admin = fixture.admin;
    })
  })

  it('Deve permitir cadastrar, editar e exluir classificações', function () {

    //locar no sistema
    cy.login('00000000004') 
    cy.visit("./apps/admin/classificacoes/listar")
    const administracao = new Administracao()

    paramNome = this.admin.nome + Math.random()

    administracao.getAdicionar().click()
    cy.wait(1000)
    administracao.getCodigo().type(this.admin.codigo)
    administracao.getNome().type(paramNome)
    this.admin.modalidadeDestinacao.map(function(data){
      administracao.completeModalidadeDestinacao(data.modalidade1)
    })
    administracao.completeClassificacaoPai(this.admin.classificacaoPai)
    administracao.getSituacao().click()
    administracao.salvar().click()

    // Pesquisar item cadastrado
    administracao.getFiltrar().click()
    administracao.getNome().clear().type(paramNome)
    administracao.buscar().click()
    administracao.getTabelaAviso().should('be.visible')
    administracao.getTabelaAviso().should("contain.text", this.admin.codigo)
    administracao.getTabelaAviso().should("contain.text", paramNome)
    this.admin.modalidadeDestinacao.map(function(data){
      administracao.getTabelaAviso().should("contain.text", data.modalidade1)
    })

    // Editar registro
    administracao.getItemEditar(paramNome, "edit").should('be.visible')
    administracao.getItemEditar(paramNome, "edit").click()
    cy.wait(1000)
    this.admin.modalidadeDestinacao.map(function(data){
      administracao.completeModalidadeDestinacao(data.modalidade2)
    })
    administracao.getRestricaoAcesso().click()
    administracao.getPermissaoUso().click()
    administracao.getPrazoGuardaFaseCorrenteDia().type(this.admin.prazoGuardaFaseCorrenteDia)
    administracao.getPrazoGuardaFaseCorrenteMes().type(this.admin.prazoGuardaFaseCorrenteMes)
    administracao.getPrazoGuardaFaseCorrenteAno().type(this.admin.prazoGuardaFaseCorrenteAno)
    administracao.getPrazoGuardaFaseCorrenteEvento().type(this.admin.prazoGuardaFaseCorrenteEvento)
    administracao.getPrazoGuardaFaseIntermediariaDia().type(this.admin.prazoGuardaFaseIntermediariaDia)
    administracao.getPrazoGuardaFaseIntermediariaMes().type(this.admin.prazoGuardaFaseIntermediariaMes)
    administracao.getPrazoGuardaFaseIntermediariaAno().type(this.admin.prazoGuardaFaseIntermediariaAno)
    administracao.getPrazoGuardaFaseIntermediariaEvento().type(this.admin.prazoGuardaFaseIntermediariaEvento)
    administracao.salvar().click()

    // Pesquisar item cadastrado
    administracao.getFiltrar().click()
    administracao.getNome().clear().type(paramNome)
    administracao.buscar().click()
    administracao.getTabelaAviso().should('be.visible')
    administracao.getTabelaAviso().should("contain.text", this.admin.codigo)
    administracao.getTabelaAviso().should("contain.text", paramNome)
    this.admin.modalidadeDestinacao.map(function(data){
      administracao.getTabelaAviso().should("contain.text", data.modalidade2)
    })    

    // Inativar registro
    administracao.getItemEditar(paramNome, "edit").should('be.visible')
    administracao.getItemEditar(paramNome, "edit").click()
    cy.wait(1000)
    administracao.getSituacao().click()
    administracao.salvar().click()

    // Pesquisar item cadastrado
    administracao.getFiltrar().click()
    administracao.getNome().clear().type(paramNome)
    administracao.buscar().click()
    administracao.btnInativos().click()
    administracao.getTabelaAviso().should('be.visible')
    administracao.getTabelaAviso().should("contain.text", this.admin.codigo)
    administracao.getTabelaAviso().should("contain.text", paramNome)
    this.admin.modalidadeDestinacao.map(function(data){
      administracao.getTabelaAviso().should("contain.text", data.modalidade2)
    })   

    // Remover registro
    administracao.getItemEditar(paramNome, "delete").should('be.visible')
    administracao.getItemEditar(paramNome, "delete").click()
    administracao.getItemEditar(paramNome, "edit").should('not.be.enabled')
    administracao.getItemEditar(paramNome, "delete").should('not.be.enabled')

  })

})
