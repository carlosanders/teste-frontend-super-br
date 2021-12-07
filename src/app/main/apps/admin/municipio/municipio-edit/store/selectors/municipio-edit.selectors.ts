import {createSelector} from '@ngrx/store';
import {getMunicipioEditAppState, MunicipioEditAppState, MunicipioEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Municipio} from '@cdk/models';
import {municipio as municipioSchema} from '@cdk/normalizr';

const schemaMunicipioSelectors = createSchemaSelectors<Municipio>(municipioSchema);

export const getMunicipioEditState: any = createSelector(
    getMunicipioEditAppState,
    (state: MunicipioEditAppState) => state.municipio
);

export const getMunicipioId: any = createSelector(
    getMunicipioEditState,
    (state: MunicipioEditState) => state.entityId
);

export const getMunicipio: any = createSelector(
    schemaMunicipioSelectors.getNormalizedEntities,
    getMunicipioId,
    schemaMunicipioSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getMunicipioEditState,
    (state: MunicipioEditState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getMunicipioEditState,
    (state: MunicipioEditState) => state.loaded
);

export const getErrors: any = createSelector(
    getMunicipioEditState,
    (state: MunicipioEditState) => state.errors
);
