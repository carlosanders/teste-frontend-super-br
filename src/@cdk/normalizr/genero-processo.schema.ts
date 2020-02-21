import {usuario} from './base.schema';
import {generoProcesso as generoProcessoSchema} from './base.schema';

generoProcessoSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const generoProcesso = generoProcessoSchema;
