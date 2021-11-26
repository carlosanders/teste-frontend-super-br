import {RegistrarExtravioReducer, RegistrarExtravioState} from './registrar-extravio.reducer';
import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {ModalidadeExtravioReducer, ModalidadeExtravioState} from './modalidade-extravio.reducer';

export interface RegistrarExtravioAppState {
    transicao: RegistrarExtravioState;
    modalidadeExtravio: ModalidadeExtravioState;
}

export const getRegistrarExtravioAppState = createFeatureSelector<RegistrarExtravioAppState>(
    'registrar-extravio'
);

export const getAppState: any = createSelector(
    getRegistrarExtravioAppState,
    (state: RegistrarExtravioAppState) => state
);

export const reducers: ActionReducerMap<RegistrarExtravioAppState> = {
    transicao: RegistrarExtravioReducer,
    modalidadeExtravio: ModalidadeExtravioReducer
};

export * from './registrar-extravio.reducer';
export * from './modalidade-extravio.reducer';
