import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {RepresentanteEditReducer, RepresentanteEditState} from './representante-edit.reducer';

export interface RepresentanteEditAppState
{
    representante: RepresentanteEditState;
}

export const getRepresentanteEditAppState = createFeatureSelector<RepresentanteEditAppState>(
    'representante-edit-app'
);

export const getAppState: any = createSelector(
    getRepresentanteEditAppState,
    (state: RepresentanteEditAppState) => state
);

export const reducers: ActionReducerMap<RepresentanteEditAppState> = {
    representante: RepresentanteEditReducer
};

export * from './representante-edit.reducer';
