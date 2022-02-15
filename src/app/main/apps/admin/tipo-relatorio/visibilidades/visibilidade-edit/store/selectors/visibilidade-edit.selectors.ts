import {createSelector} from '@ngrx/store';
import {getVisibilidadeEditAppState, VisibilidadeEditAppState, VisibilidadeEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Visibilidade} from '@cdk/models';
import {visibilidade as visibilidadeSchema} from '@cdk/normalizr';

const schemaVisibilidadeSelectors = createSchemaSelectors<Visibilidade>(visibilidadeSchema);

export const getVisibilidadeEditState: any = createSelector(
    getVisibilidadeEditAppState,
    (state: VisibilidadeEditAppState) => state.visibilidade
);

export const getVisibilidadeId: any = createSelector(
    getVisibilidadeEditState,
    (state: VisibilidadeEditState) => state.loaded ? state.loaded.value : null
);

export const getVisibilidade: any = createSelector(
    schemaVisibilidadeSelectors.getNormalizedEntities,
    getVisibilidadeId,
    schemaVisibilidadeSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getVisibilidadeEditState,
    (state: VisibilidadeEditState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getVisibilidadeEditState,
    (state: VisibilidadeEditState) => state.loaded
);

export const getErrors: any = createSelector(
    getVisibilidadeEditState,
    (state: VisibilidadeEditState) => state.errors
);
