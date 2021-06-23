import {ValidacaoTransicaoWorkflowEditEffect} from './validacao-transicao-workflow-edit.effects';
import {TipoValidacaoWorkflowEffects} from './tipo-validacao-workflow.effects';

export const effects = [
    ValidacaoTransicaoWorkflowEditEffect,
    TipoValidacaoWorkflowEffects
];

export * from './tipo-validacao-workflow.effects';
export * from './validacao-transicao-workflow-edit.effects';
