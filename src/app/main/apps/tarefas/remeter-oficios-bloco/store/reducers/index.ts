import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {
    RemeterOficiosBlocoReducer,
    RemeterOficiosBlocoState
} from './remeter-oficios-bloco.reducer';

export interface RemeterOficiosBlocoAppState
{
    remeterOficiosBloco: RemeterOficiosBlocoState;
}

export const getRemeterOficiosBlocoAppState = createFeatureSelector<RemeterOficiosBlocoAppState>(
    'remeter-oficios-bloco-app'
);

export const getAppState: any = createSelector(
    getRemeterOficiosBlocoAppState,
    (state: RemeterOficiosBlocoAppState) => state
);

export const reducers: ActionReducerMap<RemeterOficiosBlocoAppState> = {
    remeterOficiosBloco: RemeterOficiosBlocoReducer
};

export * from './remeter-oficios-bloco.reducer';
