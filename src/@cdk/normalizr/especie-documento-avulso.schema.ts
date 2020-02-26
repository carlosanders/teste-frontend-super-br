import {usuario} from './base.schema';
import {generoDocumentoAvulso} from './base.schema';
import {especieDocumentoAvulso as especieDocumentoAvulsoSchema} from './base.schema';

especieDocumentoAvulsoSchema.define({
    generoDocumentoAvulso: generoDocumentoAvulso,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const especieDocumentoAvulso = especieDocumentoAvulsoSchema;
