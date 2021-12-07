import {createSelector} from '@ngrx/store';
import {getSetorEditAppState, SetorEditAppState, SetorEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Setor} from '@cdk/models/setor.model';
import {setor as setorSchema} from '@cdk/normalizr';
import {getSetorAppState, SetorAppState, SetorState} from '../../../store/reducers';

const schemaSetorSelectors = createSchemaSelectors<Setor>(setorSchema);

export const getSetorEditState: any = createSelector(
    getSetorEditAppState,
    (state: SetorEditAppState) => state.setor
);

export const getSetorState: any = createSelector(
    getSetorAppState,
    (state: SetorAppState) => state.setor
);

export const getSetorId: any = createSelector(
    getSetorEditState,
    (state: SetorEditState) => state.loaded ? state.loaded.value : null
);

export const getUnidadeId: any = createSelector(
    getSetorState,
    (state: SetorState) => state.loaded ? state.loaded.value : null
);

export const getUnidade: any = createSelector(
    schemaSetorSelectors.getNormalizedEntities,
    getUnidadeId,
    schemaSetorSelectors.entityProjector
);

export const getSetor: any = createSelector(
    schemaSetorSelectors.getNormalizedEntities,
    getSetorId,
    schemaSetorSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getSetorEditState,
    (state: SetorEditState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getSetorEditState,
    (state: SetorEditState) => state.loaded
);

export const getHasLoadedUnidade: any = createSelector(
    getSetorState,
    (state: SetorState) => state.loaded
);

export const getErrors: any = createSelector(
    getSetorEditState,
    (state: SetorEditState) => state.errors
);
