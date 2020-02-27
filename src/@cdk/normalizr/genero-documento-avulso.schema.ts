import {usuario} from './base.schema';
import {generoDocumentoAvulso as generoDocumentoAvulsoSchema} from './base.schema';

generoDocumentoAvulsoSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const generoDocumentoAvulso = generoDocumentoAvulsoSchema;
