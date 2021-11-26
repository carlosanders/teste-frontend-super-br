import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {RootLocalizadorEditReducer, RootLocalizadorEditState} from './localizador-edit.reducer';

export interface RootLocalizadorEditAppState {
    localizador: RootLocalizadorEditState;
}

export const getRootLocalizadorEditAppState = createFeatureSelector<RootLocalizadorEditAppState>(
    'admin-localizador-edit-app'
);

export const getAppState: any = createSelector(
    getRootLocalizadorEditAppState,
    (state: RootLocalizadorEditAppState) => state
);

export const reducers: ActionReducerMap<RootLocalizadorEditAppState> = {
    localizador: RootLocalizadorEditReducer
};

export * from './localizador-edit.reducer';
