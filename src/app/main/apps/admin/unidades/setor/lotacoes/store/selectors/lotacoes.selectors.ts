import {createSelector} from '@ngrx/store';
import {getRootLotacoesAppState, RootLotacoesAppState, RootLotacoesState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Setor} from '@cdk/models';
import {setor as setorSchema} from '@cdk/normalizr/setor.schema';

const schemaSetorSelectors = createSchemaSelectors<Setor>(setorSchema);

export const getRootLotacoesState = createSelector(
    getRootLotacoesAppState,
    (state: RootLotacoesAppState) => state.lotacoes
);

export const getSetorId = createSelector(
    getRootLotacoesState,
    (state: RootLotacoesState) => (state.loaded && state.loaded.id === 'setorHandle') ? state.loaded.value : null
);

export const getSetor = createSelector(
    schemaSetorSelectors.getNormalizedEntities,
    getSetorId,
    schemaSetorSelectors.entityProjector
);

export const getHasLoadedSetor = createSelector(
    getRootLotacoesState,
    (state: RootLotacoesState) => state.loaded.id === 'setorHandle' ? state.loaded : false
);

export const getErrors = createSelector(
    getRootLotacoesState,
    (state: RootLotacoesState) => state.errors
);
