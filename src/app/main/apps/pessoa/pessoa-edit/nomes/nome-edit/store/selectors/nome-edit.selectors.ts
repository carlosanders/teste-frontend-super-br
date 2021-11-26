import {createSelector} from '@ngrx/store';
import {getNomeEditAppState, NomeEditAppState, NomeEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Nome} from '@cdk/models';
import {nome as nomeSchema} from '@cdk/normalizr';

const schemaNomeSelectors = createSchemaSelectors<Nome>(nomeSchema);

export const getNomeEditState: any = createSelector(
    getNomeEditAppState,
    (state: NomeEditAppState) => state.nome
);

export const getNomeId: any = createSelector(
    getNomeEditState,
    (state: NomeEditState) => state.loaded ? state.loaded.value : null
);

export const getNome: any = createSelector(
    schemaNomeSelectors.getNormalizedEntities,
    getNomeId,
    schemaNomeSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getNomeEditState,
    (state: NomeEditState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getNomeEditState,
    (state: NomeEditState) => state.loaded
);

export const getErrors: any = createSelector(
    getNomeEditState,
    (state: NomeEditState) => state.errors
);
