import {AtividadeCreateDocumentosEffect} from './documentos.effects';
import {ComponentesDigitaisEffects} from './componentes-digitais.effects';

export const effects = [
    AtividadeCreateDocumentosEffect,
    ComponentesDigitaisEffects
];

export * from './documentos.effects';
export * from './componentes-digitais.effects';
