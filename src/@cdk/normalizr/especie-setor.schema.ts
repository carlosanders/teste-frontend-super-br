import {generoSetor} from './base.schema';
import {usuario} from './base.schema';
import {especieSetor as especieSetorSchema} from './base.schema';

especieSetorSchema.define({
    generoSetor: generoSetor,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const especieSetor = especieSetorSchema;
