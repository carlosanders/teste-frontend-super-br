import { DocumentoEffect } from './documento.effects';
import { RepositoriosEffect } from './repositorios.effects';
import { DocumentoAvulsoEffect } from './documento-avulso.effects';
import { DocumentosVinculadosEffect } from './documentos-vinculados.effects';
import { ComponenteDigitalEffect } from './componentes-digitais.effects';

export const effects = [
    DocumentoEffect,
    RepositoriosEffect,
    DocumentoAvulsoEffect,
    DocumentosVinculadosEffect,
    ComponenteDigitalEffect
];

export * from './documento.effects';
export * from './repositorios.effects';
export * from './documento-avulso.effects';
export * from './documentos-vinculados.effects';
export * from './componentes-digitais.effects';
