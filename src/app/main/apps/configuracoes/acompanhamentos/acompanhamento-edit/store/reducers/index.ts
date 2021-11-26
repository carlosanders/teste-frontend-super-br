import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {AcompanhamentoEditReducer, AcompanhamentoEditState} from './acompanhamento-edit.reducer';

export interface AcompanhamentoEditAppState
{
    acompanhamento: AcompanhamentoEditState;
}

export const getAcompanhamentoEditAppState = createFeatureSelector<AcompanhamentoEditAppState>(
    'acompanhamento-edit-app'
);

export const getAppState: any = createSelector(
    getAcompanhamentoEditAppState,
    (state: AcompanhamentoEditAppState) => state
);

export const reducers: ActionReducerMap<AcompanhamentoEditAppState> = {
    acompanhamento: AcompanhamentoEditReducer
};

export * from './acompanhamento-edit.reducer';
