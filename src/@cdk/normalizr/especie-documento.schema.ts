import {usuario} from './index.schema';
import {generoDocumento} from './index.schema';
import {especieDocumento as especieDocumentoSchema} from './index.schema';

especieDocumentoSchema.define({
    generoDocumento: generoDocumento,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const especieDocumento = especieDocumentoSchema;
