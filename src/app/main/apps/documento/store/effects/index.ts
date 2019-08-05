import { DocumentoEffect } from './documento.effects';
import { DocumentosVinculadosEffect } from './documentos-vinculados.effects';
import { ComponenteDigitalEffect } from './componentes-digitais.effects';

export const effects = [
    DocumentoEffect,
    DocumentosVinculadosEffect,
    ComponenteDigitalEffect
];

export * from './documento.effects';
export * from './documentos-vinculados.effects';
export * from './componentes-digitais.effects';
