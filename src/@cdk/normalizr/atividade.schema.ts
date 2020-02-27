import {atividade as atividadeSchema} from './base.schema';
import {especieAtividade} from './especie-atividade.schema';
import {setor} from './setor.schema';
import {usuario} from './usuario.schema';
import {tarefa} from './tarefa.schema';

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
