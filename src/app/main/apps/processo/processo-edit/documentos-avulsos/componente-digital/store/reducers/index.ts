import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {ComponenteDigitalReducer, ComponenteDigitalState} from './componente-digital.reducer';

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
    componenteDigital: ComponenteDigitalReducer
};

export * from './componente-digital.reducer';
