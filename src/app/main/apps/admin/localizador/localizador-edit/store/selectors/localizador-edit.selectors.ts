import {createSelector} from '@ngrx/store';
import {getLocalizadorEditAppState, LocalizadorEditAppState, LocalizadorEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Localizador} from '@cdk/models/localizador.model';
import {localizador as localizadorSchema} from '@cdk/normalizr/localizador.schema';
import {setor as setorSchema} from '@cdk/normalizr/setor.schema';
import {getLocalizadorState} from "../../../store/selectors";
import {LocalizadorState} from "../../../store/reducers";
import {Setor} from '@cdk/models';

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

export const getSetorId = createSelector(
    getLocalizadorState,
    (state: LocalizadorState) => (state.loaded && state.loaded.id === 'setorHandle') ? state.loaded.value : null
);

export const getSetor = createSelector(
    schemaSetorSelectors.getNormalizedEntities,
    getSetorId,
    schemaSetorSelectors.entityProjector
);
