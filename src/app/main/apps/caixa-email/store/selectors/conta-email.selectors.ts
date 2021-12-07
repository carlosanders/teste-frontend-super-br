import {createSelector} from '@ngrx/store';
import {getCaixaEmailAppState, CaixaEmailAppState, ContaEmailState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {contaEmail as contaEmailSchema} from '@cdk/normalizr';
import {ContaEmail} from '@cdk/models/conta-email.model';

const schemaSelectors = createSchemaSelectors<ContaEmail>(contaEmailSchema);

export const getContaEmailState: any = createSelector(
    getCaixaEmailAppState,
    (state: CaixaEmailAppState) => state.contaEmail
);

export const getSelectedContaEmailId: any = createSelector(
    getContaEmailState,
    (state: ContaEmailState) => state.selectedContaEmailId
);

export const getSelectedContaEmail: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getSelectedContaEmailId,
    schemaSelectors.entityProjector
);

export const getContaEmailIds: any = createSelector(
    getContaEmailState,
    (state: ContaEmailState) => state.entitiesId
);

export const getContaEmailList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getContaEmailIds,
    schemaSelectors.entitiesProjector
);

export const getContaEmailError: any = createSelector(
    getContaEmailState,
    (state: ContaEmailState) => state.error
);

export const getContaEmailIsLoading: any = createSelector(
    getContaEmailState,
    (state: ContaEmailState) => state.loading
);

export const getContaEmailIsLoaded: any = createSelector(
    getContaEmailState,
    (state: ContaEmailState) => state.loaded
);

export const getContaEmailIsSavingProcessoForm: any = createSelector(
    getContaEmailState,
    (state: ContaEmailState) => state.saving
);

export const getContaEmailProcessoFormError: any = createSelector(
    getContaEmailState,
    (state: ContaEmailState) => state.saveError
);

export const getActiveCard: any = createSelector(
    getContaEmailState,
    (state: ContaEmailState) => state.activeCard
);
