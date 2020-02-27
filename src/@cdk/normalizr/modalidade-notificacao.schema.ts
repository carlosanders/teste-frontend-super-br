import {usuario} from './usuario.schema';
import {modalidadeNotificacao as modalidadeNotificacaoSchema} from './base.schema';

modalidadeNotificacaoSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const modalidadeNotificacao = modalidadeNotificacaoSchema;
