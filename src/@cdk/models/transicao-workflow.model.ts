import * as moment from 'moment';
import {Exclude, Transform, Type} from 'class-transformer';

import {EspecieAtividade, EspecieProcesso, EspecieTarefa, Usuario, Workflow} from '@cdk/models';

export class TransicaoWorkflow {

    @Exclude({toPlainOnly: true})
    id?: number;

    @Exclude({toPlainOnly: true})
    uuid?: string;

    @Type(() => Workflow)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    workflow?: Workflow;

    @Type(() => EspecieAtividade)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    especieAtividade?: EspecieAtividade;

    @Type(() => EspecieTarefa)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    especieTarefaFrom?: EspecieTarefa;

    @Type(() => EspecieTarefa)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    especieTarefaTo?: EspecieTarefa;

    @Exclude({toPlainOnly: true})
    @Type(() => Usuario)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    criadoPor?: Usuario;

    @Exclude({toPlainOnly: true})
    @Transform(value => value ? value.format() : null, {toPlainOnly: true})
    @Transform(value => value ? moment(value) : null, {toClassOnly: true})
    criadoEm?: Date;

    @Exclude({toPlainOnly: true})
    @Type(() => Usuario)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    atualizadoPor?: Usuario;

    @Exclude({toPlainOnly: true})
    @Transform(value => value ? value.format() : null, {toPlainOnly: true})
    @Transform(value => value ? moment(value) : null, {toClassOnly: true})
    atualizadoEm?: Date;

    @Exclude({toPlainOnly: true})
    @Type(() => Usuario)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    apagadoPor?: Usuario;

    @Exclude({toPlainOnly: true})
    @Transform(value => value ? value.format() : null, {toPlainOnly: true})
    @Transform(value => value ? moment(value) : null, {toClassOnly: true})
    apagadoEm?: Date;

    constructor() {
        this.id = null;
        this.uuid = null;
        this.workflow = null;
        this.especieAtividade = null;
        this.especieTarefaFrom = null;
        this.especieTarefaTo = null;
        this.criadoPor = null;
        this.criadoEm = null;
        this.atualizadoPor = null;
        this.atualizadoEm = null;
        this.apagadoPor = null;
        this.apagadoEm = null;
    }
}
