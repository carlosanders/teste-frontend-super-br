import {usuario} from './base.schema';
import {generoDocumento as generoDocumentoSchema} from './base.schema';

generoDocumentoSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const generoDocumento = generoDocumentoSchema;
