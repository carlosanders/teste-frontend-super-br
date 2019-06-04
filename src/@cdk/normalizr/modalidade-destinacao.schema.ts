import {schema} from '@cdk/normalizr-src';
import {usuario} from './usuario.schema';

export const modalidadeDestinacao = new schema.Entity('modalidadeDestinacao', {
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
