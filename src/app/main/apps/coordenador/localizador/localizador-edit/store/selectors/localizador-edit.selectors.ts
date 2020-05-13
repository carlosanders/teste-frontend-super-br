import {createSelector} from '@ngrx/store';
import {getLocalizadorEditAppState, LocalizadorEditAppState, LocalizadorEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Localizador} from '@cdk/models/localizador.model';
import {localizador as localizadorSchema} from '@cdk/normalizr/localizador.schema';
import {setor as setorSchema} from '@cdk/normalizr/setor.schema';
import {Setor} from '@cdk/models';
import {
    CoordenadorSetorAppState,
    CoordenadorSetorState,
    getCoordenadorSetorAppState
} from "../../../../setor/store/reducers";

const schemaLocalizadorSelectors = createSchemaSelectors<Localizador>(localizadorSchema);
const schemaSetorSelectors = createSchemaSelectors<Setor>(setorSchema);

export const getLocalizadorEditState = createSelector(
    getLocalizadorEditAppState,
    (state: LocalizadorEditAppState) => state.localizador
);

export const getLocalizadorId = createSelector(
    getLocalizadorEditState,
    (state: LocalizadorEditState) => state.loaded ? state.loaded.value : null
);

export const getLocalizador = createSelector(
    schemaLocalizadorSelectors.getNormalizedEntities,
    getLocalizadorId,
    schemaLocalizadorSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getLocalizadorEditState,
    (state: LocalizadorEditState) => state.saving
);

export const getHasLoaded = createSelector(
    getLocalizadorEditState,
    (state: LocalizadorEditState) => state.loaded
);

export const getErrors = createSelector(
    getLocalizadorEditState,
    (state: LocalizadorEditState) => state.errors
);

export const getCoordenadorSetorState = createSelector(
    getCoordenadorSetorAppState,
    (state: CoordenadorSetorAppState) => state.setor
);

export const getSetorId = createSelector(
    getCoordenadorSetorState,
    (state: CoordenadorSetorState) => (state.loaded && state.loaded.id === 'setorHandle') ? state.loaded.value : null
);

export const getSetor = createSelector(
    schemaSetorSelectors.getNormalizedEntities,
    getSetorId,
    schemaSetorSelectors.entityProjector
);
