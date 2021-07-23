import {ProcessoViewEffect} from './processo-view.effects';
import {ProcessoViewDocumentosEffects} from './documentos.effects';
import {ComponentesDigitaisEffects} from './componentes-digitais.effects';
import {VolumesEffects} from './volumes.effects';
import {DocumentosVinculadosEffects} from './documentos-vinculados.effects';

export const effects = [
    ProcessoViewEffect,
    ProcessoViewDocumentosEffects,
    ComponentesDigitaisEffects,
    VolumesEffects,
    DocumentosVinculadosEffects
];

export * from './processo-view.effects';
export * from './documentos.effects';
export * from './componentes-digitais.effects';
export * from './volumes.effects';
export * from './documentos-vinculados.effects';
