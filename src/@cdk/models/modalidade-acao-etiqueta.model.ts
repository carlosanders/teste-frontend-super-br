import * as moment from 'moment';
import {Exclude, Transform, Type} from 'class-transformer';

import {ModalidadeEtiqueta, Usuario} from '@cdk/models';

export class ModalidadeAcaoEtiqueta {

    id?: number;

    @Exclude({ toPlainOnly: true })
    uuid?: string;

    valor?: string;

    descricao?: string;

    trigger?: string;

    @Type(() => ModalidadeEtiqueta)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    modalidadeEtiqueta?: ModalidadeEtiqueta;

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
        this.valor = null;
        this.descricao = null;
        this.trigger = null;
        this.modalidadeEtiqueta = null;
        this.criadoPor = null;
        this.criadoEm = null;
        this.atualizadoPor = null;
        this.atualizadoEm = null;
        this.apagadoPor = null;
        this.apagadoEm = null;
    }
}
