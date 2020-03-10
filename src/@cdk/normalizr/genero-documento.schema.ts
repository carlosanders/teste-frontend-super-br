import {usuario} from './index.schema';
import {generoDocumento as generoDocumentoSchema} from './index.schema';

generoDocumentoSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const generoDocumento = generoDocumentoSchema;
