import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {PerfilReducer, ProfileState} from './perfil.reducer';

export interface ProfileAppState
{
    assunto: ProfileState;
}

export const getProfileAppState = createFeatureSelector<ProfileAppState>(
    'perfil-app'
);

export const getAppState: any = createSelector(
    getProfileAppState,
    (state: ProfileAppState) => state
);

export const reducers: ActionReducerMap<ProfileAppState> = {
    assunto: PerfilReducer
};

export * from './perfil.reducer';
