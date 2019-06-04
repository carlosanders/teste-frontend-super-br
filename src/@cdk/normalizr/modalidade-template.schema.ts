import {schema} from '@cdk/normalizr-src';
import {usuario} from './usuario.schema';

export const modalidadeTemplate = new schema.Entity('modalidadeTemplate', {
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
