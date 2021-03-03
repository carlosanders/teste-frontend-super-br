import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { AcaoTriggerReducer, AcaoTriggerState } from './acao-trigger.reducer';

export interface AcaoTriggerAppState
{
    modalidadeAcaoEtiqueta: AcaoTriggerState;
}

export const getAcaoTriggerAppState = createFeatureSelector<AcaoTriggerAppState>(
    'coordenador-acao-edit-trigger-app'
);

export const getAppState = createSelector(
    getAcaoTriggerAppState,
    (state: AcaoTriggerAppState) => state
);

export const reducers: ActionReducerMap<AcaoTriggerAppState> = {
    modalidadeAcaoEtiqueta: AcaoTriggerReducer
};

export * from './acao-trigger.reducer';
