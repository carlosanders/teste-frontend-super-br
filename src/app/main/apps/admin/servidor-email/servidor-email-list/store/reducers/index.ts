import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {ServidorEmailListReducer, ServidorEmailListState} from './servidor-email-list.reducer';

export interface ServidorEmailListAppState {
    servidorEmailList: ServidorEmailListState;
}

export const getServidorEmailListAppState = createFeatureSelector<ServidorEmailListAppState>(
    'servidor-email-list'
);

export const getAppState: any = createSelector(
    getServidorEmailListAppState,
    (state: ServidorEmailListAppState) => state
);

export const reducers: ActionReducerMap<ServidorEmailListAppState> = {
    servidorEmailList: ServidorEmailListReducer
};

export * from './servidor-email-list.reducer';
