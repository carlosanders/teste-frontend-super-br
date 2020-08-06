import {schema} from '@cdk/normalizr-src';

export const acao = new schema.Entity('acao');
export const afastamento = new schema.Entity('afastamento');
export const areaTrabalho = new schema.Entity('area-trabalho');
export const assinatura = new schema.Entity('assinatura');
export const assuntoAdministrativo = new schema.Entity('assunto-administrativo');
export const assunto = new schema.Entity('assunto');
export const atividade = new schema.Entity('atividade');
export const cadastroIdentificador = new schema.Entity('cadastro-identificador');
export const cargo = new schema.Entity('cargo');
export const classificacao = new schema.Entity('classificacao');
export const colaborador = new schema.Entity('colaborador');
export const compartilhamento = new schema.Entity('compartilhamento');
export const componenteDigital = new schema.Entity('componente-digital');
export const coordenador = new schema.Entity('coordenador');
export const desentranhamento = new schema.Entity('desentranhamento');
export const distribuicao = new schema.Entity('distribuicao');
export const documentoAvulso = new schema.Entity('documento-avulso');
export const documentoIdentificador = new schema.Entity('documento-identificador');
export const documento = new schema.Entity('documento');
export const endereco = new schema.Entity('endereco');
export const especieAtividade = new schema.Entity('especie-atividade');
export const especieDocumentoAvulso = new schema.Entity('especie-documento-avulso');
export const especieDocumento = new schema.Entity('especie-documento');
export const especieProcesso = new schema.Entity('especie-processo');
export const especieRelevancia = new schema.Entity('especie-relevancia');
export const especieRelatorio = new schema.Entity('especie-relatorio');
export const especieSetor = new schema.Entity('especie-setor');
export const especieTarefa = new schema.Entity('especie-tarefa');
export const estado = new schema.Entity('estado');
export const etiqueta = new schema.Entity('etiqueta');
export const favorito = new schema.Entity('favorito');
export const feriado = new schema.Entity('feriado');
export const folder = new schema.Entity('folder');
export const garantia = new schema.Entity('garantia');
export const generoAtividade = new schema.Entity('genero-atividade');
export const generoDocumentoAvulso = new schema.Entity('genero-documento-avulso');
export const generoDocumento = new schema.Entity('genero-documento');
export const generoProcesso = new schema.Entity('genero-processo');
export const generoRelevancia = new schema.Entity('genero-relevancia');
export const generoRelatorio = new schema.Entity('genero-relatorio');
export const generoSetor = new schema.Entity('genero-setor');
export const generoTarefa = new schema.Entity('genero-tarefa');
export const historico = new schema.Entity('historico');
export const interessado = new schema.Entity('interessado');
export const juntada = new schema.Entity('juntada');
export const lembrete = new schema.Entity('lembrete');
export const localizador = new schema.Entity('localizador');
export const lotacao = new schema.Entity('lotacao');
export const modalidadeAfastamento = new schema.Entity('modalidade-afastamento');
export const modalidadeAlvoInibidor = new schema.Entity('modalidade-alvo-inibidor');
export const modalidadeCategoriaSigilo = new schema.Entity('modalidade-categoria-sigilo');
export const modalidadeColaborador = new schema.Entity('modalidade-colaborador');
export const modalidadeDestinacao = new schema.Entity('modalidade-destinacao');
export const modalidadeDocumentoIdentificador = new schema.Entity('modalidade-documento-identificador');
export const modalidadeEtiqueta = new schema.Entity('modalidade-etiqueta');
export const modalidadeFase = new schema.Entity('modalidade-fase');
export const modalidadeFolder = new schema.Entity('modalidade-folder');
export const modalidadeGarantia = new schema.Entity('modalidade-garantia');
export const modalidadeGeneroPessoa = new schema.Entity('modalidade-genero-pessoa');
export const modalidadeInteressado = new schema.Entity('modalidade-interessado');
export const modalidadeMeio = new schema.Entity('modalidade-meio');
export const modalidadeModelo = new schema.Entity('modalidade-modelo');
export const modalidadeNotificacao = new schema.Entity('modalidade-notificacao');
export const modalidadeOrgaoCentral = new schema.Entity('modalidade-orgao-central');
export const modalidadeQualificacaoPessoa = new schema.Entity('modalidade-qualificacao-pessoa');
export const modalidadeRelacionamentoPessoal = new schema.Entity('modalidade-relacionamento-pessoal');
export const modalidadeRepositorio = new schema.Entity('modalidade-repositorio');
export const modalidadeRepresentante = new schema.Entity('modalidade-representante');
export const modalidadeTemplate = new schema.Entity('modalidade-template');
export const modalidadeTipoInibidor = new schema.Entity('modalidade-tipo-inibidor');
export const modalidadeTransicao = new schema.Entity('modalidade-transicao');
export const modalidadeVinculacaoDocumento = new schema.Entity('modalidade-vinculacao-documento');
export const modalidadeVinculacaoProcesso = new schema.Entity('modalidade-vinculacao-processo');
export const modelo = new schema.Entity('modelo');
export const municipio = new schema.Entity('municipio');
export const nome = new schema.Entity('nome');
export const notificacao = new schema.Entity('notificacao');
export const numeroUnicoDocumento = new schema.Entity('numero-unico-documento');
export const origemDados = new schema.Entity('origem-dados');
export const pais = new schema.Entity('pais');
export const pessoa = new schema.Entity('pessoa');
export const processo = new schema.Entity('processo');
export const relacionamentoPessoal = new schema.Entity('relacionamento-pessoal');
export const relevancia = new schema.Entity('relevancia');
export const relatorio = new schema.Entity('relatorio');
export const repositorio = new schema.Entity('repositorio');
export const representante = new schema.Entity('representante');
export const setor = new schema.Entity('setor');
export const sigilo = new schema.Entity('sigilo');
export const tarefa = new schema.Entity('tarefa');
export const template = new schema.Entity('template');
export const tipoDocumento = new schema.Entity('tipo-documento');
export const tipoRelatorio = new schema.Entity('tipo-relatorio');
export const tipoSigilo = new schema.Entity('tipo-sigilo');
export const tramitacao = new schema.Entity('tramitacao');
export const transicao = new schema.Entity('transicao');
export const unidade = new schema.Entity('unidade');
export const usuario = new schema.Entity('usuario');
export const vinculacaoDocumento = new schema.Entity('vinculacao-documento');
export const vinculacaoEtiqueta = new schema.Entity('vinculacao-etiqueta');
export const vinculacaoModelo = new schema.Entity('vinculacao-modelo');
export const vinculacaoProcesso = new schema.Entity('vinculacao-processo');
export const vinculacaoRepositorio = new schema.Entity('vinculacao-repositorio');
export const vinculacaoRole = new schema.Entity('vinculacao-role');
export const vinculacaoUsuario = new schema.Entity('vinculacao-usuario');
export const visibilidade = new schema.Entity('visibilidade');
export const volume = new schema.Entity('volume');
export const vinculacaoPessoaUsuario = new schema.Entity('vinculacao-pessoa-usuario');
export const vinculacaoSetorMunicipio = new schema.Entity('vinculacao-setor-municipio');

