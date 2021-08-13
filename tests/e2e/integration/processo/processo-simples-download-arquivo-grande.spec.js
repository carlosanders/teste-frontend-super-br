/// <reference types="cypress" />

import Protocolo from '../pageObjects/protocolo'

describe('Criar processo simples contendo documento grande juntado', { taskTimeout: 5000000 }, function () {
    const protocolo = new Protocolo()
    const paramNomeArquivo = new Array()
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
    paramNomeArquivo[0] = "arquivo_060.pdf"

    beforeEach(() => {
        paramNomeArquivo.forEach(($arquivo) => {
            protocolo.downloadFile($arquivo)
        })
    })


    // Teste desconsiderado por ser muito lento e não agregar para os testes de implementação de regras do sistema, mas
    // somente para as configurações dos servidores de aplicação em relação aos parâmetros de upload
    it.skip('Protocolo -> Administrativo -> Processo -> Simples', function () {

        //logar no sistema
        cy.login('00000000004')

        /**Aba Dados básicos */
        cy.navegarProtocolo()
        protocolo.getUnidadeArquivisticaProcesso().click()
        protocolo.getAtribuirNovoProtocolo().click()
        protocolo.completeProcedencia(paramPessoa)
        protocolo.completeProcessoDeTrabalho(paramProcessoDeTrabalho)
        protocolo.completeMeio(paramMeio)
        protocolo.completeClassificacao(paramClassificacao)
        protocolo.getTitulo().clear().type(paramTitulo)
        protocolo.completeSetorResponsavelDadosBasicos(paramOrgao)

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

        /**Aba Documentos */
        protocolo.abaDocumentos().click()
        protocolo.getBtnAnexar().click()
        protocolo.getBtnUpload().attachFile(["download/"+paramNomeArquivo[0]]);
        protocolo.getBtnIniciarUpload().click()
        cy.wait(3000);
        protocolo.getTabelaDocumentos().should("be.visible")
        protocolo.getItemTabelaDocumentos(1).should('be.visible')

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
        protocolo.getCapaProcesso().click()
        protocolo.getCapaProcesso().should("contain.text", "CAPA")
        cy.location('pathname').should('include', 'capa/mostrar')

        paramNomeArquivo.forEach(($arquivo, $i) => {
            protocolo.getItemJuntada($i+1).click()
            protocolo.getNavegacaoJuntada().should("contain.text", Cypress._.toUpper($arquivo))
            cy.location('pathname').should('include', 'visualizar/0-'+$i)
        })
    })

})
