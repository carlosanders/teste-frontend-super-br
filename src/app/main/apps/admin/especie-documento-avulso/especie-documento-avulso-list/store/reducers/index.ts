import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {EspecieDocumentoAvulsoListReducer, EspecieDocumentoAvulsoListState} from './especie-documento-avulso-list.reducer';

export interface EspecieDocumentoAvulsoListAppState {
    especieDocumentoAvulsoList: EspecieDocumentoAvulsoListState;
}

export const getEspecieDocumentoAvulsoListAppState = createFeatureSelector<EspecieDocumentoAvulsoListAppState>(
    'especie-documento-avulso-list'
);

export const getAppState: any = createSelector(
    getEspecieDocumentoAvulsoListAppState,
    (state: EspecieDocumentoAvulsoListAppState) => state
);

export const reducers: ActionReducerMap<EspecieDocumentoAvulsoListAppState> = {
    especieDocumentoAvulsoList: EspecieDocumentoAvulsoListReducer
};

export * from './especie-documento-avulso-list.reducer';
