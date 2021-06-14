import {DocumentosVinculadosEffects} from './documentos-vinculados.effects';
import {ComponenteDigitalEffects} from './componentes-digitais.effects';

export const effects = [
    ComponenteDigitalEffects,
    DocumentosVinculadosEffects
];

export * from './documentos-vinculados.effects';
export * from './componentes-digitais.effects';
