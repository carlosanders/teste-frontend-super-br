import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {
    ModalidadeOrgaoCentralEditReducer,
    ModalidadeOrgaoCentralEditState
} from './modalidade-orgao-central-edit.reducer';

export interface ModalidadeOrgaoCentralEditAppState {
    modalidadeOrgaoCentral: ModalidadeOrgaoCentralEditState;
}

export const getModalidadeOrgaoCentralEditAppState = createFeatureSelector<ModalidadeOrgaoCentralEditAppState>(
    'modalidade-orgao-central-edit-app'
);

export const getAppState: any = createSelector(
    getModalidadeOrgaoCentralEditAppState,
    (state: ModalidadeOrgaoCentralEditAppState) => state
);

export const reducers: ActionReducerMap<ModalidadeOrgaoCentralEditAppState> = {
    modalidadeOrgaoCentral: ModalidadeOrgaoCentralEditReducer
};

export * from './modalidade-orgao-central-edit.reducer';
