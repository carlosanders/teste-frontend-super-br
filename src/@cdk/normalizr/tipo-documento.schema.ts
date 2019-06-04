import {schema} from '@cdk/normalizr-src';
import {usuario} from './usuario.schema';
import {especieDocumento} from './especie-documento.schema';

export const tipoDocumento = new schema.Entity('tipoDocumento', {
    especieDocumento: especieDocumento,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
