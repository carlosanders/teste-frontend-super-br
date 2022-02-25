import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {EspecieDocumentoAvulsoEditReducer, EspecieDocumentoAvulsoEditState} from './especie-documento-avulso-edit.reducer';

export interface EspecieDocumentoAvulsoEditAppState {
    especieDocumentoAvulso: EspecieDocumentoAvulsoEditState;
}

export const getEspecieDocumentoAvulsoEditAppState = createFeatureSelector<EspecieDocumentoAvulsoEditAppState>(
    'especie-documento-avulso-edit-app'
);

export const getAppState: any = createSelector(
    getEspecieDocumentoAvulsoEditAppState,
    (state: EspecieDocumentoAvulsoEditAppState) => state
);

export const reducers: ActionReducerMap<EspecieDocumentoAvulsoEditAppState> = {
    especieDocumentoAvulso: EspecieDocumentoAvulsoEditReducer
};

export * from './especie-documento-avulso-edit.reducer';
