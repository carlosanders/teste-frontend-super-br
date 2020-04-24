import {createSelector} from '@ngrx/store';
import {getRootLocalizadorEditAppState, RootLocalizadorEditAppState, RootLocalizadorEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Localizador} from '@cdk/models/localizador.model';
import {localizador as localizadorSchema} from '@cdk/normalizr/localizador.schema';
import {setor as setorSchema} from '@cdk/normalizr/setor.schema';
import {getRootLocalizadoresState} from '../../../store/selectors';
import {RootLocalizadoresState} from '../../../store/reducers';
import {Setor} from '@cdk/models';

const schemaLocalizadorSelectors = createSchemaSelectors<Localizador>(localizadorSchema);
const schemaSetorSelectors = createSchemaSelectors<Setor>(setorSchema);

export const getRootLocalizadorEditState = createSelector(
    getRootLocalizadorEditAppState,
    (state: RootLocalizadorEditAppState) => state.localizador
);

export const getLocalizadorId = createSelector(
    getRootLocalizadorEditState,
    (state: RootLocalizadorEditState) => state.loaded ? state.loaded.value : null
);

export const getLocalizador = createSelector(
    schemaLocalizadorSelectors.getNormalizedEntities,
    getLocalizadorId,
    schemaLocalizadorSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getRootLocalizadorEditState,
    (state: RootLocalizadorEditState) => state.saving
);

export const getHasLoaded = createSelector(
    getRootLocalizadorEditState,
    (state: RootLocalizadorEditState) => state.loaded
);

export const getErrors = createSelector(
    getRootLocalizadorEditState,
    (state: RootLocalizadorEditState) => state.errors
);

export const getSetorId = createSelector(
    getRootLocalizadoresState,
    (state: RootLocalizadoresState) => (state.loaded && state.loaded.id === 'setorHandle') ? state.loaded.value : null
);

export const getSetor = createSelector(
    schemaSetorSelectors.getNormalizedEntities,
    getSetorId,
    schemaSetorSelectors.entityProjector
);
