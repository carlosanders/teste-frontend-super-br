import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {RemessaListReducer, RemessaListState} from './remessa-list.reducer';

export interface RemessaListAppState
{
    remessaList: RemessaListState;
}

export const getRemessaListAppState = createFeatureSelector<RemessaListAppState>(
    'remessa-list-app'
);

export const getAppState: any = createSelector(
    getRemessaListAppState,
    (state: RemessaListAppState) => state
);

export const reducers: ActionReducerMap<RemessaListAppState> = {
    remessaList: RemessaListReducer
};

export * from './remessa-list.reducer';
