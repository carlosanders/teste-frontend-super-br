import {usuario} from './index.schema';
import {generoDocumentoAvulso} from './index.schema';
import {especieDocumentoAvulso as especieDocumentoAvulsoSchema} from './index.schema';

especieDocumentoAvulsoSchema.define({
    generoDocumentoAvulso: generoDocumentoAvulso,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const especieDocumentoAvulso = especieDocumentoAvulsoSchema;
