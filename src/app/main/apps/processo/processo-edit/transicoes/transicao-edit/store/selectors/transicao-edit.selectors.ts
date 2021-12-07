import {createSelector} from '@ngrx/store';
import {getTransicaoEditAppState, TransicaoEditAppState, TransicaoEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Transicao} from '@cdk/models';
import {transicao as transicaoSchema} from '@cdk/normalizr';

const schemaTransicaoSelectors = createSchemaSelectors<Transicao>(transicaoSchema);

export const getTransicaoEditState: any = createSelector(
    getTransicaoEditAppState,
    (state: TransicaoEditAppState) => state.transicao
);

export const getTransicaoId: any = createSelector(
    getTransicaoEditState,
    (state: TransicaoEditState) => state.loaded ? state.loaded.value : null
);

export const getTransicao: any = createSelector(
    schemaTransicaoSelectors.getNormalizedEntities,
    getTransicaoId,
    schemaTransicaoSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getTransicaoEditState,
    (state: TransicaoEditState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getTransicaoEditState,
    (state: TransicaoEditState) => state.loaded
);

export const getErrors: any = createSelector(
    getTransicaoEditState,
    (state: TransicaoEditState) => state.errors
);
