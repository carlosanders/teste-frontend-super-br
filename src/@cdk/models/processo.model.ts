import * as moment from 'moment';
import {Exclude, Transform, Type} from 'class-transformer';
import {
    Classificacao,
    Compartilhamento,
    ConfiguracaoNup,
    DocumentoAvulso,
    EspecieProcesso,
    Interessado,
    Lembrete,
    Localizador,
    ModalidadeFase,
    ModalidadeMeio,
    OrigemDados,
    Pessoa,
    Setor,
    Usuario
} from '@cdk/models';
import {VinculacaoEtiqueta} from './vinculacao-etiqueta.model';
import {Assunto} from '@cdk/models/assunto.model';

export class Processo {

    // unidade arquivistica
    static readonly UA_PROCESSO = 1;
    static readonly UA_DOCUMENTO_AVULSO = 2;
    static readonly UA_DOSSIE = 3;

    // tipo protocolo
    static readonly TP_NOVO = 1;
    static readonly TP_INFORMADO = 2;
    static readonly TP_PENDENTE = 3;

    @Exclude({toPlainOnly: true})
    id?: number;

    @Type(() => Processo)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    processoOrigem?: Processo;

    @Exclude({toPlainOnly: true})
    uuid?: string;

    unidadeArquivistica?: number;

    tipoProtocolo?: number;

    NUP?: string;

    @Exclude({toPlainOnly: true})
    NUPFormatado?: string;

    semValorEconomico?: boolean;

    visibilidadeExterna?: boolean;

    @Exclude({toPlainOnly: true})
    acessoNegado?: boolean;

    @Exclude({toPlainOnly: true})
    somenteLeitura?: boolean;

    @Exclude({toPlainOnly: true})
    acessoRestrito?: boolean;

    titulo?: string;

    descricao?: string;

    lembreteArquivista?: string;

    outroNumero?: string;

    requerimento?: string;

    protocoloEletronico?: boolean;

    emTramitacaoExterna?: boolean;

    validaNup?: boolean;

    @Exclude({toPlainOnly: true})
    chaveAcesso?: string;

    valorEconomico?: number;

    @Type(() => Classificacao)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    classificacao?: Classificacao;

    @Exclude({toPlainOnly: true})
    @Type(() => OrigemDados)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    origemDados?: OrigemDados;

    @Exclude({toPlainOnly: true})
    @Type(() => DocumentoAvulso)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    documentoAvulsoOrigem?: DocumentoAvulso;

    @Type(() => Pessoa)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    procedencia?: Pessoa;

    @Type(() => Localizador)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    localizador?: Localizador;

    @Type(() => Setor)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    setorAtual?: Setor;

    @Type(() => Setor)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    setorInicial?: Setor;

    @Transform(value => value ? value.format() : null, {toPlainOnly: true})
    @Transform(value => value ? moment(value) : null, {toClassOnly: true})
    dataHoraAbertura?: moment.Moment;

    @Transform(value => value ? value.format() : null, {toPlainOnly: true})
    @Transform(value => value ? moment(value) : null, {toClassOnly: true})
    dataHoraDesarquivamento?: moment.Moment;

    @Exclude({toPlainOnly: true})
    @Transform(value => value ? value.format() : null, {toPlainOnly: true})
    @Transform(value => value ? moment(value) : null, {toClassOnly: true})
    dataHoraProximaTransicao?: moment.Moment;

    @Transform(value => value ? value.format() : null, { toPlainOnly: true })
    @Transform(value => value ? moment(value) : null, { toClassOnly: true })
    dataHoraPrazoResposta?: moment.Moment;

    @Type(() => ModalidadeFase)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    modalidadeFase?: ModalidadeFase;

    @Type(() => ModalidadeMeio)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    modalidadeMeio?: ModalidadeMeio;

    @Type(() => Lembrete)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    lembretes: Lembrete[];

    @Exclude({toPlainOnly: true})
    @Type(() => VinculacaoEtiqueta)
    vinculacoesEtiquetas?: VinculacaoEtiqueta[];

    @Exclude({toPlainOnly: true})
    @Type(() => Compartilhamento)
    compartilhamentoUsuario?: Compartilhamento;

    @Type(() => EspecieProcesso)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    especieProcesso?: EspecieProcesso;

    @Type(() => ConfiguracaoNup)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    configuracaoNup?: ConfiguracaoNup;

    @Exclude({toPlainOnly: true})
    @Type(() => Usuario)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    criadoPor?: Usuario;

    @Exclude({toPlainOnly: true})
    @Transform(value => value ? value.format() : null, {toPlainOnly: true})
    @Transform(value => value ? moment(value) : null, {toClassOnly: true})
    criadoEm?: moment.Moment;

    @Exclude({toPlainOnly: true})
    @Type(() => Usuario)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    atualizadoPor?: Usuario;

    @Exclude({toPlainOnly: true})
    @Transform(value => value ? value.format() : null, {toPlainOnly: true})
    @Transform(value => value ? moment(value) : null, {toClassOnly: true})
    atualizadoEm?: moment.Moment;

    @Exclude({toPlainOnly: true})
    @Type(() => Usuario)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    apagadoPor?: Usuario;

    @Exclude({toPlainOnly: true})
    @Transform(value => value ? value.format() : null, {toPlainOnly: true})
    @Transform(value => value ? moment(value) : null, {toClassOnly: true})
    apagadoEm?: moment.Moment;

    @Exclude({toPlainOnly: true})
    @Type(() => Assunto)
    assuntos: Assunto[];

    @Exclude({toPlainOnly: true})
    @Type(() => Interessado)
    interessados: Interessado[];

    alterarChave?: boolean;

    @Exclude({ toPlainOnly: true })
    any: any;

    constructor() {
        this.id = null;
        this.processoOrigem = null;
        this.uuid = null;
        this.unidadeArquivistica = null;
        this.tipoProtocolo = null;
        this.descricao = null;
        this.lembreteArquivista = null;
        this.valorEconomico = null;
        this.semValorEconomico = null;
        this.NUP = null;
        this.NUPFormatado = null;
        this.especieProcesso = null;
        this.visibilidadeExterna = null;
        this.dataHoraAbertura = null;
        this.dataHoraDesarquivamento = null;
        this.acessoNegado = null;
        this.somenteLeitura = null;
        this.acessoRestrito = null;
        this.dataHoraProximaTransicao = null;
        this.dataHoraPrazoResposta = null;
        this.titulo = null;
        this.outroNumero = null;
        this.chaveAcesso = null;
        this.modalidadeMeio = null;
        this.modalidadeFase = null;
        this.lembretes = [];
        this.documentoAvulsoOrigem = null;
        this.classificacao = null;
        this.procedencia = null;
        this.localizador = null;
        this.setorAtual = null;
        this.setorInicial = null;
        this.origemDados = null;
        this.criadoPor = null;
        this.criadoEm = null;
        this.atualizadoPor = null;
        this.atualizadoEm = null;
        this.apagadoPor = null;
        this.apagadoEm = null;
        this.vinculacoesEtiquetas = [];
        this.assuntos = [];
        this.interessados = [];
        this.requerimento = null;
        this.protocoloEletronico = null;
        this.emTramitacaoExterna = null;
        this.configuracaoNup = null;
        this.validaNup = null;
        this.alterarChave = null;
        this.compartilhamentoUsuario = null;
    }
}
