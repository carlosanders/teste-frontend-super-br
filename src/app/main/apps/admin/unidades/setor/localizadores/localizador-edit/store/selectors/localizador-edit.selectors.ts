import {createSelector} from '@ngrx/store';
import {getRootLocalizadorEditAppState, RootLocalizadorEditAppState, RootLocalizadorEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Localizador} from '@cdk/models/localizador.model';
import {localizador as localizadorSchema, setor as setorSchema} from '@cdk/normalizr';
import {getRootLocalizadoresState} from '../../../store/selectors';
import {RootLocalizadoresState} from '../../../store/reducers';
import {Setor} from '@cdk/models';

const schemaLocalizadorSelectors = createSchemaSelectors<Localizador>(localizadorSchema);
const schemaSetorSelectors = createSchemaSelectors<Setor>(setorSchema);

export const getRootLocalizadorEditState: any = createSelector(
    getRootLocalizadorEditAppState,
    (state: RootLocalizadorEditAppState) => state.localizador
);

export const getLocalizadorId: any = createSelector(
    getRootLocalizadorEditState,
    (state: RootLocalizadorEditState) => state.loaded ? state.loaded.value : null
);

export const getLocalizador: any = createSelector(
    schemaLocalizadorSelectors.getNormalizedEntities,
    getLocalizadorId,
    schemaLocalizadorSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getRootLocalizadorEditState,
    (state: RootLocalizadorEditState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getRootLocalizadorEditState,
    (state: RootLocalizadorEditState) => state.loaded
);

export const getErrors: any = createSelector(
    getRootLocalizadorEditState,
    (state: RootLocalizadorEditState) => state.errors
);

export const getSetorId: any = createSelector(
    getRootLocalizadoresState,
    (state: RootLocalizadoresState) => (state.loaded && state.loaded.id === 'setorHandle') ? state.loaded.value : null
);

export const getSetor: any = createSelector(
    schemaSetorSelectors.getNormalizedEntities,
    getSetorId,
    schemaSetorSelectors.entityProjector
);
