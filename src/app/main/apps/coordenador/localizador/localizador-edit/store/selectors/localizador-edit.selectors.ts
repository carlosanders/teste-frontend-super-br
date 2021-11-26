import {createSelector} from '@ngrx/store';
import {getLocalizadorEditAppState, LocalizadorEditAppState, LocalizadorEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Localizador} from '@cdk/models/localizador.model';
import {localizador as localizadorSchema, setor as setorSchema} from '@cdk/normalizr';
import {Setor} from '@cdk/models';
import {
    CoordenadorSetorAppState,
    CoordenadorSetorState,
    getCoordenadorSetorAppState
} from '../../../../setor/store/reducers';

const schemaLocalizadorSelectors = createSchemaSelectors<Localizador>(localizadorSchema);
const schemaSetorSelectors = createSchemaSelectors<Setor>(setorSchema);

export const getLocalizadorEditState: any = createSelector(
    getLocalizadorEditAppState,
    (state: LocalizadorEditAppState) => state.localizador
);

export const getLocalizadorId: any = createSelector(
    getLocalizadorEditState,
    (state: LocalizadorEditState) => state.loaded ? state.loaded.value : null
);

export const getLocalizador: any = createSelector(
    schemaLocalizadorSelectors.getNormalizedEntities,
    getLocalizadorId,
    schemaLocalizadorSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getLocalizadorEditState,
    (state: LocalizadorEditState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getLocalizadorEditState,
    (state: LocalizadorEditState) => state.loaded
);

export const getErrors: any = createSelector(
    getLocalizadorEditState,
    (state: LocalizadorEditState) => state.errors
);

export const getCoordenadorSetorState: any = createSelector(
    getCoordenadorSetorAppState,
    (state: CoordenadorSetorAppState) => state.setor
);

export const getSetorId: any = createSelector(
    getCoordenadorSetorState,
    (state: CoordenadorSetorState) => (state.loaded && state.loaded.id === 'setorHandle') ? state.loaded.value : null
);

export const getSetor: any = createSelector(
    schemaSetorSelectors.getNormalizedEntities,
    getSetorId,
    schemaSetorSelectors.entityProjector
);
