import {createSelector} from '@ngrx/store';
import {getRootLotacaoEditAppState, RootLotacaoEditAppState, RootLotacaoEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Lotacao} from '@cdk/models/lotacao.model';
import {lotacao as lotacaoSchema, setor as schemaSetor, usuario as schemaUsuario} from '@cdk/normalizr';
import {getRootLotacoesState} from '../../../store/selectors';
import {RootLotacoesState} from '../../../store/reducers';
import {Setor, Usuario} from '@cdk/models';

const schemaLotacaoSelectors = createSchemaSelectors<Lotacao>(lotacaoSchema);
const schemaSetorSelectors = createSchemaSelectors<Setor>(schemaSetor);
const schemaUsuarioSelectors = createSchemaSelectors<Usuario>(schemaUsuario);

export const getRootLotacaoEditState: any = createSelector(
    getRootLotacaoEditAppState,
    (state: RootLotacaoEditAppState) => state.lotacao
);

export const getLotacaoId: any = createSelector(
    getRootLotacaoEditState,
    (state: RootLotacaoEditState) => state.loaded ? state.loaded.value : null
);

export const getLotacao: any = createSelector(
    schemaLotacaoSelectors.getNormalizedEntities,
    getLotacaoId,
    schemaLotacaoSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getRootLotacaoEditState,
    (state: RootLotacaoEditState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getRootLotacaoEditState,
    (state: RootLotacaoEditState) => state.loaded
);

export const getErrors: any = createSelector(
    getRootLotacaoEditState,
    (state: RootLotacaoEditState) => state.errors
);

export const getSetorId: any = createSelector(
    getRootLotacoesState,
    (state: RootLotacoesState) => (state.loadedSetor && state.loadedSetor.id === 'setorHandle') ? state.loadedSetor.value : null
);

export const getSetor: any = createSelector(
    schemaSetorSelectors.getNormalizedEntities,
    getSetorId,
    schemaSetorSelectors.entityProjector
);

export const getUsuarioId: any = createSelector(
    getRootLotacoesState,
    (state: RootLotacoesState) => (state.loaded && state.loaded.id === 'usuarioHandle') ? state.loaded.value : null
);

export const getUsuario: any = createSelector(
    schemaUsuarioSelectors.getNormalizedEntities,
    getUsuarioId,
    schemaUsuarioSelectors.entityProjector
);
