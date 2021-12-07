import {createSelector} from '@ngrx/store';
import {getRootLocalizadoresAppState, RootLocalizadoresAppState, RootLocalizadoresState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Setor} from '@cdk/models';
import {setor as setorSchema} from '@cdk/normalizr';

const schemaSetorSelectors = createSchemaSelectors<Setor>(setorSchema);

export const getRootLocalizadoresState: any = createSelector(
    getRootLocalizadoresAppState,
    (state: RootLocalizadoresAppState) => state.localizador
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

export const getHasLoadedSetor: any = createSelector(
    getRootLocalizadoresState,
    (state: RootLocalizadoresState) => state.loaded.id === 'setorHandle' ? state.loaded : false
);

export const getErrors: any = createSelector(
    getRootLocalizadoresState,
    (state: RootLocalizadoresState) => state.errors
);
