import {vinculacaoEtiqueta} from './base.schema';
import {folder} from './base.schema';
import {setor} from './base.schema';
import {usuario} from './base.schema';
import {processo} from './base.schema';
import {especieTarefa} from './base.schema';
import {tarefa as tarefaSchema} from './base.schema';

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
