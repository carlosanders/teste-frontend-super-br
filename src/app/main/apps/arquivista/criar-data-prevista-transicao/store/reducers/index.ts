import {DataPrevistaTransicaoReducer, DataPrevistaTransicaoState} from './criar-data-prevista-transicao.reducers';
import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';

export interface DataPrevistaTransicaoAppState {
    dataPrevistaTransicao: DataPrevistaTransicaoState;
}

export const getDataPrevistaTransicaoAppState = createFeatureSelector<DataPrevistaTransicaoAppState>('app-criar-data-prevista-transicao');

export const getAppState = createSelector(
    getDataPrevistaTransicaoAppState,
    (state: DataPrevistaTransicaoAppState) => state
);

export const reducers: ActionReducerMap<DataPrevistaTransicaoAppState> = {
    dataPrevistaTransicao: DataPrevistaTransicaoReducer
};

export * from './criar-data-prevista-transicao.reducers';