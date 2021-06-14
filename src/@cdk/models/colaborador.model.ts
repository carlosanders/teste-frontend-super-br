import * as moment from 'moment';
import {Exclude, Transform, Type} from 'class-transformer';

import {Cargo, ModalidadeColaborador, Usuario} from '@cdk/models';
import {Lotacao} from './lotacao.model';

export class Colaborador {

    @Exclude({ toPlainOnly: true })
    id?: number;

    @Exclude({ toPlainOnly: true })
    uuid?: string;

    @Type(() => Cargo)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    cargo?: Cargo;

    @Type(() => ModalidadeColaborador)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    modalidadeColaborador?: ModalidadeColaborador;

    @Type(() => Usuario)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    usuario?: Usuario;

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

    @Exclude({toPlainOnly: true})
    @Type(() => Lotacao)
    lotacoes?: Lotacao[];

    ativo: boolean;

    constructor() {
        this.id = null;
        this.uuid = null;
        this.cargo = null;
        this.modalidadeColaborador = null;
        this.usuario = null;
        this.lotacoes = null;
        this.ativo = null;
        this.criadoPor = null;
        this.criadoEm = null;
        this.atualizadoPor = null;
        this.atualizadoEm = null;
        this.apagadoPor = null;
        this.apagadoEm = null;
    }
}
