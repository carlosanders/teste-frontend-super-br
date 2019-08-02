import {createSelector} from '@ngrx/store';
import {getAcaoEditAppState, AcaoEditAppState, AcaoEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Acao} from '@cdk/models/acao.model';
import {acao as acaoSchema} from '@cdk/normalizr/acao.schema';

const schemaAcaoSelectors = createSchemaSelectors<Acao>(acaoSchema);

export const getAcaoEditState = createSelector(
    getAcaoEditAppState,
    (state: AcaoEditAppState) => state.acao
);

export const getAcaoId = createSelector(
    getAcaoEditState,
    (state: AcaoEditState) => state.loaded ? state.loaded.value : null
);

export const getAcao = createSelector(
    schemaAcaoSelectors.getNormalizedEntities,
    getAcaoId,
    schemaAcaoSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getAcaoEditState,
    (state: AcaoEditState) => state.saving
);

export const getHasLoaded = createSelector(
    getAcaoEditState,
    (state: AcaoEditState) => state.loaded
);

export const getErrors = createSelector(
    getAcaoEditState,
    (state: AcaoEditState) => state.errors
);
