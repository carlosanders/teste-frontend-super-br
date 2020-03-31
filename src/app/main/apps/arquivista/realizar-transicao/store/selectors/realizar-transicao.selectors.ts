import {getRealizarTransicaoAppState, RealizarTransicaoAppState, RealizarTransicaoState} from '../reducers';
import {createSelector} from '@ngrx/store';
import {transicao as transicaoSchema} from '@cdk/normalizr/transicao.schema';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Transicao} from '@cdk/models';

const schemaTransicaoSelectors = createSchemaSelectors<Transicao>(transicaoSchema);

export const getRealizarTransicaoState = createSelector(
    getRealizarTransicaoAppState,
    (state: RealizarTransicaoAppState) => state.transicao
);

export const getTransicaoId = createSelector(
    getRealizarTransicaoState,
    (state: RealizarTransicaoState) => state.loaded ? state.loaded.value : null
);

export const getTransicaoList = createSelector(
    schemaTransicaoSelectors.getNormalizedEntities,
    getTransicaoId,
    schemaTransicaoSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getRealizarTransicaoState,
    (state: RealizarTransicaoState) => state.saving
);

export const getHasLoaded = createSelector(
    getRealizarTransicaoState,
    (state: RealizarTransicaoState) => state.loaded
);

export const getErrors = createSelector(
    getRealizarTransicaoState,
    (state: RealizarTransicaoState) => state.errors
);

