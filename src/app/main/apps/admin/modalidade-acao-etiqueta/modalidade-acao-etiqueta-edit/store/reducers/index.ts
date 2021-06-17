import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {
    ModalidadeAcaoEtiquetaEditReducer,
    ModalidadeAcaoEtiquetaEditState
} from './modalidade-acao-etiqueta-edit.reducer';

export interface ModalidadeAcaoEtiquetaEditAppState
{
    modalidadeAcaoEtiqueta: ModalidadeAcaoEtiquetaEditState;
}

export const getModalidadeAcaoEtiquetaEditAppState = createFeatureSelector<ModalidadeAcaoEtiquetaEditAppState>(
    'modalidade-acao-etiqueta-edit-app'
);

export const getAppState = createSelector(
    getModalidadeAcaoEtiquetaEditAppState,
    (state: ModalidadeAcaoEtiquetaEditAppState) => state
);

export const reducers: ActionReducerMap<ModalidadeAcaoEtiquetaEditAppState> = {
    modalidadeAcaoEtiqueta: ModalidadeAcaoEtiquetaEditReducer
};

export * from './modalidade-acao-etiqueta-edit.reducer';
