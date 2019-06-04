import {schema} from '@cdk/normalizr-src';
import {usuario} from './usuario.schema';

export const generoAtividade = new schema.Entity('generoAtividade', {
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
