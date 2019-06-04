import {schema} from '@cdk/normalizr-src';
import {usuario} from './usuario.schema';

export const modalidadeNotificacao = new schema.Entity('modalidadeNotificacao', {
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
