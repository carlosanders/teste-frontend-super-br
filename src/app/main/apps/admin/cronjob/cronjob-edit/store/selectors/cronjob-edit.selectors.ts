import {createSelector} from '@ngrx/store';
import {CronjobEditAppState, CronjobEditState, getCronjobEditAppState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Cronjob} from '@cdk/models';
import {cronjob as cronjobSchema} from '@cdk/normalizr';

const schemaCronjobSelectors = createSchemaSelectors<Cronjob>(cronjobSchema);

export const getCronjobEditState: any = createSelector(
    getCronjobEditAppState,
    (state: CronjobEditAppState) => state.cronjob
);

export const getCronjobId: any = createSelector(
    getCronjobEditState,
    (state: CronjobEditState) => state.entityId
);

export const getCronjob: any = createSelector(
    schemaCronjobSelectors.getNormalizedEntities,
    getCronjobId,
    schemaCronjobSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getCronjobEditState,
    (state: CronjobEditState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getCronjobEditState,
    (state: CronjobEditState) => state.loaded
);

export const getErrors: any = createSelector(
    getCronjobEditState,
    (state: CronjobEditState) => state.errors
);
