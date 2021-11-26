import {createSelector} from '@ngrx/store';
import {getLotacaoEditAppState, LotacaoEditAppState, LotacaoEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Lotacao} from '@cdk/models/lotacao.model';
import {lotacao as lotacaoSchema, setor as schemaSetor, usuario as schemaUsuario} from '@cdk/normalizr';
import {Setor, Usuario} from '@cdk/models';
import {getLotacoesAppState, LotacoesAppState, LotacoesState} from '../../../store/reducers';

const schemaLotacaoSelectors = createSchemaSelectors<Lotacao>(lotacaoSchema);
const schemaSetorSelectors = createSchemaSelectors<Setor>(schemaSetor);
const schemaUsuarioSelectors = createSchemaSelectors<Usuario>(schemaUsuario);

export const getLotacaoEditState: any = createSelector(
    getLotacaoEditAppState,
    (state: LotacaoEditAppState) => state.lotacao
);

export const getLotacaoId: any = createSelector(
    getLotacaoEditState,
    (state: LotacaoEditState) => state.loaded ? state.loaded.value : null
);

export const getLotacoesState: any = createSelector(
    getLotacoesAppState,
    (state: LotacoesAppState) => state.lotacoes
);

export const getLotacao: any = createSelector(
    schemaLotacaoSelectors.getNormalizedEntities,
    getLotacaoId,
    schemaLotacaoSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getLotacaoEditState,
    (state: LotacaoEditState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getLotacaoEditState,
    (state: LotacaoEditState) => state.loaded
);

export const getErrors: any = createSelector(
    getLotacaoEditState,
    (state: LotacaoEditState) => state.errors
);

export const getSetorId: any = createSelector(
    getLotacoesState,
    (state: LotacoesState) => (state.loadedSetor && state.loadedSetor.id === 'setorHandle') ? state.loadedSetor.value : null
);

export const getSetor: any = createSelector(
    schemaSetorSelectors.getNormalizedEntities,
    getSetorId,
    schemaSetorSelectors.entityProjector
);

export const getUsuarioId: any = createSelector(
    getLotacoesState,
    (state: LotacoesState) => (state.loaded && state.loaded.id === 'usuarioHandle') ? state.loaded.value : null
);

export const getUsuario: any = createSelector(
    schemaUsuarioSelectors.getNormalizedEntities,
    getUsuarioId,
    schemaUsuarioSelectors.entityProjector
);
