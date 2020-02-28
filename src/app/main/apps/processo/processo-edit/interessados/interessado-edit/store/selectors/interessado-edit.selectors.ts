import {createSelector} from '@ngrx/store';
import {getInteressadoEditAppState, InteressadoEditAppState, InteressadoEditState} from 'app/main/apps/processo/processo-edit/interessados/interessado-edit/store/reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Interessado} from '@cdk/models';
import {interessado as interessadoSchema} from '@cdk/normalizr/interessado.schema';

const schemaInteressadoSelectors = createSchemaSelectors<Interessado>(interessadoSchema);

export const getInteressadoEditState = createSelector(
    getInteressadoEditAppState,
    (state: InteressadoEditAppState) => state.interessado
);

export const getInteressadoId = createSelector(
    getInteressadoEditState,
    (state: InteressadoEditState) => state.loaded ? state.loaded.value : null
);

export const getInteressado = createSelector(
    schemaInteressadoSelectors.getNormalizedEntities,
    getInteressadoId,
    schemaInteressadoSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getInteressadoEditState,
    (state: InteressadoEditState) => state.saving
);

export const getHasLoaded = createSelector(
    getInteressadoEditState,
    (state: InteressadoEditState) => state.loaded
);

export const getErrors = createSelector(
    getInteressadoEditState,
    (state: InteressadoEditState) => state.errors
);
