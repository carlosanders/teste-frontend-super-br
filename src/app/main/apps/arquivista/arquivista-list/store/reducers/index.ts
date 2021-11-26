import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {ArquivistaReducer, ArquivistaState} from './arquivista.reducer';
import {ModalidadeTransicaoReducer, ModalidadeTransicaoState} from './modalidade-transicao.reducer';

export interface ArquivistaAppState
{
    arquivista: ArquivistaState;
    modalidadeTransicao: ModalidadeTransicaoState;
}

export const getArquivistaAppState = createFeatureSelector<ArquivistaAppState>(
    'arquivista-app'
);

export const getAppState: any = createSelector(
    getArquivistaAppState,
    (state: ArquivistaAppState) => state
);

export const reducers: ActionReducerMap<ArquivistaAppState> = {
    arquivista: ArquivistaReducer,
    modalidadeTransicao: ModalidadeTransicaoReducer
};

export * from './arquivista.reducer';
export * from './modalidade-transicao.reducer';
