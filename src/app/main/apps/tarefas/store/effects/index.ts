import { TarefasEffect } from './tarefas.effects';
import { FoldersEffect } from './folders.effects';
import { LotacaoListEffect } from './lotacao.effects';
import {SetorEffects} from "./setor.effects";
import {UnidadeEffects} from "./unidade.effects";


export const effects = [
    TarefasEffect,
    FoldersEffect,
    LotacaoListEffect,
    SetorEffects,
    UnidadeEffects
];

export * from './tarefas.effects';
export * from './folders.effects';
export * from './lotacao.effects';
export * from './setor.effects';
export * from './unidade.effects';
