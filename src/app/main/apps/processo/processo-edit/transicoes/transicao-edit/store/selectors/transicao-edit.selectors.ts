import {createSelector} from '@ngrx/store';
import {getTransicaoEditAppState, TransicaoEditAppState, TransicaoEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Transicao} from '@cdk/models';
import {transicao as transicaoSchema} from '@cdk/normalizr/transicao.schema';

const schemaTransicaoSelectors = createSchemaSelectors<Transicao>(transicaoSchema);

export const getTransicaoEditState = createSelector(
    getTransicaoEditAppState,
    (state: TransicaoEditAppState) => state.transicao
);

export const getTransicaoId = createSelector(
    getTransicaoEditState,
    (state: TransicaoEditState) => state.loaded ? state.loaded.value : null
);

export const getTransicao = createSelector(
    schemaTransicaoSelectors.getNormalizedEntities,
    getTransicaoId,
    schemaTransicaoSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getTransicaoEditState,
    (state: TransicaoEditState) => state.saving
);

export const getHasLoaded = createSelector(
    getTransicaoEditState,
    (state: TransicaoEditState) => state.loaded
);

export const getErrors = createSelector(
    getTransicaoEditState,
    (state: TransicaoEditState) => state.errors
);
