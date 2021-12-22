import {TarefasEffect} from './tarefas.effects';
import {FoldersEffect} from './folders.effects';
import {LotacaoListEffect} from './lotacao.effects';
import {SetorEffects} from './setor.effects';
import {UnidadeEffects} from './unidade.effects';
import {AssinaturasEffects} from './assinaturas.effects';
import {ComponentesDigitaisEffects} from './componentes-digitais.effects';
import {TarefasDocumentosEffects} from './documentos.effects';
import {DocumentosVinculadosEffects} from './documentos-vinculados.effects';

export const effects = [
    TarefasEffect,
    FoldersEffect,
    LotacaoListEffect,
    SetorEffects,
    UnidadeEffects,
    AssinaturasEffects,
    ComponentesDigitaisEffects,
    TarefasDocumentosEffects,
    DocumentosVinculadosEffects
];

export * from './tarefas.effects';
export * from './folders.effects';
export * from './lotacao.effects';
export * from './setor.effects';
export * from './unidade.effects';
export * from './assinaturas.effects';
export * from './componentes-digitais.effects';
export * from './documentos.effects';
export * from './documentos-vinculados.effects';
