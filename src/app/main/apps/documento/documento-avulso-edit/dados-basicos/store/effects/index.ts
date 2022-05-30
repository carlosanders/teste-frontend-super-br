import {ComponenteDigitalEffects} from './componentes-digitais.effects';
import {DocumentoAvulsoEditEffects} from './documento-avulso-edit.effects';
import {DocumentosVinculadosEffects} from './documentos-vinculados.effects';

export const effects = [
    ComponenteDigitalEffects,
    DocumentoAvulsoEditEffects,
    DocumentosVinculadosEffects
];

export * from './componentes-digitais.effects';
export * from './documento-avulso-edit.effects';
export * from './documentos-vinculados.effects';
