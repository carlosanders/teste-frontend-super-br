import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {modelosReducer, ModelosState} from './modelos.reducer';
import {componenteDigitalReducer, ComponenteDigitalState} from './componentes-digitais.reducer';

export interface ModelosBlocoAppState {
    modelos: ModelosState;
    componenteDigital: ComponenteDigitalState;
}

export const getModelosAppState = createFeatureSelector<ModelosBlocoAppState>(
    'modelos-bloco-app'
);

export const getAppState: any = createSelector(
    getModelosAppState,
    (state: ModelosBlocoAppState) => state
);

export const reducers: ActionReducerMap<ModelosBlocoAppState> = {
    modelos: modelosReducer,
    componenteDigital: componenteDigitalReducer
};

export * from './modelos.reducer';
export * from './componentes-digitais.reducer';
