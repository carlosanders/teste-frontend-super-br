import {generoTarefa} from './genero-tarefa.schema';
import {usuario} from './usuario.schema';
import {especieTarefa as especieTarefaSchema} from './base.schema';

especieTarefaSchema.define({
    generoTarefa: generoTarefa,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const especieTarefa = especieTarefaSchema;

