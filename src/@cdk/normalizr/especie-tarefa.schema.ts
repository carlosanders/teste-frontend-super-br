import {generoTarefa} from './base.schema';
import {usuario} from './base.schema';
import {especieTarefa as especieTarefaSchema} from './base.schema';

especieTarefaSchema.define({
    generoTarefa: generoTarefa,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const especieTarefa = especieTarefaSchema;

