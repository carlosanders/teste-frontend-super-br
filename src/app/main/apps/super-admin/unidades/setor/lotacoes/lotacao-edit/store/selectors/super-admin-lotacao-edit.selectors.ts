import {createSelector} from '@ngrx/store';
import {getRootLotacaoEditAppState, RootLotacaoEditAppState, RootLotacaoEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Lotacao} from '@cdk/models/lotacao.model';
import {lotacao as lotacaoSchema} from '@cdk/normalizr/lotacao.schema';
import {getRootLotacoesState} from '../../../store/selectors';
import {RootLotacoesState} from '../../../store/reducers';
import {Setor} from '@cdk/models';
import {setor as schemaSetor} from '@cdk/normalizr/setor.schema';

const schemaLotacaoSelectors = createSchemaSelectors<Lotacao>(lotacaoSchema);
const schemaSetorSelectors = createSchemaSelectors<Setor>(schemaSetor);

export const getRootLotacaoEditState = createSelector(
    getRootLotacaoEditAppState,
    (state: RootLotacaoEditAppState) => state.lotacao
);

export const getLotacaoId = createSelector(
    getRootLotacaoEditState,
    (state: RootLotacaoEditState) => state.loaded ? state.loaded.value : null
);

export const getLotacao = createSelector(
    schemaLotacaoSelectors.getNormalizedEntities,
    getLotacaoId,
    schemaLotacaoSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getRootLotacaoEditState,
    (state: RootLotacaoEditState) => state.saving
);

export const getHasLoaded = createSelector(
    getRootLotacaoEditState,
    (state: RootLotacaoEditState) => state.loaded
);

export const getErrors = createSelector(
    getRootLotacaoEditState,
    (state: RootLotacaoEditState) => state.errors
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
