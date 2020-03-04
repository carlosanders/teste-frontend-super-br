import {generoTarefa} from './index.schema';
import {usuario} from './index.schema';
import {especieTarefa as especieTarefaSchema} from './index.schema';

especieTarefaSchema.define({
    generoTarefa: generoTarefa,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const especieTarefa = especieTarefaSchema;

