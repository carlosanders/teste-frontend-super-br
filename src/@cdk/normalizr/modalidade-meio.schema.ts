import {schema} from '@cdk/normalizr-src';
import {usuario} from './usuario.schema';

export const modalidadeMeio = new schema.Entity('modalidadeMeio', {
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
