import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {EspecieAtividadeListReducer, EspecieAtividadeListState} from './especie-atividade-list.reducer';

export interface EspecieAtividadeListAppState {
    especieAtividadeList: EspecieAtividadeListState;
}

export const getEspecieAtividadeListAppState = createFeatureSelector<EspecieAtividadeListAppState>(
    'especie-atividade-list'
);

export const getAppState: any = createSelector(
    getEspecieAtividadeListAppState,
    (state: EspecieAtividadeListAppState) => state
);

export const reducers: ActionReducerMap<EspecieAtividadeListAppState> = {
    especieAtividadeList: EspecieAtividadeListReducer
};

export * from './especie-atividade-list.reducer';
