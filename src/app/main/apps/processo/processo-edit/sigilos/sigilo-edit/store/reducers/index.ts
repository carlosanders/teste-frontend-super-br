import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {SigiloEditReducer, SigiloEditState} from './sigilo-edit.reducer';

export interface SigiloEditAppState
{
    sigilo: SigiloEditState;
}

export const getSigiloEditAppState = createFeatureSelector<SigiloEditAppState>(
    'sigilo-edit-app'
);

export const getAppState: any = createSelector(
    getSigiloEditAppState,
    (state: SigiloEditAppState) => state
);

export const reducers: ActionReducerMap<SigiloEditAppState> = {
    sigilo: SigiloEditReducer
};

export * from './sigilo-edit.reducer';
