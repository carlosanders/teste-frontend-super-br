import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {
    ModalidadeOrgaoCentralListReducer,
    ModalidadeOrgaoCentralListState
} from './modalidade-orgao-central-list.reducer';

export interface ModalidadeOrgaoCentralListAppState {
    modalidadeOrgaoCentralList: ModalidadeOrgaoCentralListState;
}

export const getModalidadeOrgaoCentralListAppState = createFeatureSelector<ModalidadeOrgaoCentralListAppState>(
    'modalidade-orgao-central-list'
);

export const getAppState: any = createSelector(
    getModalidadeOrgaoCentralListAppState,
    (state: ModalidadeOrgaoCentralListAppState) => state
);

export const reducers: ActionReducerMap<ModalidadeOrgaoCentralListAppState> = {
    modalidadeOrgaoCentralList: ModalidadeOrgaoCentralListReducer
};

export * from './modalidade-orgao-central-list.reducer';
