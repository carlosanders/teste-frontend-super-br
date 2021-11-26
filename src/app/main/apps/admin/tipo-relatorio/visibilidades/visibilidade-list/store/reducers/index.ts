import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {VisibilidadeListReducer, VisibilidadeListState} from './visibilidade-list.reducer';

export interface VisibilidadeListAppState
{
    visibilidadeList: VisibilidadeListState;
}

export const getVisibilidadeListAppState = createFeatureSelector<VisibilidadeListAppState>(
    'visibilidade-tipo-relatorio-list-app'
);

export const getAppState: any = createSelector(
    getVisibilidadeListAppState,
    (state: VisibilidadeListAppState) => state
);

export const reducers: ActionReducerMap<VisibilidadeListAppState> = {
    visibilidadeList: VisibilidadeListReducer
};

export * from './visibilidade-list.reducer';
