import {usuario} from './index.schema';
import {generoDocumentoAvulso as generoDocumentoAvulsoSchema} from './index.schema';

generoDocumentoAvulsoSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const generoDocumentoAvulso = generoDocumentoAvulsoSchema;
