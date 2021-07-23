import * as moment from 'moment';
import {Exclude, Transform, Type} from 'class-transformer';

import {ComponenteDigital, Usuario} from '@cdk/models';
import {ChatParticipante} from "./chat-participante.model";
import {ChatMensagem} from "./chat-mensagem.model";

export class Chat {

    id?: number;

    @Exclude({ toPlainOnly: true })
    uuid?: string;

    nome?: string;

    descricao?: string;

    ativo?: boolean;

    grupo?: boolean;

    @Exclude({ toPlainOnly: true })
    chatParticipante?: ChatParticipante;

    @Type(() => ComponenteDigital)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    capa: ComponenteDigital;

    @Type(() => ChatParticipante)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    participantes: ChatParticipante[];

    @Exclude({ toPlainOnly: true })
    @Type(() => ChatMensagem)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    ultimaMensagem?: ChatMensagem;

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
        this.chatParticipante = null;
        this.nome = null;
        this.descricao = null;
        this.ativo = null;
        this.grupo = null;
        this.participantes = [];
        this.capa = null;
        this.ultimaMensagem = null;
        this.criadoPor = null;
        this.criadoEm = null;
        this.atualizadoPor = null;
        this.atualizadoEm = null;
        this.apagadoPor = null;
        this.apagadoEm = null;
    }

}
