import {usuario} from './usuario.schema';
import {modalidadeNotificacao} from './modalidade-notificacao.schema';
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
