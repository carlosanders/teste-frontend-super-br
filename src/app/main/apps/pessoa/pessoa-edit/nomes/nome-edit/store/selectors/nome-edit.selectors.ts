import {createSelector} from '@ngrx/store';
import {getNomeEditAppState, NomeEditAppState, NomeEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Nome} from '@cdk/models';
import {nome as nomeSchema} from '@cdk/normalizr/nome.schema';

const schemaNomeSelectors = createSchemaSelectors<Nome>(nomeSchema);

export const getNomeEditState = createSelector(
    getNomeEditAppState,
    (state: NomeEditAppState) => state.nome
);

export const getNomeId = createSelector(
    getNomeEditState,
    (state: NomeEditState) => state.loaded ? state.loaded.value : null
);

export const getNome = createSelector(
    schemaNomeSelectors.getNormalizedEntities,
    getNomeId,
    schemaNomeSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getNomeEditState,
    (state: NomeEditState) => state.saving
);

export const getHasLoaded = createSelector(
    getNomeEditState,
    (state: NomeEditState) => state.loaded
);

export const getErrors = createSelector(
    getNomeEditState,
    (state: NomeEditState) => state.errors
);
