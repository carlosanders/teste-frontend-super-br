import {createSelector} from '@ngrx/store';
import {getCaixaEmailAppState, CaixaEmailAppState, ContaEmailState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {contaEmail as contaEmailSchema} from '@cdk/normalizr';
import {ContaEmail} from '@cdk/models/conta-email.model';

const schemaSelectors = createSchemaSelectors<ContaEmail>(contaEmailSchema);

export const getContaEmailState = createSelector(
    getCaixaEmailAppState,
    (state: CaixaEmailAppState) => state.contaEmail
);

export const getSelectedContaEmailId = createSelector(
    getContaEmailState,
    (state: ContaEmailState) => state.selectedContaEmailId
);

export const getSelectedContaEmail = createSelector(
    schemaSelectors.getNormalizedEntities,
    getSelectedContaEmailId,
    schemaSelectors.entityProjector
);

export const getContaEmailIds = createSelector(
    getContaEmailState,
    (state: ContaEmailState) => state.entitiesId
);

export const getContaEmailList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getContaEmailIds,
    schemaSelectors.entitiesProjector
);

export const getContaEmailError = createSelector(
    getContaEmailState,
    (state: ContaEmailState) => state.error
);

export const getContaEmailIsLoading = createSelector(
    getContaEmailState,
    (state: ContaEmailState) => state.loading
);

export const getContaEmailIsLoaded = createSelector(
    getContaEmailState,
    (state: ContaEmailState) => state.loaded
);

export const getContaEmailIsSavingProcessoForm = createSelector(
    getContaEmailState,
    (state: ContaEmailState) => state.saving
);

export const getContaEmailProcessoFormError = createSelector(
    getContaEmailState,
    (state: ContaEmailState) => state.saveError
);

export const getActiveCard = createSelector(
    getContaEmailState,
    (state: ContaEmailState) => state.activeCard
);
