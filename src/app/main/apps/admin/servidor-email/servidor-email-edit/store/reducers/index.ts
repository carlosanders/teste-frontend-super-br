import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {ServidorEmailEditReducer, ServidorEmailEditState} from './servidor-email-edit.reducer';

export interface ServidorEmailEditAppState
{
    servidorEmail: ServidorEmailEditState;
}

export const getServidorEmailEditAppState = createFeatureSelector<ServidorEmailEditAppState>(
    'servidor-email-edit-app'
);

export const getAppState: any = createSelector(
    getServidorEmailEditAppState,
    (state: ServidorEmailEditAppState) => state
);

export const reducers: ActionReducerMap<ServidorEmailEditAppState> = {
    servidorEmail: ServidorEmailEditReducer
};

export * from './servidor-email-edit.reducer';
