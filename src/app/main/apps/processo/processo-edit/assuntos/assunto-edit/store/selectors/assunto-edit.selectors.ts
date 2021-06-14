import {createSelector} from '@ngrx/store';
import {AssuntoEditAppState, AssuntoEditState, getAssuntoEditAppState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Assunto} from '@cdk/models';
import {assunto as assuntoSchema} from '@cdk/normalizr';

const schemaAssuntoSelectors = createSchemaSelectors<Assunto>(assuntoSchema);

export const getAssuntoEditState = createSelector(
    getAssuntoEditAppState,
    (state: AssuntoEditAppState) => state.assunto
);

export const getAssuntoId = createSelector(
    getAssuntoEditState,
    (state: AssuntoEditState) => state.loaded ? state.loaded.value : null
);

export const getAssunto = createSelector(
    schemaAssuntoSelectors.getNormalizedEntities,
    getAssuntoId,
    schemaAssuntoSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getAssuntoEditState,
    (state: AssuntoEditState) => state.saving
);

export const getHasLoaded = createSelector(
    getAssuntoEditState,
    (state: AssuntoEditState) => state.loaded
);

export const getErrors = createSelector(
    getAssuntoEditState,
    (state: AssuntoEditState) => state.errors
);
