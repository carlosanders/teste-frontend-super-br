import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {AcaoEditReducer, AcaoEditState} from './acao-edit.reducer';
import {ModalidadeAcaoEtiqueraReducer, ModalidadeAcaoEtiquetaState} from './modalidade-acao-etiqueta.reducer';

export interface AcaoEditAppState
{
    acao: AcaoEditState;
    modalidadeAcaoEtiquetaList: ModalidadeAcaoEtiquetaState;
}

export const getAcaoEditAppState = createFeatureSelector<AcaoEditAppState>(
    'coordenador-acao-edit-app'
);

export const getAppState: any = createSelector(
    getAcaoEditAppState,
    (state: AcaoEditAppState) => state
);

export const reducers: ActionReducerMap<AcaoEditAppState> = {
    acao: AcaoEditReducer,
    modalidadeAcaoEtiquetaList: ModalidadeAcaoEtiqueraReducer
};

export * from './acao-edit.reducer';
export * from './modalidade-acao-etiqueta.reducer';
