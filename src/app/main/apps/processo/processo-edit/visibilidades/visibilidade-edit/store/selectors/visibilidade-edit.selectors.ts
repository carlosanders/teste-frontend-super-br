import {createSelector} from '@ngrx/store';
import {getVisibilidadeEditAppState, VisibilidadeEditAppState, VisibilidadeEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Visibilidade} from '@cdk/models';
import {visibilidade as visibilidadeSchema} from '@cdk/normalizr';

const schemaVisibilidadeSelectors = createSchemaSelectors<Visibilidade>(visibilidadeSchema);

export const getVisibilidadeEditState = createSelector(
    getVisibilidadeEditAppState,
    (state: VisibilidadeEditAppState) => state.visibilidade
);

export const getVisibilidadeId = createSelector(
    getVisibilidadeEditState,
    (state: VisibilidadeEditState) => state.loaded ? state.loaded.value : null
);

export const getVisibilidade = createSelector(
    schemaVisibilidadeSelectors.getNormalizedEntities,
    getVisibilidadeId,
    schemaVisibilidadeSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getVisibilidadeEditState,
    (state: VisibilidadeEditState) => state.saving
);

export const getHasLoaded = createSelector(
    getVisibilidadeEditState,
    (state: VisibilidadeEditState) => state.loaded
);

export const getErrors = createSelector(
    getVisibilidadeEditState,
    (state: VisibilidadeEditState) => state.errors
);
