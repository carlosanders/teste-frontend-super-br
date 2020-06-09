import {createSelector} from '@ngrx/store';
import {
    getMunicipioListAppState,
    MunicipioListAppState,
    MunicipioListState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {municipio as municipioSchema} from '@cdk/normalizr/municipio.schema';
import {Municipio} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Municipio>(municipioSchema);

export const getMunicipioListState = createSelector(
    getMunicipioListAppState,
    (state: MunicipioListAppState) => state.municipioList
);

export const getMunicipioListIds = createSelector(
    getMunicipioListState,
    (state: MunicipioListState) => state.entitiesId
);

export const getMunicipioList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getMunicipioListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getMunicipioListState,
    (state: MunicipioListState) => state.pagination
);

export const getMunicipioListLoaded = createSelector(
    getMunicipioListState,
    (state: MunicipioListState) => state.loaded
);

export const getIsLoading = createSelector(
    getMunicipioListState,
    (state: MunicipioListState) => state.loading
);
