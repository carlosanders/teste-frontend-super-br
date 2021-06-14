import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';
import {RecebimentoReducer, RecebimentoTramitacaoState} from './recebimento.reducer';

export interface RecebimentoAppState
{
    recebimento: RecebimentoTramitacaoState;
}

export const getRecebimentoAppState = createFeatureSelector<RecebimentoAppState>(
    'recebimento-app'
);


export const reducers: ActionReducerMap<RecebimentoAppState> = {
    recebimento: RecebimentoReducer
};

export * from './recebimento.reducer';
