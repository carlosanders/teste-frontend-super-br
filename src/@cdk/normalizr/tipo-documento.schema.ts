import {usuario} from './base.schema';
import {especieDocumento} from './base.schema';
import {tipoDocumento as tipoDocumentoSchema} from './base.schema';

tipoDocumentoSchema.define({
    especieDocumento: especieDocumento,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const tipoDocumento = tipoDocumentoSchema;
