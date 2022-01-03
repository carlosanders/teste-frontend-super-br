import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {componentesDigitaisReducer, ComponentesDigitaisState} from './componentes-digitais.reducer';

export interface ComponentesDigitaisBlocoAppState
{
    componentesDigitais: ComponentesDigitaisState;
}

export const getComponentesDigitaisAppState = createFeatureSelector<ComponentesDigitaisBlocoAppState>(
    'modelos-componentes-digitais-bloco-app'
);

export const getAppState: any = createSelector(
    getComponentesDigitaisAppState,
    (state: ComponentesDigitaisBlocoAppState) => state
);

export const reducers: ActionReducerMap<ComponentesDigitaisBlocoAppState> = {
    componentesDigitais: componentesDigitaisReducer
};

export * from './componentes-digitais.reducer';
