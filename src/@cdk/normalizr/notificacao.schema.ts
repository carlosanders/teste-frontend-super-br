import {usuario} from './index.schema';
import {modalidadeNotificacao} from './index.schema';
import {notificacao as notificacaoSchema} from './index.schema';

notificacaoSchema.define({
    remetente: usuario,
    destinatario: usuario,
    modalidadeNotificacao: modalidadeNotificacao,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const notificacao = notificacaoSchema;
