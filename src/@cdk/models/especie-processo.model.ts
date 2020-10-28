import * as moment from 'moment';
import {Type, Transform, Exclude} from 'class-transformer';

import {Classificacao, ModalidadeMeio, Usuario, Workflow} from '@cdk/models';
import { GeneroProcesso } from '@cdk/models';

export class EspecieProcesso {

    id?: number;

    @Exclude({ toPlainOnly: true })
    uuid?: string;

    nome?: string;

    descricao?: string;

    ativo?: boolean;

    @Type(() => GeneroProcesso)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    generoProcesso?: GeneroProcesso;

    @Type(() => ModalidadeMeio)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    modalidadeMeio?: ModalidadeMeio;

    @Type(() => Classificacao)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    classificacao?: Classificacao;

    titulo?: string;

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
    @Type(() => Workflow)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    workflow?: Workflow;

    constructor() {
        this.id = null;
        this.uuid = null;
        this.nome = null;
        this.descricao = null;
        this.ativo = null;
        this.generoProcesso = null;
        this.classificacao = null;
        this.modalidadeMeio = null;
        this.titulo = null;
        this.criadoPor = null;
        this.criadoEm = null;
        this.atualizadoPor = null;
        this.atualizadoEm = null;
        this.apagadoPor = null;
        this.apagadoEm = null;
        this.workflow = null;
    }
}
