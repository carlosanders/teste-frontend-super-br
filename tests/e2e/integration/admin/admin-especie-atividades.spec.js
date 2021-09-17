/// <reference types="cypress" />

import Administracao from '../pageObjects/administracao'

describe('Teste para cadastrar, editar e exluir espécies de atividades', function () {

    let paramNome

  beforeEach(function () {
    cy.fixture('admin/admin-especie-atividades.json').then((fixture) => {
        this.admin = fixture.admin;
    })
  })

  it('Deve permitir cadastrar, editar e exluir espécies de atividades', function () {

    //locar no sistema
    cy.login('00000000004') 
    cy.visit("./apps/admin/especie-atividades/listar")
    const administracao = new Administracao()

    paramNome = this.admin.nome + Math.random()

    administracao.getAdicionar().click()
    cy.wait(1000)
    administracao.getNome().clear().type(paramNome)
    administracao.getDescricaoTextArea().clear().type(this.admin.descricao)
    this.admin.generoAtividade.map(function(data){
        administracao.completeGeneroAtividade(data.genero1)
    })
    administracao.getSituacao().click()
    administracao.salvar().click()

    // Pesquisar item cadastrado
    administracao.getFiltrar().click()
    administracao.getNome().clear().type(paramNome)
    administracao.buscar().click()    
    administracao.getTabelaAviso().should('be.visible')
    administracao.getTabelaAviso().should("contain.text", paramNome)

    // Editar registro
    administracao.getItemEditar(paramNome, "edit").should('be.visible')
    administracao.getItemEditar(paramNome, "edit").click()
    cy.wait(1000)
    this.admin.generoAtividade.map(function(data){
        administracao.completeGeneroAtividade(data.genero2)
    })
    administracao.salvar().click()

    // Remover registro
    // Pesquisar registro inativo
    administracao.getFiltrar().click()
    administracao.getNome().clear().type(paramNome)
    administracao.buscar().click()
    cy.wait(1000)
    administracao.btnInativos().should('be.visible')
    administracao.btnInativos().should('be.enabled')
    administracao.btnInativos().click()
    administracao.getTabelaAviso().should('be.visible')
    administracao.getTabelaAviso().should("contain.text", paramNome)

  })

})
