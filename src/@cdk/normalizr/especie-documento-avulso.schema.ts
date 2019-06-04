import {schema} from '@cdk/normalizr-src';
import {usuario} from './usuario.schema';
import {generoDocumentoAvulso} from './genero-documento-avulso.schema';


export const especieDocumentoAvulso = new schema.Entity('especieDocumentoAvulso', {
    generoDocumentoAvulso: generoDocumentoAvulso,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
