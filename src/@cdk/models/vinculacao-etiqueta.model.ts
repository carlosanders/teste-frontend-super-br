import * as moment from 'moment';
import {Exclude, Transform, Type} from 'class-transformer';

import {
    Documento,
    DocumentoAvulso,
    Etiqueta,
    ModalidadeOrgaoCentral,
    Processo,
    Setor,
    Tarefa,
    Usuario
} from '@cdk/models';
import {Relatorio} from './relatorio.model';

export class VinculacaoEtiqueta {

    @Exclude({ toPlainOnly: true })
    id?: number;

    @Exclude({ toPlainOnly: true })
    uuid?: string;

    conteudo?: string;

    @Exclude({ toPlainOnly: true })
    label?: string;

    @Exclude({ toPlainOnly: true })
    objectClass?: string;

    @Exclude({ toPlainOnly: true })
    objectUuid?: string;

    @Exclude({ toPlainOnly: true })
    extensionObjectClass?: string;

    @Exclude({ toPlainOnly: true })
    extensionObjectUuid?: string;

    @Exclude({ toPlainOnly: true })
    objectId?: number;

    @Exclude({ toPlainOnly: true })
    @Transform(value => value ? JSON.parse(value) : {}, {toClassOnly: true})
    objectContext?: any;

    privada?: boolean;

    @Transform(value => value ? value.format() : null, {toPlainOnly: true})
    @Transform(value => value ? moment(value) : null, {toClassOnly: true})
    dataHoraExpiracao?: moment.Moment;

    @Type(() => Etiqueta)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    etiqueta?: Etiqueta;

    @Type(() => Tarefa)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    tarefa?: Tarefa;

    @Type(() => Documento)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    documento?: Documento;

    @Type(() => Processo)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    processo?: Processo;

    @Type(() => Relatorio)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    relatorio?: Relatorio;

    @Type(() => DocumentoAvulso)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    documentoAvulso?: DocumentoAvulso;

    @Type(() => Usuario)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    usuario?: Usuario;

    @Type(() => Setor)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    setor?: Setor;

    @Type(() => Setor)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    unidade?: Setor;

    @Type(() => ModalidadeOrgaoCentral)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    modalidadeOrgaoCentral?: ModalidadeOrgaoCentral;

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
    @Transform(value => value ? value.format() : null, { toPlainOnly: true })
    @Transform(value => value ? moment(value) : null, { toClassOnly: true })
    dataHoraAprovacaoSugestao?: moment.Moment;

    @Exclude({ toPlainOnly: true })
    sugestao?: boolean;

    @Exclude({ toPlainOnly: true })
    @Type(() => Usuario)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    usuarioAprovacaoSugestao?: Usuario;

    @Exclude({toPlainOnly: true})
    podeAlterarConteudo?: boolean;

    @Exclude({toPlainOnly: true})
    podeExcluir?: boolean;

    @Exclude({toClassOnly: true})
    @Transform(value => value ? JSON.stringify(value) : null, { toPlainOnly: true })
    @Transform(value => value ? JSON.parse(value) : [], {toClassOnly: true})
    acoesExecucaoSugestao?: number[];

    constructor() {
        this.id = null;
        this.uuid = null;
        this.etiqueta = null;
        this.conteudo = null;
        this.privada = null;
        this.dataHoraExpiracao = null;
        this.tarefa = null;
        this.documento = null;
        this.processo = null;
        this.documentoAvulso = null;
        this.usuario = null;
        this.setor = null;
        this.unidade = null;
        this.modalidadeOrgaoCentral = null;
        this.criadoPor = null;
        this.criadoEm = null;
        this.atualizadoPor = null;
        this.atualizadoEm = null;
        this.apagadoPor = null;
        this.apagadoEm = null;
        this.podeAlterarConteudo = null;
        this.podeExcluir = null;
        this.label = null;
        this.objectClass = null;
        this.objectUuid = null;
        this.objectId = null;
        this.objectContext = {};
        this.relatorio = null;
        this.acoesExecucaoSugestao = [];
        this.extensionObjectClass = null;
        this.extensionObjectUuid = null;
    }
}
