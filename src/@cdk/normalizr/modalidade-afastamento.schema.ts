import {schema} from '@cdk/normalizr-src';
import {usuario} from './usuario.schema';

export const modalidadeAfastamento = new schema.Entity('modalidadeAfastamento', {
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

