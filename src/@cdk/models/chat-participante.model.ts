import * as moment from 'moment';
import {Type, Transform, Exclude} from 'class-transformer';

import {Usuario} from '@cdk/models';
import {Chat} from "./chat.model";

export class ChatParticipante {

    id?: number;

    @Exclude({ toPlainOnly: true })
    uuid?: string;

    nome?: string;

    descricao?: string;

    administrador?: boolean;

    @Type(() => Usuario)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    usuario?: Usuario;

    @Type(() => Chat)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    chat?: Chat;

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

    constructor() {
        this.id = null;
        this.uuid = null;
        this.nome = null;
        this.descricao = null;
        this.administrador = null;
        this.usuario = null;
        this.chat = null;
        this.criadoPor = null;
        this.criadoEm = null;
        this.atualizadoPor = null;
        this.atualizadoEm = null;
    }

}
