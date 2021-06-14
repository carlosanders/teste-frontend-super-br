import {AtividadeCreateBlocoEffect} from './atividade-create-bloco.effects';
import {AtividadeCreateBlocoDocumentosEffect} from './documentos.effects';

export const effects = [
    AtividadeCreateBlocoEffect,
    AtividadeCreateBlocoDocumentosEffect
];

export * from './atividade-create-bloco.effects';
export * from './documentos.effects';
