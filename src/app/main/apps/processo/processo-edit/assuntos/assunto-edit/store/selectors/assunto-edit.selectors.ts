import {createSelector} from '@ngrx/store';
import {AssuntoEditAppState, AssuntoEditState, getAssuntoEditAppState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Assunto} from '@cdk/models';
import {assunto as assuntoSchema} from '@cdk/normalizr';

const schemaAssuntoSelectors = createSchemaSelectors<Assunto>(assuntoSchema);

export const getAssuntoEditState: any = createSelector(
    getAssuntoEditAppState,
    (state: AssuntoEditAppState) => state.assunto
);

export const getAssuntoId: any = createSelector(
    getAssuntoEditState,
    (state: AssuntoEditState) => state.loaded ? state.loaded.value : null
);

export const getAssunto: any = createSelector(
    schemaAssuntoSelectors.getNormalizedEntities,
    getAssuntoId,
    schemaAssuntoSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getAssuntoEditState,
    (state: AssuntoEditState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getAssuntoEditState,
    (state: AssuntoEditState) => state.loaded
);

export const getErrors: any = createSelector(
    getAssuntoEditState,
    (state: AssuntoEditState) => state.errors
);
