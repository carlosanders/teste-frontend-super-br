import { DocumentoEffect } from './documento.effects';
import { DocumentosVinculadosEffect } from './documentos-vinculados.effects';

export const effects = [
    DocumentoEffect,
    DocumentosVinculadosEffect
];

export * from './documento.effects';
export * from './documentos-vinculados.effects';
