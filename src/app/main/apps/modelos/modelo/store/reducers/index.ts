import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {modelosReducer, ModelosState} from './modelos.reducer';
import {componenteDigitalReducer, ComponenteDigitalState} from './componentes-digitais.reducer';

export interface ModelosAppState {
    modelos: ModelosState;
    componenteDigital: ComponenteDigitalState;
}

export const getModelosAppState = createFeatureSelector<ModelosAppState>(
    'modelos-app'
);

export const getAppState: any = createSelector(
    getModelosAppState,
    (state: ModelosAppState) => state
);

export const reducers: ActionReducerMap<ModelosAppState> = {
    modelos: modelosReducer,
    componenteDigital: componenteDigitalReducer
};

export * from './modelos.reducer';
export * from './componentes-digitais.reducer';
