import {usuario} from './index.schema';
import {generoProcesso as generoProcessoSchema} from './index.schema';

generoProcessoSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const generoProcesso = generoProcessoSchema;
