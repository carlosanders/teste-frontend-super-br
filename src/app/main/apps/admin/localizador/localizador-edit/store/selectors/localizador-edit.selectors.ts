import {createSelector} from '@ngrx/store';
import {getLocalizadorEditAppState, LocalizadorEditAppState, LocalizadorEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Localizador} from '@cdk/models/localizador.model';
import {localizador as localizadorSchema} from '@cdk/normalizr/localizador.schema';

const schemaLocalizadorSelectors = createSchemaSelectors<Localizador>(localizadorSchema);

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
