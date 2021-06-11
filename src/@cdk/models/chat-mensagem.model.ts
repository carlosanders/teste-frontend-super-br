import * as moment from 'moment';
import {Exclude, Transform, Type} from 'class-transformer';

import {ComponenteDigital, Usuario} from '@cdk/models';
import {Chat} from "./chat.model";

export class ChatMensagem {

    id?: number;

    @Exclude({ toPlainOnly: true })
    uuid?: string;

    mensagem?: string;

    @Type(() => Usuario)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    usuario?: Usuario;

    @Type(() => Usuario)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    usuarioTo?: Usuario;

    @Type(() => ChatMensagem)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    replyTo?: ChatMensagem;

    @Type(() => ComponenteDigital)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    componenteDigital?: ComponenteDigital;

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
        this.mensagem = null;
        this.usuario = null;
        this.usuarioTo = null;
        this.replyTo = null;
        this.componenteDigital = null;
        this.chat = null;
        this.criadoPor = null;
        this.criadoEm = null;
        this.atualizadoPor = null;
        this.atualizadoEm = null;
        this.apagadoPor = null;
        this.apagadoEm = null;
    }

}
