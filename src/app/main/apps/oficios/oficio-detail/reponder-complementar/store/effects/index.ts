import { ResponderComplementarEffect } from './responder-complementar.effects';
import { RespostaComplementarDocumentosEffect } from './documentos.effects';

export const effects = [
    ResponderComplementarEffect,
    RespostaComplementarDocumentosEffect
];

export * from './responder-complementar.effects';
export * from './documentos.effects';
