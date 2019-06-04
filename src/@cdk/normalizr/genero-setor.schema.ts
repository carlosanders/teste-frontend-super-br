import {schema} from '@cdk/normalizr-src';
import {usuario} from './usuario.schema';

export const generoSetor = new schema.Entity('generoSetor', {
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

