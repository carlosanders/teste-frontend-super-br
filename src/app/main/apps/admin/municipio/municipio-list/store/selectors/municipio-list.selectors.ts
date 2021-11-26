import {createSelector} from '@ngrx/store';
import {getMunicipioListAppState, MunicipioListAppState, MunicipioListState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {municipio as municipioSchema} from '@cdk/normalizr';
import {Municipio} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Municipio>(municipioSchema);

export const getMunicipioListState: any = createSelector(
    getMunicipioListAppState,
    (state: MunicipioListAppState) => state.municipioList
);

export const getMunicipioListIds: any = createSelector(
    getMunicipioListState,
    (state: MunicipioListState) => state.entitiesId
);

export const getMunicipioList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getMunicipioListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getMunicipioListState,
    (state: MunicipioListState) => state.pagination
);

export const getMunicipioListLoaded: any = createSelector(
    getMunicipioListState,
    (state: MunicipioListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getMunicipioListState,
    (state: MunicipioListState) => state.loading
);

export const getDeletingErrors: any = createSelector(
    getMunicipioListState,
    (state: MunicipioListState) => state.deletingErrors
);
