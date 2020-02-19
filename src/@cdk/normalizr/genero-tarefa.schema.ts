import {usuario} from './usuario.schema';
import {generoTarefa as generoTarefaSchema} from './base.schema';

generoTarefaSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const generoTarefa = generoTarefaSchema;

