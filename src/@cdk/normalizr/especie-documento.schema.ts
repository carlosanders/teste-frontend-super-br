import {usuario} from './usuario.schema';
import {generoDocumento} from './genero-documento.schema';
import {especieDocumento as especieDocumentoSchema} from './base.schema';

especieDocumentoSchema.define({
    generoDocumento: generoDocumento,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const especieDocumento = especieDocumentoSchema;
