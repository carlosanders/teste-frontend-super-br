import {setor} from './setor.schema';
import {usuario} from './usuario.schema';
import {especieAtividade} from './especie-atividade.schema';
import {especieTarefa} from './especie-tarefa.schema';
import {favorito as favoritoSchema} from './base.schema';

favoritoSchema.define({
    especieAtividade: especieAtividade,
    setorResponsavel: setor,
    usuario: usuario,
    especieTarefa: especieTarefa,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const favorito = favoritoSchema;
