import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {componentesDigitaisReducer, ComponentesDigitaisState} from './componentes-digitais.reducer';

export interface ComponentesDigitaisAppState
{
    componentesDigitais: ComponentesDigitaisState;
}

export const getComponentesDigitaisAppState = createFeatureSelector<ComponentesDigitaisAppState>(
    'modelos-componentes-digitais-app'
);

export const getAppState: any = createSelector(
    getComponentesDigitaisAppState,
    (state: ComponentesDigitaisAppState) => state
);

export const reducers: ActionReducerMap<ComponentesDigitaisAppState> = {
    componentesDigitais: componentesDigitaisReducer
};

export * from './componentes-digitais.reducer';
