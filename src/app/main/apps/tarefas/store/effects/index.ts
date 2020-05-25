import { TarefasEffect } from './tarefas.effects';
import { FoldersEffect } from './folders.effects';
import {FavoritoEffect} from "./favorito-list.effects";

export const effects = [
    TarefasEffect,
    FoldersEffect,
    FavoritoEffect
];

export * from './tarefas.effects';
export * from './folders.effects';
export * from "./favorito-list.effects";