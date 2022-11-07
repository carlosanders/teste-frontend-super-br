import * as moment from 'moment';
import {Exclude, Transform, Type} from 'class-transformer';

import {
    ComponenteDigital,
    DocumentoAvulso,
    Juntada, ModalidadeCopia,
    Modelo,
    OrigemDados,
    Pessoa,
    Processo,
    Repositorio,
    Setor,
    Sigilo,
    Tarefa,
    TipoDocumento,
    Usuario,
    VinculacaoDocumento,
    VinculacaoEtiqueta
} from '@cdk/models';

export class Documento {

    @Exclude({ toPlainOnly: true })
    id?: number;

    @Exclude({ toPlainOnly: true })
    uuid?: string;

    @Exclude({ toPlainOnly: true })
    numeroUnicoDocumentoFormatado?: string;

    descricaoOutros?: string;

    numeroFolhas?: number;

    outroNumero?: string;

    @Exclude({toPlainOnly: true})
    assinado?: boolean;

    @Exclude({toPlainOnly: true})
    convertidoPdf?: boolean;

    semEfeito?: boolean;

    @Exclude({toPlainOnly: true})
    minuta?: boolean;

    redator?: string;

    destinatario?: string;

    localizadorOriginal?: string;

    localProducao?: string;

    autor?: string;

    observacao?: string;

    copia?: boolean;

    dependenciaSoftware?: string;

    dependenciaHardware?: string;

    @Transform(value => value ? value.format() : null, { toPlainOnly: true })
    @Transform(value => value ? moment(value) : null, { toClassOnly: true })
    dataHoraProducao?: moment.Moment;

    @Type(() => Processo)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    processoOrigem?: Processo;

    @Type(() => Documento)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    documentoOrigem?: Documento;

    @Type(() => Pessoa)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    procedencia?: Pessoa;

    @Type(() => TipoDocumento)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    tipoDocumento?: TipoDocumento;

    @Type(() => Setor)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    setorOrigem?: Setor;

    @Type(() => Tarefa)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    tarefaOrigem?: Tarefa;

    @Type(() => DocumentoAvulso)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    documentoAvulsoComplementacaoResposta?: DocumentoAvulso;

    @Type(() => Juntada)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    juntadaAtual?: Juntada;

    @Exclude({ toPlainOnly: true })
    @Type(() => OrigemDados)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    origemDados?: OrigemDados;

    @Exclude({ toPlainOnly: true })
    @Type(() => DocumentoAvulso)
    documentoAvulsoRemessa?: DocumentoAvulso;

    @Exclude({ toPlainOnly: true })
    @Type(() => Modelo)
    modelo?: Modelo;

    @Exclude({ toPlainOnly: true })
    @Type(() => Repositorio)
    repositorio?: Repositorio;

    @Exclude({ toPlainOnly: true })
    @Type(() => Usuario)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    criadoPor?: Usuario;

    @Exclude({ toPlainOnly: true })
    @Transform(value => value ? value.format() : null, { toPlainOnly: true })
    @Transform(value => value ? moment(value) : null, { toClassOnly: true })
    criadoEm?: moment.Moment;

    @Exclude({ toPlainOnly: true })
    @Type(() => Usuario)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    atualizadoPor?: Usuario;

    @Exclude({ toPlainOnly: true })
    @Transform(value => value ? value.format() : null, { toPlainOnly: true })
    @Transform(value => value ? moment(value) : null, { toClassOnly: true })
    atualizadoEm?: moment.Moment;

    @Exclude({ toPlainOnly: true })
    @Type(() => Usuario)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    apagadoPor?: Usuario;

    @Exclude({ toPlainOnly: true })
    @Transform(value => value ? value.format() : null, { toPlainOnly: true })
    @Transform(value => value ? moment(value) : null, { toClassOnly: true })
    apagadoEm?: moment.Moment;

    @Exclude({ toPlainOnly: true })
    @Type(() => ComponenteDigital)
    componentesDigitais?: ComponenteDigital[];

    @Exclude({ toPlainOnly: true })
    @Type(() => VinculacaoDocumento)
    vinculacoesDocumentos?: VinculacaoDocumento[];

    @Exclude({ toPlainOnly: true })
    @Type(() => VinculacaoDocumento)
    vinculacaoDocumentoPrincipal?: VinculacaoDocumento;

    @Exclude({ toPlainOnly: true })
    estaVinculada?: boolean;
    @Exclude({ toPlainOnly: true })
    temVinculacoes?: boolean;
    @Exclude({ toPlainOnly: true })
    temAnexos?: boolean;

    @Exclude({ toPlainOnly: true })
    @Type(() => Sigilo)
    sigilos?: Sigilo[];

    @Exclude({toPlainOnly: true})
    @Type(() => VinculacaoEtiqueta)
    vinculacoesEtiquetas?: VinculacaoEtiqueta[];

    @Type(() => ModalidadeCopia)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    modalidadeCopia?: ModalidadeCopia;

    acessoRestrito?: boolean;

    acessoNegado?: boolean;

    constructor() {
        this.id = null;
        this.uuid = null;
        this.numeroFolhas = 0;
        this.dataHoraProducao = null;
        this.outroNumero = null;
        this.semEfeito = false;
        this.estaVinculada = false;
        this.localizadorOriginal = null;
        this.localProducao = null;
        this.autor = null;
        this.assinado = null;
        this.convertidoPdf = null;
        this.processoOrigem = null;
        this.documentoOrigem = null;
        this.redator = null;
        this.destinatario = null;
        this.procedencia = null;
        this.tipoDocumento = null;
        this.descricaoOutros = null;
        this.observacao = null;
        this.copia = null;
        this.setorOrigem = null;
        this.origemDados = null;
        this.tarefaOrigem = null;
        this.documentoAvulsoComplementacaoResposta = null;
        this.numeroUnicoDocumentoFormatado = null;
        this.origemDados = null;
        this.modelo = null;
        this.minuta = null;
        this.juntadaAtual = null;
        this.repositorio = null;
        this.criadoPor = null;
        this.criadoEm = null;
        this.atualizadoPor = null;
        this.atualizadoEm = null;
        this.apagadoPor = null;
        this.apagadoEm = null;
        this.componentesDigitais = [];
        this.vinculacoesDocumentos = [];
        this.documentoAvulsoRemessa = null;
        this.vinculacaoDocumentoPrincipal = null;
        this.vinculacoesEtiquetas = [];
        this.sigilos = [];
        this.modalidadeCopia = null;
        this.acessoRestrito = null;
        this.acessoNegado = null;
        this.dependenciaSoftware = null;
        this.dependenciaHardware = null;
    }
}
