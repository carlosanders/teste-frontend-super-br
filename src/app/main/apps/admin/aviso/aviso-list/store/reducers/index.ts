import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {AvisoListReducer, AvisoListState} from './aviso-list.reducer';

export interface AvisoListAppState {
    avisoList: AvisoListState;
}

export const getAvisoListAppState = createFeatureSelector<AvisoListAppState>(
    'aviso-list'
);

export const getAppState: any = createSelector(
    getAvisoListAppState,
    (state: AvisoListAppState) => state
);

export const reducers: ActionReducerMap<AvisoListAppState> = {
    avisoList: AvisoListReducer
};

export * from './aviso-list.reducer';
