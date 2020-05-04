import {schema} from '@cdk/normalizr-src';

export const acao = new schema.Entity('acao');
export const afastamento = new schema.Entity('afastamento');
export const areaTrabalho = new schema.Entity('area-trabalho');
export const assinatura = new schema.Entity('assinatura');
export const assuntoAdministrativo = new schema.Entity('assunto-administrativo');
export const assunto = new schema.Entity('assunto');
export const atividade = new schema.Entity('atividade');
export const base = new schema.Entity('base');
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
export const documentoVinculado = new schema.Entity('documento-vinculado');
export const endereco = new schema.Entity('endereco');
export const especieAtividade = new schema.Entity('especie-atividade');
export const especieDocumentoAvulso = new schema.Entity('especie-documento-avulso');
export const especieDocumento = new schema.Entity('especie-documento');
export const especieProcesso = new schema.Entity('especie-processo');
export const especieRelevancia = new schema.Entity('especie-relevancia');
export const especieSetor = new schema.Entity('especie-setor');
export const especieTarefa = new schema.Entity('especie-tarefa');
export const estado = new schema.Entity('estado');
export const etiqueta = new schema.Entity('etiqueta');
export const favorito = new schema.Entity('favorito');
export const feriado = new schema.Entity('feriado');
export const folder = new schema.Entity('folder');
export const generoAtividade = new schema.Entity('genero-atividade');
export const generoDocumentoAvulso = new schema.Entity('genero-documento-avulso');
export const generoDocumento = new schema.Entity('genero-documento');
export const generoProcesso = new schema.Entity('genero-processo');
export const generoRelevancia = new schema.Entity('genero-relevancia');
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
export const repositorio = new schema.Entity('repositorio');
export const representante = new schema.Entity('representante');
export const setor = new schema.Entity('setor');
export const sigilo = new schema.Entity('sigilo');
export const tarefa = new schema.Entity('tarefa');
export const template = new schema.Entity('template');
export const tipoDocumento = new schema.Entity('tipo-documento-list');
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
export const vinculacaoOrgaoCentralUsuario = new schema.Entity('vinculacao-orgao-central-usuario');
export const vinculacaoUsuario = new schema.Entity('vinculacao-usuario');
export const visibilidade = new schema.Entity('visibilidade');
export const volume = new schema.Entity('volume');
export const vinculacaoPessoaUsuario = new schema.Entity('vinculacao-pessoa-usuario');
export const vinculacaoSetorMunicipio = new schema.Entity('vinculacao-setor-municipio');