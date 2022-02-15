import {createSelector} from '@ngrx/store';
import {CargoEditAppState, CargoEditState, getCargoEditAppState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Cargo} from '@cdk/models';
import {cargo as cargoSchema} from '@cdk/normalizr';

const schemaCargoSelectors = createSchemaSelectors<Cargo>(cargoSchema);

export const getCargoEditState: any = createSelector(
    getCargoEditAppState,
    (state: CargoEditAppState) => state.cargo
);

export const getCargoId: any = createSelector(
    getCargoEditState,
    (state: CargoEditState) => state.entityId
);

export const getCargo: any = createSelector(
    schemaCargoSelectors.getNormalizedEntities,
    getCargoId,
    schemaCargoSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getCargoEditState,
    (state: CargoEditState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getCargoEditState,
    (state: CargoEditState) => state.loaded
);

export const getErrors: any = createSelector(
    getCargoEditState,
    (state: CargoEditState) => state.errors
);
