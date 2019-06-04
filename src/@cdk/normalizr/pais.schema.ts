import {schema} from '@cdk/normalizr-src';
import {usuario} from './usuario.schema';

export const pais = new schema.Entity('pais', {
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

