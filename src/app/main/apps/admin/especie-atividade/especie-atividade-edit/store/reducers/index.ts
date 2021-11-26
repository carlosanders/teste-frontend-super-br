import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {EspecieAtividadeEditReducer, EspecieAtividadeEditState} from './especie-atividade-edit.reducer';

export interface EspecieAtividadeEditAppState {
    especieAtividade: EspecieAtividadeEditState;
}

export const getEspecieAtividadeEditAppState = createFeatureSelector<EspecieAtividadeEditAppState>(
    'especie-atividade-edit-app'
);

export const getAppState: any = createSelector(
    getEspecieAtividadeEditAppState,
    (state: EspecieAtividadeEditAppState) => state
);

export const reducers: ActionReducerMap<EspecieAtividadeEditAppState> = {
    especieAtividade: EspecieAtividadeEditReducer
};

export * from './especie-atividade-edit.reducer';
