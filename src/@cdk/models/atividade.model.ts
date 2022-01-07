import * as moment from 'moment';
import {Exclude, Transform, Type} from 'class-transformer';

import {Documento, EspecieAtividade, Setor, Tarefa, Usuario} from '@cdk/models';

export class Atividade {

    @Exclude({ toPlainOnly: true })
    id?: number;

    @Exclude({ toPlainOnly: true })
    uuid?: string;

    @Transform(value => value ? value.format('YYYY-MM-DDTHH:mm:ss') : null, { toPlainOnly: true })
    @Transform(value => value ? moment(value) : null, { toClassOnly: true })
    dataHoraConclusao?: moment.Moment;

    observacao?: string;

    encerraTarefa?: boolean;

    destinacaoMinutas?: string;

    @Type(() => EspecieAtividade)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    especieAtividade?: EspecieAtividade;

    @Type(() => Setor)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    setor?: Setor;

    @Type(() => Usuario)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    usuario?: Usuario;

    @Type(() => Usuario)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    usuarioAprovacao?: Usuario;

    @Type(() => Setor)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    setorAprovacao?: Setor;

    @Type(() => Tarefa)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    tarefa?: Tarefa;

    distribuicaoAutomatica?: boolean;

    @Exclude()
    unidadeResponsavel?: Setor;

    @Type(() => Setor)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    setorResponsavel?: Setor;

    @Type(() => Usuario)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    usuarioResponsavel?: Usuario;

    @Type(() => Documento)
    @Transform(value => value ? value.map(d => d.id) : null, { toPlainOnly: true })
    documentos?: Documento[];

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
        this.dataHoraConclusao = null;
        this.observacao = null;
        this.encerraTarefa = null;
        this.destinacaoMinutas = null;
        this.especieAtividade = null;
        this.setor = null;
        this.usuario = null;
        this.usuarioAprovacao = null;
        this.setorAprovacao = null;
        this.tarefa = null;
        this.documentos = null;
        this.criadoPor = null;
        this.criadoEm = null;
        this.atualizadoPor = null;
        this.atualizadoEm = null;
        this.apagadoPor = null;
        this.apagadoEm = null;
    }
}
