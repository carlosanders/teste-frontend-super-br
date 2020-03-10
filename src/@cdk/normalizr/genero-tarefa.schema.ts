import {usuario} from './index.schema';
import {generoTarefa as generoTarefaSchema} from './index.schema';

generoTarefaSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const generoTarefa = generoTarefaSchema;

