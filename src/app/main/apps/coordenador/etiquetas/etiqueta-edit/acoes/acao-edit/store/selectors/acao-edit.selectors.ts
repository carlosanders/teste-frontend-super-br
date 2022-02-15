import {createSelector} from '@ngrx/store';
import {AcaoEditAppState, AcaoEditState, getAcaoEditAppState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Acao} from '@cdk/models';
import {acao as acaoSchema} from '@cdk/normalizr';

const schemaAcaoSelectors = createSchemaSelectors<Acao>(acaoSchema);

export const getAcaoEditState: any = createSelector(
    getAcaoEditAppState,
    (state: AcaoEditAppState) => state.acao
);

export const getAcaoId: any = createSelector(
    getAcaoEditState,
    (state: AcaoEditState) => state.loaded ? state.loaded.value : null
);

export const getAcao: any = createSelector(
    schemaAcaoSelectors.getNormalizedEntities,
    getAcaoId,
    schemaAcaoSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getAcaoEditState,
    (state: AcaoEditState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getAcaoEditState,
    (state: AcaoEditState) => state.loaded
);

export const getErrors: any = createSelector(
    getAcaoEditState,
    (state: AcaoEditState) => state.errors
);
