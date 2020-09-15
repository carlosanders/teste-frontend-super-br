import { DocumentosVinculadosEffects } from './documentos-vinculados.effects';
import { DocumentoEffects } from './documento.effects';
import { ComponenteDigitalEffects } from './componentes-digitais.effects';
import { RepositoriosEffects } from './repositorios.effects';

export const effects = [
    DocumentosVinculadosEffects,
    DocumentoEffects,
    ComponenteDigitalEffects,
    RepositoriosEffects
];

export * from './documentos-vinculados.effects';
export * from './documento.effects';
export * from './repositorios.effects';
export * from './componentes-digitais.effects';
