import {schema} from '@cdk/normalizr-src';
import {setor} from './setor.schema';
import {usuario} from './usuario.schema';
import {especieAtividade} from './especie-atividade.schema';
import {especieTarefa} from './especie-tarefa.schema';

export const favorito = new schema.Entity('favorito', {
    especieAtividade: especieAtividade,
    setorResponsavel: setor,
    usuario: usuario,
    especieTarefa: especieTarefa,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
