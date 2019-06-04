import {schema} from '@cdk/normalizr-src';
import {usuario} from './usuario.schema';

export const role = new schema.Entity('role', {
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
