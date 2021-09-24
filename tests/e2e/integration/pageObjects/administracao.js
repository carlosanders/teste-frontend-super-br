class Administracao{

    /**Atributos */
    getAdicionar(){
        return cy.get('.back > .mat-focus-indicator')
    }

    getSituacao(){
        return cy.contains("Ativo")
    }

    getRestricaoAcesso(){
        return cy.contains("Restrição de Acesso")
    }

    getPermissaoUso(){
        return cy.contains("Permissão Uso")
    }

    getNome(){
        return cy.get('input[formcontrolname="nome"]')
    }

    getDescricao(){
        return cy.get('input[formcontrolname="descricao"]')
    }

    getDescricaoTextArea(){
        return cy.get('textarea[formcontrolname="descricao"]')
    }

    getTipoDocumentacao(item){
        return cy.get('mat-select[formcontrolname="tipo"]').click().then(() => {
                    cy.get('.mat-option-text:contains("'+item+'")').click()
                })

    }

    completeUnidade(paramentro){
        return cy.autocomplete('input[formcontrolname="unidade"]', paramentro)
    }

    getTabelaAviso(){
        return cy.get('.responsive-grid table')
    }

    completeModalidadeOrgaoCentral(paramentro){
        return cy.autocomplete('input[formcontrolname="modalidadeOrgaoCentral"]', paramentro)
    }

    getItemEditar(paramentro, acao){
        cy.get('.mat-icon-no-color:contains("'+acao+'")').as('itemEditar')
        return cy.get('.mat-row > .cdk-column-nome:contains("'+paramentro+'")').then(($row) => {
            cy.wrap($row).get('@itemEditar')
        })
    }

    getItemEditarValor(paramentro, acao){
        cy.get('.mat-icon-no-color:contains("'+acao+'")').as('itemEditarValor')
        return cy.get('.mat-row > .cdk-column-valor:contains("'+paramentro+'")').then(($row) => {
            cy.wrap($row).get('@itemEditarValor')
        })

    }

    getFiltrar(){
        return cy.get(".toggle-filter")
    }

    getCodigo(){
        return cy.get('input[formControlName="codigo"]')
    }

    completeModalidadeDestinacao(paramentro){
        return cy.autocomplete('input[formcontrolname="modalidadeDestinacao"]', paramentro)
    }

    completeClassificacaoPai(paramentro){
        return cy.autocomplete('input[formcontrolname="parent"]', paramentro)
    }

    getPrazoGuardaFaseCorrenteDia(){
        return cy.get('input[formControlName="prazoGuardaFaseCorrenteDia"]')
    }

    getPrazoGuardaFaseCorrenteMes(){
        return cy.get('input[formControlName="prazoGuardaFaseCorrenteMes"]')
    }

    getPrazoGuardaFaseCorrenteAno(){
        return cy.get('input[formControlName="prazoGuardaFaseCorrenteAno"]')
    }

    getPrazoGuardaFaseCorrenteEvento(){
        return cy.get('input[formControlName="prazoGuardaFaseCorrenteEvento"]')
    }

    getPrazoGuardaFaseIntermediariaDia(){
        return cy.get('input[formControlName="prazoGuardaFaseIntermediariaDia"]')
    }

    getPrazoGuardaFaseIntermediariaMes(){
        return cy.get('input[formControlName="prazoGuardaFaseIntermediariaMes"]')
    }

    getPrazoGuardaFaseIntermediariaAno(){
        return cy.get('input[formControlName="prazoGuardaFaseIntermediariaAno"]')
    }

    getPrazoGuardaFaseIntermediariaEvento(){
        return cy.get('input[formControlName="prazoGuardaFaseIntermediariaEvento"]')
    }

    getSigla(){
        return cy.get('input[formControlName="sigla"]')
    }

    getPrefixoNUP(){
        return cy.get('input[formControlName="prefixoNUP"]')
    }

    completeModalidadeOrgaoCentral(paramentro){
        return cy.autocomplete('input[formcontrolname="modalidadeOrgaoCentral"]', paramentro)
    }

    completeGenero(paramentro){
        return cy.autocomplete('input[formcontrolname="generoSetor"]', paramentro)
    }

    completeMunicipio(paramentro){
        return cy.autocomplete('input[formcontrolname="municipio"]', paramentro)
    }

    completeGeneroAtividade(paramentro){
        return cy.autocomplete('input[formcontrolname="generoAtividade"]', paramentro)
    }

    completeGeneroProcesso(paramentro){
        return cy.autocomplete('input[formcontrolname="generoProcesso"]', paramentro)
    }

    completeClassificacao(paramentro){
        return cy.autocomplete('input[formcontrolname="classificacao"]', paramentro)
    }

    completeModalidadeMeio(paramentro){
        return cy.autocomplete('input[formcontrolname="modalidadeMeio"]', paramentro)
    }

    getTitulo(){
        return cy.get('input[formControlName="titulo"]')
    }

    completeGeneroRelevancia(paramentro){
        return cy.autocomplete('input[formcontrolname="generoRelevancia"]', paramentro)
    }

    completeGeneroSetor(paramentro){
        return cy.autocomplete('input[formcontrolname="generoSetor"]', paramentro)
    }

    completeGeneroTarefa(paramentro){
        return cy.autocomplete('input[formcontrolname="generoTarefa"]', paramentro)
    }

    getValor(){
        return cy.get('input[formControlName="valor"]')
    }

    getCodigoIBGE(){
        return cy.get('input[formControlName="codigoIBGE"]')
    }

    completeEstado(paramentro){
        return cy.autocomplete('input[formcontrolname="estado"]', paramentro)
    }

    /**Controles */
    salvar(){
        return cy.contains('SALVAR')
    }

    buscar(){
        return cy.contains('Buscar')
    }

    btnInativos(){
        return cy.get('[aria-label="mostrar inativo"]')
    }

}
export default Administracao