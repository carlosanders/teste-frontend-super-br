import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Processo} from '@cdk/models';
import {processo as processoShema} from '@cdk/normalizr/processo.schema';
import {createSelector} from '@ngrx/store';
import {getRealizarTransicaoAppState, RealizarTransicaoAppState, RealizarTransicaoState} from '../reducers';

const schemaRealizarTransicaoSelectors = createSchemaSelectors<Processo>(processoShema);

export const getRealizarTransicaoState = createSelector(
    getRealizarTransicaoAppState,
    (state: RealizarTransicaoAppState) => state.arquivistaClassificacao
);

export const getRealizarTransicaoId = createSelector(
    getRealizarTransicaoState,
    (state: RealizarTransicaoState) => state.loaded ? state.loaded.value : null
);

export const getRealizarTransicaoList = createSelector(
    schemaRealizarTransicaoSelectors.getNormalizedEntities,
    getRealizarTransicaoId,
    schemaRealizarTransicaoSelectors.entityProjector
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