import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {VisibilidadeReducer, VisibilidadeState} from './visibilidade.reducer';

export interface VisibilidadeAppState
{
    visibilidades: VisibilidadeState;
}

export const getVisibilidadeAppState = createFeatureSelector<VisibilidadeAppState>(
    'visibilidade-app'
);

export const getAppState: any = createSelector(
    getVisibilidadeAppState,
    (state: VisibilidadeAppState) => state
);

export const reducers: ActionReducerMap<VisibilidadeAppState> = {
    visibilidades: VisibilidadeReducer,
};

export * from './visibilidade.reducer';

