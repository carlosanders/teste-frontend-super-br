import {schema} from '@cdk/normalizr-src';
import {usuario} from './usuario.schema';

export const generoDocumento = new schema.Entity('generoDocumento', {
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
