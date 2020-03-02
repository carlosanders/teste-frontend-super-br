import {generoSetor} from './index.schema';
import {usuario} from './index.schema';
import {especieSetor as especieSetorSchema} from './index.schema';

especieSetorSchema.define({
    generoSetor: generoSetor,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const especieSetor = especieSetorSchema;
