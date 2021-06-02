import { ProcessoViewEffect } from './processo-view.effects';
import { ProcessoViewDocumentosEffects } from './documentos.effects';
import { ComponentesDigitaisEffects } from './componentes-digitais.effects';
import { VolumesEffects } from './volumes.effects';

export const effects = [
    ProcessoViewEffect,
    ProcessoViewDocumentosEffects,
    ComponentesDigitaisEffects,
    VolumesEffects
];

export * from './processo-view.effects';
export * from './documentos.effects';
export * from './componentes-digitais.effects';
export * from './volumes.effects';
