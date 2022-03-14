import * as moment from 'moment';
import {Exclude, Transform, Type} from 'class-transformer';

import {EspecieProcesso, EspecieTarefa, GeneroDocumentoAvulso, Usuario, Workflow} from '@cdk/models';

export class EspecieDocumentoAvulso {

    id?: number;

    @Exclude({ toPlainOnly: true })
    uuid?: string;

    nome?: string;

    descricao?: string;

    ativo?: boolean;

    @Type(() => GeneroDocumentoAvulso)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    generoDocumentoAvulso?: GeneroDocumentoAvulso;

    @Type(() => EspecieProcesso)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    especieProcesso?: EspecieProcesso;

    @Type(() => EspecieTarefa)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    especieTarefa?: EspecieTarefa;

    @Type(() => Workflow)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    workflow?: Workflow;

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

    constructor() {
        this.id = null;
        this.uuid = null;
        this.nome = null;
        this.descricao = null;
        this.ativo = null;
        this.especieProcesso = null;
        this.especieTarefa = null;
        this.generoDocumentoAvulso = null;
        this.workflow = null;
        this.criadoPor = null;
        this.criadoEm = null;
        this.atualizadoPor = null;
        this.atualizadoEm = null;
        this.apagadoPor = null;
        this.apagadoEm = null;
    }
}
