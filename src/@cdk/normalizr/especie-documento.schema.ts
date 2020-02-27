import {usuario} from './base.schema';
import {generoDocumento} from './base.schema';
import {especieDocumento as especieDocumentoSchema} from './base.schema';

especieDocumentoSchema.define({
    generoDocumento: generoDocumento,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const especieDocumento = especieDocumentoSchema;
