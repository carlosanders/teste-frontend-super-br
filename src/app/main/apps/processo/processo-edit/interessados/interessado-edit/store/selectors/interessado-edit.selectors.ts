import {createSelector} from '@ngrx/store';
import {
    getInteressadoEditAppState,
    InteressadoEditAppState,
    InteressadoEditState
} from 'app/main/apps/processo/processo-edit/interessados/interessado-edit/store/reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Interessado} from '@cdk/models';
import {interessado as interessadoSchema} from '@cdk/normalizr';

const schemaInteressadoSelectors = createSchemaSelectors<Interessado>(interessadoSchema);

export const getInteressadoEditState: any = createSelector(
    getInteressadoEditAppState,
    (state: InteressadoEditAppState) => state.interessado
);

export const getInteressadoId: any = createSelector(
    getInteressadoEditState,
    (state: InteressadoEditState) => state.loaded ? state.loaded.value : null
);

export const getInteressado: any = createSelector(
    schemaInteressadoSelectors.getNormalizedEntities,
    getInteressadoId,
    schemaInteressadoSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getInteressadoEditState,
    (state: InteressadoEditState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getInteressadoEditState,
    (state: InteressadoEditState) => state.loaded
);

export const getErrors: any = createSelector(
    getInteressadoEditState,
    (state: InteressadoEditState) => state.errors
);
