import {schema} from '@cdk/normalizr-src';
import {usuario} from './usuario.schema';

export const generoRelevancia = new schema.Entity('generoRelevancia', {
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
