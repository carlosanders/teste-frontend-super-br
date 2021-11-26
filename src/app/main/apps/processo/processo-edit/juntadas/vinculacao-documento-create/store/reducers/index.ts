import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {VinculacaoDocumentoCreateReducer, VinculacaoDocumentoCreateState} from './juntada.reducer';

export interface VinculacaoDocumentoCreateAppState
{
    juntada: VinculacaoDocumentoCreateState;
}

export const getVinculacaoDocumentoCreateAppState = createFeatureSelector<VinculacaoDocumentoCreateAppState>(
    'vinculacao-documento-create-app'
);

export const getAppState: any = createSelector(
    getVinculacaoDocumentoCreateAppState,
    (state: VinculacaoDocumentoCreateAppState) => state
);

export const reducers: ActionReducerMap<VinculacaoDocumentoCreateAppState> = {
    juntada: VinculacaoDocumentoCreateReducer
};

export * from './juntada.reducer';
