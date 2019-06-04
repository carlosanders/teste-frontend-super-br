import {schema} from '@cdk/normalizr-src';
import {usuario} from './usuario.schema';

export const tipoSigilo = new schema.Entity('tipoSigilo', {
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
