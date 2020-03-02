import {vinculacaoEtiqueta} from './index.schema';
import {folder} from './index.schema';
import {setor} from './index.schema';
import {usuario} from './index.schema';
import {processo} from './index.schema';
import {especieTarefa} from './index.schema';
import {tarefa as tarefaSchema} from './index.schema';

tarefaSchema.define({
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

export const tarefa = tarefaSchema;
