import {schema} from '@cdk/normalizr-src';
import {usuario} from './usuario.schema';

export const generoProcesso = new schema.Entity('generoProcesso', {
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
