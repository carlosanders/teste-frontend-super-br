import {usuario} from './index.schema';
import {modalidadeNotificacao as modalidadeNotificacaoSchema} from './index.schema';

modalidadeNotificacaoSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const modalidadeNotificacao = modalidadeNotificacaoSchema;
