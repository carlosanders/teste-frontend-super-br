import {createSelector} from '@ngrx/store';
import {getSetorAppState, SetorAppState, SetorState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Setor} from '@cdk/models';
import {setor as setorSchema} from '@cdk/normalizr';

const schemaSetorSelectors = createSchemaSelectors<Setor>(setorSchema);

export const getSetorState: any = createSelector(
    getSetorAppState,
    (state: SetorAppState) => state.setor
);

export const getUnidadeId: any = createSelector(
    getSetorState,
    (state: SetorState) => (state.loaded && state.loaded.id === 'unidadeHandle') ? state.loaded.value : null
);

export const getUnidade: any = createSelector(
    schemaSetorSelectors.getNormalizedEntities,
    getUnidadeId,
    schemaSetorSelectors.entityProjector
);

export const getHasLoadedUnidade: any = createSelector(
    getSetorState,
    (state: SetorState) => state.loaded.id === 'unidadeHandle' ? state.loaded : false
);

export const getErrors: any = createSelector(
    getSetorState,
    (state: SetorState) => state.errors
);
