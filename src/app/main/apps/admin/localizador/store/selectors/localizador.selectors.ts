import {createSelector} from '@ngrx/store';
import {getLocalizadorAppState, LocalizadorAppState, LocalizadorState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Setor} from '@cdk/models';
import {setor as setorSchema} from '@cdk/normalizr/setor.schema';

const schemaSetorSelectors = createSchemaSelectors<Setor>(setorSchema);

export const getLocalizadorState = createSelector(
    getLocalizadorAppState,
    (state: LocalizadorAppState) => state.localizador
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

export const getHasLoadedSetor = createSelector(
    getLocalizadorState,
    (state: LocalizadorState) => state.loaded.id === 'setorHandle' ? state.loaded : false
);

export const getErrors = createSelector(
    getLocalizadorState,
    (state: LocalizadorState) => state.errors
);
