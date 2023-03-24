import {createSelector} from '@ngrx/store';
import {NavioEditAppState, NavioEditState, getNavioEditAppState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Navio} from '../../../../../../../@cdk/models/navio.model';
import {navio as navioSchema} from '../../../../../../../@cdk/normalizr';

const schemaNavioSelectors = createSchemaSelectors<Navio>(navioSchema);

export const getNavioEditState: any = createSelector(
    getNavioEditAppState,
    (state: NavioEditAppState) => state.navio
);

export const getNavioId: any = createSelector(
    getNavioEditState,
    (state: NavioEditState) => state.entityId
);

export const getNavio: any = createSelector(
    schemaNavioSelectors.getNormalizedEntities,
    getNavioId,
    schemaNavioSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getNavioEditState,
    (state: NavioEditState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getNavioEditState,
    (state: NavioEditState) => state.loaded
);

export const getErrors: any = createSelector(
    getNavioEditState,
    (state: NavioEditState) => state.errors
);
