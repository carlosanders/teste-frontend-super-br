import {createSelector} from '@ngrx/store';
import {getMunicipioEditAppState, MunicipioEditAppState, MunicipioEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Municipio} from '@cdk/models';
import {municipio as municipioSchema} from '@cdk/normalizr/municipio.schema';

const schemaMunicipioSelectors = createSchemaSelectors<Municipio>(municipioSchema);

export const getMunicipioEditState = createSelector(
    getMunicipioEditAppState,
    (state: MunicipioEditAppState) => state.municipio
);

export const getMunicipioId = createSelector(
    getMunicipioEditState,
    (state: MunicipioEditState) => state.entityId
);

export const getMunicipio = createSelector(
    schemaMunicipioSelectors.getNormalizedEntities,
    getMunicipioId,
    schemaMunicipioSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getMunicipioEditState,
    (state: MunicipioEditState) => state.saving
);

export const getHasLoaded = createSelector(
    getMunicipioEditState,
    (state: MunicipioEditState) => state.loaded
);

export const getErrors = createSelector(
    getMunicipioEditState,
    (state: MunicipioEditState) => state.errors
);
