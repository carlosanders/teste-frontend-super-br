import {AtividadeDocumentoEffects} from './atividade-documento.effects';
import {DocumentosEffects} from './documentos.effects';
import {DocumentosVinculadosEffects} from './documentos-vinculados.effects';
import {ComponenteDigitalEffects} from './componentes-digitais.effects';

export const effects = [
    AtividadeDocumentoEffects,
    ComponenteDigitalEffects,
    DocumentosEffects,
    DocumentosVinculadosEffects,
];

export * from './atividade-documento.effects';
export * from './componentes-digitais.effects';
export * from './documentos.effects';
export * from './documentos-vinculados.effects';
