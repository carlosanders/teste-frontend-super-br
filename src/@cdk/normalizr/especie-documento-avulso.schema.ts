import {usuario} from './usuario.schema';
import {generoDocumentoAvulso} from './genero-documento-avulso.schema';
import {especieDocumentoAvulso as especieDocumentoAvulsoSchema} from './base.schema';

especieDocumentoAvulsoSchema.define({
    generoDocumentoAvulso: generoDocumentoAvulso,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const especieDocumentoAvulso = especieDocumentoAvulsoSchema;
