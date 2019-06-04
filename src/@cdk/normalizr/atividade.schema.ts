import {schema} from '@cdk/normalizr-src';
import {especieAtividade} from './especie-atividade.schema';
import {setor} from './setor.schema';
import {tarefa} from './tarefa.schema';
import {usuario} from './usuario.schema';

export const atividade = new schema.Entity('atividade', {
    especieAtividade: especieAtividade,
    setor: setor,
    usuario: usuario,
    tarefa: tarefa,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
