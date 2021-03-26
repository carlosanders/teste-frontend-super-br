import {createSelector} from '@ngrx/store';
import {getCargoEditAppState, CargoEditAppState, CargoEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Cargo} from '@cdk/models';
import {cargo as cargoSchema} from '@cdk/normalizr';

const schemaCargoSelectors = createSchemaSelectors<Cargo>(cargoSchema);

export const getCargoEditState = createSelector(
    getCargoEditAppState,
    (state: CargoEditAppState) => state.cargo
);

export const getCargoId = createSelector(
    getCargoEditState,
    (state: CargoEditState) => state.entityId
);

export const getCargo = createSelector(
    schemaCargoSelectors.getNormalizedEntities,
    getCargoId,
    schemaCargoSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getCargoEditState,
    (state: CargoEditState) => state.saving
);

export const getHasLoaded = createSelector(
    getCargoEditState,
    (state: CargoEditState) => state.loaded
);

export const getErrors = createSelector(
    getCargoEditState,
    (state: CargoEditState) => state.errors
);
