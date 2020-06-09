import {createSelector} from '@ngrx/store';
import {getCoordenadorEditAppState, CoordenadorEditAppState, CoordenadorEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Coordenador} from '@cdk/models/coordenador.model';
import {coordenador as coordenadorSchema} from '@cdk/normalizr/coordenador.schema';
import {getCoordenadoresState} from '../../../store/selectors';
import {CoordenadoresState} from '../../../store/reducers';
import {Usuario} from '@cdk/models';
import {usuario as schemaUsuario} from '@cdk/normalizr/usuario.schema';

const schemaCoordenadorSelectors = createSchemaSelectors<Coordenador>(coordenadorSchema);
const schemaUsuarioSelectors = createSchemaSelectors<Usuario>(schemaUsuario);

export const getCoordenadorEditState = createSelector(
    getCoordenadorEditAppState,
    (state: CoordenadorEditAppState) => state.coordenador
);

export const getCoordenadorId = createSelector(
    getCoordenadorEditState,
    (state: CoordenadorEditState) => state.loaded ? state.loaded.value : null
);

export const getCoordenador = createSelector(
    schemaCoordenadorSelectors.getNormalizedEntities,
    getCoordenadorId,
    schemaCoordenadorSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getCoordenadorEditState,
    (state: CoordenadorEditState) => state.saving
);

export const getHasLoaded = createSelector(
    getCoordenadorEditState,
    (state: CoordenadorEditState) => state.loaded
);

export const getErrors = createSelector(
    getCoordenadorEditState,
    (state: CoordenadorEditState) => state.errors
);

export const getUsuarioId = createSelector(
    getCoordenadoresState,
    (state: CoordenadoresState) => (state.loaded && state.loaded.id === 'usuarioHandle') ? state.loaded.value : null
);

export const getUsuario = createSelector(
    schemaUsuarioSelectors.getNormalizedEntities,
    getUsuarioId,
    schemaUsuarioSelectors.entityProjector
);