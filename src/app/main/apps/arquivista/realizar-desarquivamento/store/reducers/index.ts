import {RealizarDesarquivamentoReducer, RealizarDesarquivamentoState} from './realizar-desarquivamento.reducer';
import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {ModalidadeDesarquivamentoReducer, ModalidadeDesarquivamentoState} from './modalidade-desarquivamento.reducer';

export interface RealizarDesarquivamentoAppState {
    transicao: RealizarDesarquivamentoState;
    modalidadeDesarquivamento: ModalidadeDesarquivamentoState;
}

export const getRealizarDesarquivamentoAppState = createFeatureSelector<RealizarDesarquivamentoAppState>(
    'realizar-desarquivamento'
);

export const getAppState: any = createSelector(
    getRealizarDesarquivamentoAppState,
    (state: RealizarDesarquivamentoAppState) => state
);

export const reducers: ActionReducerMap<RealizarDesarquivamentoAppState> = {
    transicao: RealizarDesarquivamentoReducer,
    modalidadeDesarquivamento: ModalidadeDesarquivamentoReducer
};

export * from './realizar-desarquivamento.reducer';
export * from './modalidade-desarquivamento.reducer';
