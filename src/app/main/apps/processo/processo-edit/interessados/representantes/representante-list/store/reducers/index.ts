import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {RepresentanteListReducer, RepresentanteListState} from './representante-list.reducer';

export interface RepresentanteListAppState
{
    representanteList: RepresentanteListState;
}

export const getRepresentanteListAppState = createFeatureSelector<RepresentanteListAppState>(
    'representante-list-app'
);

export const getAppState: any = createSelector(
    getRepresentanteListAppState,
    (state: RepresentanteListAppState) => state
);

export const reducers: ActionReducerMap<RepresentanteListAppState> = {
    representanteList: RepresentanteListReducer
};

export * from './representante-list.reducer';
