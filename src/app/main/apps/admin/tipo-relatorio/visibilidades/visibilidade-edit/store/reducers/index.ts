import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {VisibilidadeEditReducer, VisibilidadeEditState} from './visibilidade-edit.reducer';

export interface VisibilidadeEditAppState
{
    visibilidade: VisibilidadeEditState;
}

export const getVisibilidadeEditAppState = createFeatureSelector<VisibilidadeEditAppState>(
    'visibilidade-tipo-relatorio-edit-app'
);

export const getAppState: any = createSelector(
    getVisibilidadeEditAppState,
    (state: VisibilidadeEditAppState) => state
);

export const reducers: ActionReducerMap<VisibilidadeEditAppState> = {
    visibilidade: VisibilidadeEditReducer
};

export * from './visibilidade-edit.reducer';
