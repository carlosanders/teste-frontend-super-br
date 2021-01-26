import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import {ModalidadeAcaoEtiquetaListReducer,ModalidadeAcaoEtiquetaListState} from './modalidade-acao-etiqueta-list.reducer';

export interface ModalidadeAcaoEtiquetaListAppState
{
    modalidadeAcaoEtiquetaList: ModalidadeAcaoEtiquetaListState;
}

export const getModalidadeAcaoEtiquetaListAppState = createFeatureSelector<ModalidadeAcaoEtiquetaListAppState>(
    'modalidade-acao-etiqueta-list'
);

export const getAppState = createSelector(
    getModalidadeAcaoEtiquetaListAppState,
    (state: ModalidadeAcaoEtiquetaListAppState) => state
);

export const reducers: ActionReducerMap<ModalidadeAcaoEtiquetaListAppState> = {
    modalidadeAcaoEtiquetaList: ModalidadeAcaoEtiquetaListReducer
};

export * from './modalidade-acao-etiqueta-list.reducer';
