import {DocumentoEffect} from './documento.effects';
import {RepositoriosEffect} from './repositorios.effects';
import {DocumentosVinculadosEffect} from './documentos-vinculados.effects';
import {ComponenteDigitalEffect} from './componentes-digitais.effects';
import {AssinaturaEffect} from './assinaturas.effects';
import {JuntadasEffects} from './juntadas.effects';

export const effects = [
    DocumentoEffect,
    RepositoriosEffect,
    DocumentosVinculadosEffect,
    ComponenteDigitalEffect,
    AssinaturaEffect,
    JuntadasEffects
];

export * from './documento.effects';
export * from './repositorios.effects';
export * from './documentos-vinculados.effects';
export * from './componentes-digitais.effects';
export * from './assinaturas.effects';
export * from './juntadas.effects';
