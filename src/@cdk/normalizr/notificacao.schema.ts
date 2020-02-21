import {usuario} from './base.schema';
import {modalidadeNotificacao} from './base.schema';
import {notificacao as notificacaoSchema} from './base.schema';

notificacaoSchema.define({
    remetente: usuario,
    destinatario: usuario,
    modalidadeNotificacao: modalidadeNotificacao,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const notificacao = notificacaoSchema;
