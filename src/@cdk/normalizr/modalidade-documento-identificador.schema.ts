import {schema} from '@cdk/normalizr-src';
import {usuario} from './usuario.schema';

export const modalidadeDocumentoIdentificador = new schema.Entity('modalidadeDocumentoIdentificador', {
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
