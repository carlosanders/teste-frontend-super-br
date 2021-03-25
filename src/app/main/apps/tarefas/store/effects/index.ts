import { TarefasEffect } from './tarefas.effects';
import { FoldersEffect } from './folders.effects';
import { LotacaoListEffect } from './lotacao.effects';


export const effects = [
    TarefasEffect,
    FoldersEffect,
    LotacaoListEffect
];

export * from './tarefas.effects';
export * from './folders.effects';
export * from './lotacao.effects';

