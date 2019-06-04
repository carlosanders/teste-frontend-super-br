import {schema} from '@cdk/normalizr-src';
import {usuario} from './usuario.schema';

export const generoTarefa = new schema.Entity('generoTarefa', {
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

