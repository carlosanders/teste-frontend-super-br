import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {componenteDigitalReducer, ComponenteDigitalState} from './componente-digital.reducer';

export interface ComponenteDigitalAppState
{
    componenteDigital: ComponenteDigitalState;
}

export const getComponenteDigitalAppState = createFeatureSelector<ComponenteDigitalAppState>(
    'componente-digital-app'
);

export const getAppState: any = createSelector(
    getComponenteDigitalAppState,
    (state: ComponenteDigitalAppState) => state
);

export const reducers: ActionReducerMap<ComponenteDigitalAppState> = {
    componenteDigital: componenteDigitalReducer
};

export * from './componente-digital.reducer';
