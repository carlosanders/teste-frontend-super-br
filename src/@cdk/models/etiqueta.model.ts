import * as moment from 'moment';
import {Type, Transform, Exclude} from 'class-transformer';

import {Usuario} from '@cdk/models/usuario.model';
import {ModalidadeEtiqueta} from '@cdk/models/modalidade-etiqueta.model';

export class Etiqueta {

    @Exclude({toPlainOnly: true})
    id?: number;

    @Exclude({toPlainOnly: true})
    uuid?: string;

    nome: string;

    corHexadecimal: string;

    @Type(() => ModalidadeEtiqueta)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    modalidadeEtiqueta: ModalidadeEtiqueta;

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
        this.nome = null;
        this.corHexadecimal = null;
        this.modalidadeEtiqueta = null;
        this.criadoPor = null;
        this.criadoEm = null;
        this.atualizadoPor = null;
        this.atualizadoEm = null;
        this.apagadoPor = null;
        this.apagadoEm = null;
    }
}
