import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {CoordenadorLotacaoEditReducer, LotacaoEditState} from './coordenador-lotacao-edit.reducer';

export interface LotacaoEditAppState
{
    lotacao: LotacaoEditState;
}

export const getLotacaoEditAppState = createFeatureSelector<LotacaoEditAppState>(
    'coordenador-lotacao-edit-app'
);

export const getAppState: any = createSelector(
    getLotacaoEditAppState,
    (state: LotacaoEditAppState) => state
);

export const reducers: ActionReducerMap<LotacaoEditAppState> = {
    lotacao: CoordenadorLotacaoEditReducer
};

export * from './coordenador-lotacao-edit.reducer';
