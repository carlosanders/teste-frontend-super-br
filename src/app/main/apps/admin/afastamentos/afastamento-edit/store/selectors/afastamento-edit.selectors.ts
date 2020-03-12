import {createSelector} from '@ngrx/store';
import {getAfastamentoEditAppState, AfastamentoEditAppState, AfastamentoEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Afastamento} from '@cdk/models/afastamento.model';
import {afastamento as afastamentoSchema} from '@cdk/normalizr/afastamento.schema';
import {getAfastamentosState} from "../../../store/selectors";
import {AfastamentosState} from "../../../store/reducers";
import {Usuario} from '@cdk/models';
import {usuario as schemaUsuario} from '@cdk/normalizr/usuario.schema';

const schemaAfastamentoSelectors = createSchemaSelectors<Afastamento>(afastamentoSchema);
const schemaUsuarioSelectors = createSchemaSelectors<Usuario>(schemaUsuario);

export const getAfastamentoEditState = createSelector(
    getAfastamentoEditAppState,
    (state: AfastamentoEditAppState) => state.afastamento
);

export const getAfastamentoId = createSelector(
    getAfastamentoEditState,
    (state: AfastamentoEditState) => state.loaded ? state.loaded.value : null
);

export const getAfastamento = createSelector(
    schemaAfastamentoSelectors.getNormalizedEntities,
    getAfastamentoId,
    schemaAfastamentoSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getAfastamentoEditState,
    (state: AfastamentoEditState) => state.saving
);

export const getHasLoaded = createSelector(
    getAfastamentoEditState,
    (state: AfastamentoEditState) => state.loaded
);

export const getErrors = createSelector(
    getAfastamentoEditState,
    (state: AfastamentoEditState) => state.errors
);

export const getUsuarioId = createSelector(
    getAfastamentosState,
    (state: AfastamentosState) => (state.loaded && state.loaded.id === 'usuarioHandle') ? state.loaded.value : null
);

export const getUsuario = createSelector(
    schemaUsuarioSelectors.getNormalizedEntities,
    getUsuarioId,
    schemaUsuarioSelectors.entityProjector
);