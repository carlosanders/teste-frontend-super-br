import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {ModelosReducer, ModelosState} from './modelos.reducer';
import {ComponenteDigitalReducer, ComponenteDigitalState} from './componentes-digitais.reducer';

export interface ModelosAppState
{
    modelos: ModelosState;
    componenteDigital: ComponenteDigitalState;
}

export const getModelosAppState = createFeatureSelector<ModelosAppState>(
    'modelo-bloco-app'
);

export const getAppState: any = createSelector(
    getModelosAppState,
    (state: ModelosAppState) => state
);

export const reducers: ActionReducerMap<ModelosAppState> = {
    modelos: ModelosReducer,
    componenteDigital: ComponenteDigitalReducer
};

export * from './modelos.reducer';
export * from './componentes-digitais.reducer';
