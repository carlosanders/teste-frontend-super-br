import {usuario} from './index.schema';
import {especieDocumento} from './index.schema';
import {tipoDocumento as tipoDocumentoSchema} from './index.schema';

tipoDocumentoSchema.define({
    especieDocumento: especieDocumento,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const tipoDocumento = tipoDocumentoSchema;
