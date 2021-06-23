import {TarefaCreateEffect} from './tarefa-create.effects';
import {ProcessoEffect} from './processo.effects';

export const effects = [
    TarefaCreateEffect,
    ProcessoEffect
];

export * from './tarefa-create.effects';
export * from './processo.effects';
