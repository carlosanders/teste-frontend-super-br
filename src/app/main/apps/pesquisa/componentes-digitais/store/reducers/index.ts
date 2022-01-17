import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {ComponentesDigitaisReducer, ComponentesDigitaisState} from './componentes-digitais.reducer';

export interface ComponentesDigitaisAppState
{
    componentesDigitais: ComponentesDigitaisState;
}

export const getComponentesDigitaisAppState = createFeatureSelector<ComponentesDigitaisAppState>(
    'pesquisa-componentes-digitais-app'
);

export const getAppState: any = createSelector(
    getComponentesDigitaisAppState,
    (state: ComponentesDigitaisAppState) => state
);

export const reducers: ActionReducerMap<ComponentesDigitaisAppState> = {
    componentesDigitais: ComponentesDigitaisReducer
};

export * from './componentes-digitais.reducer';
