import {generoSetor} from './genero-setor.schema';
import {usuario} from './usuario.schema';
import {especieSetor as especieSetorSchema} from './base.schema';

especieSetorSchema.define({
    generoSetor: generoSetor,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const especieSetor = especieSetorSchema;
