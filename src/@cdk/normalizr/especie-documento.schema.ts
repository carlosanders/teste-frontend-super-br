import {schema} from '@cdk/normalizr-src';
import {usuario} from './usuario.schema';
import {generoDocumento} from './genero-documento.schema';

export const especieDocumento = new schema.Entity('especieDocumento', {
    generoDocumento: generoDocumento,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
