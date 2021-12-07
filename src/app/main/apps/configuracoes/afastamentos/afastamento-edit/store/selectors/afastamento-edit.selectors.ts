import {createSelector} from '@ngrx/store';
import {AfastamentoEditAppState, AfastamentoEditState, getAfastamentoEditAppState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Afastamento} from '@cdk/models';
import {afastamento as afastamentoSchema} from '@cdk/normalizr';

const schemaAfastamentoSelectors = createSchemaSelectors<Afastamento>(afastamentoSchema);

export const getAfastamentoEditState: any = createSelector(
    getAfastamentoEditAppState,
    (state: AfastamentoEditAppState) => state.afastamento
);

export const getAfastamentoId: any = createSelector(
    getAfastamentoEditState,
    (state: AfastamentoEditState) => state.loaded ? state.loaded.value : null
);

export const getAfastamento: any = createSelector(
    schemaAfastamentoSelectors.getNormalizedEntities,
    getAfastamentoId,
    schemaAfastamentoSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getAfastamentoEditState,
    (state: AfastamentoEditState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getAfastamentoEditState,
    (state: AfastamentoEditState) => state.loaded
);

export const getErrors: any = createSelector(
    getAfastamentoEditState,
    (state: AfastamentoEditState) => state.errors
);
