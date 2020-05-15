import { TarefaCreateEffect } from './tarefa-create.effects';
import { ProcessoEffect } from './processo.effects';
import {FavoritoEffect} from "./favorito-list.effects";

export const effects = [
    TarefaCreateEffect,
    ProcessoEffect,
    FavoritoEffect
];

export * from './tarefa-create.effects';
export * from './processo.effects';
export * from "./favorito-list.effects";
