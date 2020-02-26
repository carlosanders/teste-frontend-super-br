import {generoProcesso} from './base.schema';
import {usuario} from './base.schema';
import {especieProcesso as especieProcessoSchema} from './base.schema';

especieProcessoSchema.define({
    generoProcesso: generoProcesso,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const especieProcesso = especieProcessoSchema;
