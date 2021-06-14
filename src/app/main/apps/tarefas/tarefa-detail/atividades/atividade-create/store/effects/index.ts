import {AtividadeCreateEffect} from './atividade-create.effects';
import {AtividadeCreateDocumentosEffect} from './documentos.effects';
import {ComponentesDigitaisEffects} from './componentes-digitais.effects';

export const effects = [
    AtividadeCreateEffect,
    AtividadeCreateDocumentosEffect,
    ComponentesDigitaisEffects
];

export * from './atividade-create.effects';
export * from './documentos.effects';
export * from './componentes-digitais.effects';
