import {atividade as atividadeSchema} from './base.schema';
import {especieAtividade} from './base.schema';
import {setor} from './base.schema';
import {usuario} from './base.schema';
import {tarefa} from './base.schema';

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
