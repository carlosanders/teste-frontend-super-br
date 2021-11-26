import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {anexarCopiaReducer, AnexarCopiaState} from './anexar-copia.reducer';

export interface AnexarCopiaAppState
{
    anexarCopia: AnexarCopiaState;
}

export const getAnexarCopiaAppState = createFeatureSelector<AnexarCopiaAppState>(
    'anexar-copia-app'
);

export const getAppState: any = createSelector(
    getAnexarCopiaAppState,
    (state: AnexarCopiaAppState) => state
);

export const reducers: ActionReducerMap<AnexarCopiaAppState> = {
    anexarCopia: anexarCopiaReducer
};

export * from './anexar-copia.reducer';
