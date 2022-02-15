import * as moment from 'moment';
import {Exclude, Transform, Type} from 'class-transformer';

import {
    Documento,
    ModalidadeAlvoInibidor,
    ModalidadeTipoInibidor,
    Modelo,
    OrigemDados,
    TipoDocumento,
    Usuario
} from '@cdk/models';

import {Subscription} from 'rxjs';
import {Processo} from './processo.model';
import {Tarefa} from './tarefa.model';
import {DocumentoAvulso} from './documento-avulso.model';

export class ComponenteDigital {

    @Exclude({toPlainOnly: true})
    id?: number;

    @Exclude({toPlainOnly: true})
    uuid?: string;

    editavel?: boolean;

    convertidoPdf?: boolean;

    @Exclude({toPlainOnly: true})
    assinado?: boolean;

    @Exclude({toPlainOnly: true})
    unsafe?: boolean;

    @Exclude({toPlainOnly: true})
    hasBookmark?: boolean;

    fileName?: string;

    @Exclude({toPlainOnly: true})
    highlights?: string;

    numeracaoSequencial?: number;

    conteudo?: string;

    tamanho?: number;

    nivelComposicao?: number;

    softwareCriacao?: string;

    chaveInibidor?: string;

    versaoSoftwareCriacao?: string;

    mimetype?: string;

    extensao?: string;

    hash?: string;

    usernameLockEdicao?: string;

    failUpload?: boolean;

    @Exclude({toPlainOnly: true})
    statusVerificacaoVirus?: number;

    @Transform(value => value ? value.format() : null, {toPlainOnly: true})
    @Transform(value => value ? moment(value) : null, {toClassOnly: true})
    dataHoraSoftwareCriacao?: moment.Moment;

    @Transform(value => value ? value.format() : null, {toPlainOnly: true})
    @Transform(value => value ? moment(value) : null, {toClassOnly: true})
    dataHoraLockEdicao?: moment.Moment;

    @Type(() => ModalidadeAlvoInibidor)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    modalidadeAlvoInibidor?: ModalidadeAlvoInibidor;

    @Type(() => ModalidadeTipoInibidor)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    modalidadeTipoInibidor?: ModalidadeTipoInibidor;

    @Type(() => ComponenteDigital)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    componenteDigitalOrigem?: ComponenteDigital;

    @Type(() => Modelo)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    modelo?: Modelo;

    @Type(() => Documento)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    documento?: Documento;

    @Type(() => Processo)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    processoOrigem?: Processo;

    @Type(() => Documento)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    documentoOrigem?: Documento;

    @Type(() => Tarefa)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    tarefaOrigem?: Tarefa;

    @Type(() => Tarefa)
    @Transform(value => value ? value.map(d => d.id) : null, { toPlainOnly: true })
    tarefaOrigemBloco?: Tarefa[];

    @Type(() => DocumentoAvulso)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    documentoAvulsoOrigem?: DocumentoAvulso;

    @Type(() => DocumentoAvulso)
    @Transform(value => value ? value.map(d => d.id) : null, { toPlainOnly: true })
    documentoAvulsoOrigemBloco?: DocumentoAvulso[];

    @Exclude({toPlainOnly: true})
    @Type(() => OrigemDados)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    origemDados?: OrigemDados;

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

    @Exclude()
    file?: any;
    @Exclude()
    state?: string;
    @Exclude()
    inProgress?: boolean;
    @Exclude()
    progress?: number;
    @Exclude()
    canRetry?: boolean;
    @Exclude()
    errorMsg?: string;
    @Exclude()
    canCancel?: boolean;
    @Exclude()
    complete?: boolean;
    @Exclude()
    sub?: Subscription;

    @Type(() => TipoDocumento)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    tipoDocumento?: TipoDocumento;

    constructor() {
        this.id = null;
        this.uuid = null;
        this.fileName = null;
        this.hash = null;
        this.numeracaoSequencial = null;
        this.conteudo = null;
        this.tamanho = null;
        this.highlights = null;
        this.nivelComposicao = null;
        this.softwareCriacao = null;
        this.chaveInibidor = null;
        this.dataHoraSoftwareCriacao = null;
        this.versaoSoftwareCriacao = null;
        this.mimetype = null;
        this.dataHoraLockEdicao = null;
        this.usernameLockEdicao = null;
        this.extensao = null;
        this.processoOrigem = null;
        this.documentoOrigem = null;
        this.tarefaOrigem = null;
        this.documentoAvulsoOrigem = null;
        this.editavel = null;
        this.convertidoPdf = null;
        this.assinado = null;
        this.unsafe = null;
        this.hasBookmark = null;
        this.modalidadeAlvoInibidor = null;
        this.modalidadeTipoInibidor = null;
        this.componenteDigitalOrigem = null;
        this.modelo = null;
        this.documento = null;
        this.origemDados = null;
        this.origemDados = null;
        this.criadoPor = null;
        this.criadoEm = null;
        this.atualizadoPor = null;
        this.atualizadoEm = null;
        this.apagadoPor = null;
        this.apagadoEm = null;
        this.file = null;
        this.state = null;
        this.inProgress = null;
        this.progress = null;
        this.canRetry = null;
        this.errorMsg = null;
        this.canCancel = null;
        this.sub = null;
        this.complete = null;
        this.tipoDocumento = null;
        this.statusVerificacaoVirus = null;
    }
}