acao.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

afastamento.define({
    modalidadeAfastamento: modalidadeAfastamento,
    colaborador: colaborador,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

areaTrabalho.define({
    documento: documento,
    usuario: usuario,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

assinatura.define({
    componenteDigital: componenteDigital,
    origemDados: origemDados,
    usuario: usuario
});

assunto.define({
    assuntoAdministrativo: assuntoAdministrativo,
    processo: processo,
    origemDados: origemDados,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

assuntoAdministrativo.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

atividade.define({
    especieAtividade: especieAtividade,
    setor: setor,
    usuario: usuario,
    tarefa: tarefa,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

cadastroIdentificador.define({
    origemDados: origemDados,
    pessoa: pessoa,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

cargo.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

classificacao.define({
    modalidadeDestinacao: modalidadeDestinacao,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

colaborador.define({
    cargo: cargo,
    modalidadeColaborador: modalidadeColaborador,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

compartilhamento.define({
    usuario: usuario,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

componenteDigital.define({
    origemDados: origemDados,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

coordenador.define({
    orgaoCentral: modalidadeOrgaoCentral,
    setor: setor,
    usuario: usuario,
    unidade: setor,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

desentranhamento.define({
    juntada: juntada,
    processoDestino: processo,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

distribuicao.define({
    tarefa: tarefa,
    documentoAvulso: documento,
    usuarioAnterior: usuario,
    usuarioPosterior: usuario,
    setorAnterior: setor,
    setorPosterior: setor,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

documento.define({
    processoOrigem: processo,
    procedencia: pessoa,
    tipoDocumento: tipoDocumento,
    setorOrigem: setor,
    tarefaOrigem: tarefa,
    documentoAvulsoComplementacaoResposta: documentoAvulso,
    origemDados: origemDados,
    criadoPor: usuario,
    juntadaAtual: juntada,
    atualizadoPor: usuario,
    apagadoPor: usuario,
    vinculacoesEtiquetas: [vinculacaoEtiqueta],
    componentesDigitais: [componenteDigital],
    vinculacoesDocumentos: [vinculacaoDocumento],
    vinculacaoDocumentoPrincipal: vinculacaoDocumento
});

documentoAvulso.define({
    setorOrigem: setor,
    especieDocumentoAvulso: especieDocumentoAvulso,
    modelo: modelo,
    pessoaDestino: pessoa,
    setorDestino: setor,
    documentoResposta: documento,
    documentoRemessa: documento,
    usuarioResponsavel: usuario,
    setorResponsavel: setor,
    usuarioResposta: usuario,
    usuarioRemessa: usuario,
    processo: processo,
    processoDestino: processo,
    tarefaOrigem: tarefa,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

documentoIdentificador.define({
    modalidadeDocumentoIdentificador: modalidadeDocumentoIdentificador,
    origemDados: origemDados,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

endereco.define({
    municipio: municipio,
    pais: pais,
    origemDados: origemDados,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

especieAtividade.define({
    generoAtividade: generoAtividade,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario,
    favoritos: [favorito]
});

especieDocumento.define({
    generoDocumento: generoDocumento,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

especieDocumentoAvulso.define({
    generoDocumentoAvulso: generoDocumentoAvulso,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

especieProcesso.define({
    generoProcesso: generoProcesso,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

especieRelatorio.define({
    generoRelatorio: generoRelatorio,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

especieRelevancia.define({
    generoRelevancia: generoRelevancia,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

especieSetor.define({
    generoSetor: generoSetor,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

especieTarefa.define({
    generoTarefa: generoTarefa,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

estado.define({
    pais: pais,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

etiqueta.define({
    modalidadeEtiqueta: modalidadeEtiqueta,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

favorito.define({
    usuario: usuario,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

feriado.define({
    municipio: municipio,
    estado: estado,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

folder.define({
    modalidadeFolder: modalidadeFolder,
    usuario: usuario,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

garantia.define( {
    processo: processo,
    modalidadeGarantia: modalidadeGarantia,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

generoAtividade.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

generoDocumento.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

generoDocumentoAvulso.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

generoProcesso.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

generoRelatorio.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

generoRelevancia.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

generoSetor.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

generoTarefa.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

historico.define({
    processo: processo,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

interessado.define({
    processo: processo,
    pessoa: pessoa,
    modalidadeInteressado: modalidadeInteressado,
    origemDados: origemDados,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

juntada.define({
    documento: documento,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario,
});

lembrete.define({
    // processo: processo,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

localizador.define({
    setor: setor,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

lotacao.define({
    colaborador: colaborador,
    setor: setor,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

modalidadeAfastamento.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

modalidadeAlvoInibidor.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

modalidadeCategoriaSigilo.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

modalidadeColaborador.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

modalidadeDestinacao.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

modalidadeDocumentoIdentificador.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

modalidadeEtiqueta.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

modalidadeFolder.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

modalidadeGarantia.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

modalidadeGeneroPessoa.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

modalidadeMeio.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

modalidadeModelo.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

modalidadeNotificacao.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

modalidadeOrgaoCentral.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

modalidadeQualificacaoPessoa.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

modalidadeRelacionamentoPessoal.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

modalidadeRepositorio.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

modalidadeRepresentante.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

modalidadeTemplate.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

modalidadeTipoInibidor.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

modalidadeTransicao.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

modalidadeVinculacaoDocumento.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

modalidadeVinculacaoProcesso.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

modelo.define({
    modalidadeModelo: modalidadeMeio,
    template: template,
    documento: documento,
    vinculacaoModelo: vinculacaoModelo,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

municipio.define({
    estado: estado,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

nome.define({
    origemDados: origemDados,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

notificacao.define({
    remetente: usuario,
    destinatario: usuario,
    modalidadeNotificacao: modalidadeNotificacao,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

numeroUnicoDocumento.define({
    tipoDocumento: tipoDocumento,
    setor: setor,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario,
    documento: documento
});

origemDados.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

pais.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

pessoa.define({
    nacionalidade: pais,
    modalidadeGeneroPessoa: modalidadeGeneroPessoa,
    naturalidade: municipio,
    modalidadeQualificacaoPessoa: modalidadeQualificacaoPessoa,
    origemDados: origemDados,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

processo.define({
    classificacao: classificacao,
    origemDados: origemDados,
    processoOrigem: processo,
    documentoAvulsoOrigem: documentoAvulso,
    procedencia: pessoa,
    localizador: localizador,
    setorAtual: setor,
    setorInicial: setor,
    modalidadeFase: modalidadeFase,
    modalidadeMeio: modalidadeMeio,
    especieProcesso: especieProcesso,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario,
    vinculacoesEtiquetas: [vinculacaoEtiqueta],
    lembretes: [lembrete],
    assuntos: [assunto],
    interessados: [interessado]
});

relacionamentoPessoal.define({
    pessoaRelacionada: pessoa,
    modalidadeRelacionamentoPessoal: modalidadeRelacionamentoPessoal,
    origemDados: origemDados,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

relatorio.define({
    tipoRelatorio: tipoRelatorio,
    documento: documento,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario,
    vinculacoesEtiquetas: [vinculacaoEtiqueta]
});

relevancia.define({
    especieRelevancia: especieRelevancia,
    processo: processo,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

repositorio.define({
    modalidadeRepositorio: modalidadeRepositorio,
    documento: documento,
    vinculacaoRepositorio: vinculacaoRepositorio,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

representante.define({
    modalidadeRepresentante: modalidadeRepresentante,
    interessado: interessado,
    origemDados: origemDados,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

setor.define({
    municipio: municipio,
    especieSetor: especieSetor,
    unidade: unidade,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

sigilo.define({
    modalidadeCategoriaSigilo: modalidadeCategoriaSigilo,
    tipoSigilo: tipoSigilo,
    origemDados: origemDados,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

tarefa.define({
    processo: processo,
    especieTarefa: especieTarefa,
    usuarioResponsavel: usuario,
    setorOrigem: setor,
    setorResponsavel: setor,
    usuarioConclusaoPrazo: usuario,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario,
    folder: folder,
    vinculacoesEtiquetas: [vinculacaoEtiqueta]
});

template.define({
    modalidadeTemplate: modalidadeTemplate,
    tipoDocumento: tipoDocumento,
    documento: documento,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

tipoDocumento.define({
    especieDocumento: especieDocumento,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

tipoRelatorio.define({
    especieRelatorio: especieRelatorio,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

tipoSigilo.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

tramitacao.define({
    setorOrigem: setor,
    setorDestino: setor,
    pessoaDestino: pessoa,
    usuarioRecebimento: usuario,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

transicao.define({
    modalidadeTransicao: modalidadeTransicao,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

unidade.define({
    municipio: municipio,
    generoSetor: generoSetor,
    modalidadeOrgaoCentral: modalidadeOrgaoCentral,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

usuario.define({
    colaborador: colaborador
});

vinculacaoDocumento.define({
    documento: documento,
    documentoVinculado: documento,
    modalidadeVinculacaoDocumento: modalidadeVinculacaoDocumento,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

vinculacaoEtiqueta.define({
    etiqueta: etiqueta,
    tarefa: tarefa,
    processo: processo,
    documento: documento,
    criadoPor: usuario,
    atualizadoPor: usuario,
    usuario: usuario,
    apagadoPor: usuario
});

vinculacaoModelo.define({
    modelo: modelo,
    especieSetor: especieSetor,
    orgaoCentral: modalidadeOrgaoCentral,
    setor: setor,
    usuario: usuario,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

vinculacaoPessoaUsuario.define({
    usuario: usuario,
    pessoa: pessoa,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

vinculacaoProcesso.define({
    processoVinculado: processo,
    modalidadeVinculacaoProcesso: modalidadeVinculacaoProcesso,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

vinculacaoRepositorio.define({
    modelo: repositorio,
    especieSetor: especieSetor,
    orgaoCentral: modalidadeOrgaoCentral,
    setor: setor,
    usuario: usuario,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

vinculacaoRole.define({
    usuario: usuario,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

vinculacaoSetorMunicipio.define({
    setor: setor,
    municipio: municipio,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

vinculacaoUsuario.define({
    usuario: usuario,
    usuarioVinculado: usuario,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

visibilidade.define({});

volume.define({
    modalidadeMeio: modalidadeMeio,
    processo: processo,
    origemDados: origemDados,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});