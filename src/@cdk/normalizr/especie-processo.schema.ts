import {generoProcesso} from './index.schema';
import {usuario} from './index.schema';
import {especieProcesso as especieProcessoSchema} from './index.schema';

especieProcessoSchema.define({
    generoProcesso: generoProcesso,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const especieProcesso = especieProcessoSchema;
