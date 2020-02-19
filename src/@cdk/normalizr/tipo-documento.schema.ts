import {usuario} from './usuario.schema';
import {especieDocumento} from './especie-documento.schema';
import {tipoDocumento as tipoDocumentoSchema} from './base.schema';

tipoDocumentoSchema.define({
    especieDocumento: especieDocumento,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const tipoDocumento = tipoDocumentoSchema;
