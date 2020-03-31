import { AtividadeCreateEffect } from './atividade-create.effects';
import { AtividadeCreateDocumentosEffect } from './documentos.effects';

export const effects = [
    AtividadeCreateEffect,
    AtividadeCreateDocumentosEffect
];

export * from './atividade-create.effects';
export * from './documentos.effects';
