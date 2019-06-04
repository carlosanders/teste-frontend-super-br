import {schema} from '@cdk/normalizr-src';
import {vinculacaoEtiqueta} from './vinculacao-etiqueta.schema';
import {folder} from './folder.schema';
import {setor} from './setor.schema';
import {usuario} from './usuario.schema';
import {processo} from './processo.schema';
import {especieTarefa} from './especie-tarefa.schema';

export const tarefa = new schema.Entity('tarefa', {
    processo: processo,
    especieTarefa: especieTarefa,
    usuarioResponsavel: usuario,
    setorOrigem: setor,
    setorResponsavel: setor,
    usuarioConclusaoPrazo: usuario,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario,
    folder: folder,
    vinculacoesEtiquetas: [vinculacaoEtiqueta]
});
