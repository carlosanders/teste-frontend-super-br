import {ComponenteDigitalEffects} from './componentes-digitais.effects';
import {DocumentoAvulsoEditEffects} from './documento-avulso-edit.effects';
import {DocumentosVinculadosEffects} from './documentos-vinculados.effects';
import {DocumentosEffects} from './documentos.effects';

export const effects = [
    ComponenteDigitalEffects,
    DocumentoAvulsoEditEffects,
    DocumentosVinculadosEffects,
    DocumentosEffects,
];

export * from './componentes-digitais.effects';
export * from './documento-avulso-edit.effects';
export * from './documentos-vinculados.effects';
export * from './documentos.effects';
