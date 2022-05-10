import {TarefaDetailEffect} from './tarefa-detail.effects';
import {EtiquetaEffect} from './etiqueta.effects';
import {TarefaDetailDocumentosEffects} from './documentos.effects';
import {ComponentesDigitaisEffects} from './componentes-digitais.effects';
import {AssinaturasEffects} from './assinaturas.effects';
import {DocumentosVinculadosEffects} from './documentos-vinculados.effects';

export const effects = [
    TarefaDetailEffect,
    EtiquetaEffect,
    TarefaDetailDocumentosEffects,
    ComponentesDigitaisEffects,
    AssinaturasEffects,
    DocumentosVinculadosEffects,
];

export * from './tarefa-detail.effects';
export * from './etiqueta.effects';
export * from './documentos.effects';
export * from './componentes-digitais.effects';
export * from './assinaturas.effects';
export * from './documentos-vinculados.effects';

