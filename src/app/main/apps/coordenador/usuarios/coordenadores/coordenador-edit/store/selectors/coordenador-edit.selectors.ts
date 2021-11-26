import {createSelector} from '@ngrx/store';
import {CoordenadorEditAppState, CoordenadorEditState, getCoordenadorEditAppState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Coordenador} from '@cdk/models/coordenador.model';
import {coordenador as coordenadorSchema, usuario as schemaUsuario} from '@cdk/normalizr';
import {getCoordenadoresState} from '../../../store/selectors';
import {CoordenadoresState} from '../../../store/reducers';
import {Usuario} from '@cdk/models';

const schemaCoordenadorSelectors = createSchemaSelectors<Coordenador>(coordenadorSchema);
const schemaUsuarioSelectors = createSchemaSelectors<Usuario>(schemaUsuario);

export const getCoordenadorEditState: any = createSelector(
    getCoordenadorEditAppState,
    (state: CoordenadorEditAppState) => state.coordenador
);

export const getCoordenadorId: any = createSelector(
    getCoordenadorEditState,
    (state: CoordenadorEditState) => state.loaded ? state.loaded.value : null
);

export const getCoordenador: any = createSelector(
    schemaCoordenadorSelectors.getNormalizedEntities,
    getCoordenadorId,
    schemaCoordenadorSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getCoordenadorEditState,
    (state: CoordenadorEditState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getCoordenadorEditState,
    (state: CoordenadorEditState) => state.loaded
);

export const getErrors: any = createSelector(
    getCoordenadorEditState,
    (state: CoordenadorEditState) => state.errors
);

export const getUsuarioId: any = createSelector(
    getCoordenadoresState,
    (state: CoordenadoresState) => (state.loaded && state.loaded.id === 'usuarioHandle') ? state.loaded.value : null
);

export const getUsuario: any = createSelector(
    schemaUsuarioSelectors.getNormalizedEntities,
    getUsuarioId,
    schemaUsuarioSelectors.entityProjector
);
