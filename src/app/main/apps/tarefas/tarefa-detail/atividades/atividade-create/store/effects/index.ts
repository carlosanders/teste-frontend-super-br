import { AtividadeCreateEffect } from './atividade-create.effects';
import { AtividadeCreateDocumentosEffect } from './documentos.effects';
import {FavoritoEffect} from "./favorito-list.effects";

export const effects = [
    AtividadeCreateEffect,
    AtividadeCreateDocumentosEffect,
    FavoritoEffect
];

export * from './atividade-create.effects';
export * from './documentos.effects';
export * from './favorito-list.effects';