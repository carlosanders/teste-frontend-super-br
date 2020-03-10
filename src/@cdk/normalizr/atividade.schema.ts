import {atividade as atividadeSchema} from './index.schema';
import {especieAtividade} from './index.schema';
import {setor} from './index.schema';
import {usuario} from './index.schema';
import {tarefa} from './index.schema';

atividadeSchema.define({
    especieAtividade: especieAtividade,
    setor: setor,
    usuario: usuario,
    tarefa: tarefa,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const atividade = atividadeSchema;
