import {schema} from '@cdk/normalizr-src';
import {usuario} from './usuario.schema';
import {modalidadeNotificacao} from './modalidade-notificacao.schema';

export const notificacao = new schema.Entity('notificacao', {
    remetente: usuario,
    destinatario: usuario,
    modalidadeNotificacao: modalidadeNotificacao,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
