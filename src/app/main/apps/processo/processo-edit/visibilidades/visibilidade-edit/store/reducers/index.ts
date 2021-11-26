import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {visibilidadeEditReducer, VisibilidadeEditState} from './visibilidade-edit.reducer';

export interface VisibilidadeEditAppState
{
    visibilidade: VisibilidadeEditState;
}

export const getVisibilidadeEditAppState = createFeatureSelector<VisibilidadeEditAppState>(
    'visibilidade-edit-app'
);

export const getAppState: any = createSelector(
    getVisibilidadeEditAppState,
    (state: VisibilidadeEditAppState) => state
);

export const reducers: ActionReducerMap<VisibilidadeEditAppState> = {
    visibilidade: visibilidadeEditReducer
};

export * from './visibilidade-edit.reducer';
