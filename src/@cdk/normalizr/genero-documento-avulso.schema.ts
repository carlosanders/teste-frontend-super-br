import {schema} from '@cdk/normalizr-src';
import {usuario} from './usuario.schema';

export const generoDocumentoAvulso = new schema.Entity('generoDocumentoAvulso', {
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
