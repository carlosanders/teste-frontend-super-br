import {AcaoTransicaoWorkflowEditEffect} from './acao-transicao-workflow-edit.effects';
import {TipoAcaoWorkflowEffects} from './tipo-acao-workflow.effects';

export const effects = [
    AcaoTransicaoWorkflowEditEffect,
    TipoAcaoWorkflowEffects
];

export * from './acao-transicao-workflow-edit.effects';
export * from './tipo-acao-workflow.effects';
