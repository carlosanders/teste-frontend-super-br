import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Lembrete, Processo} from '@cdk/models';
import {processo as processoShema} from '@cdk/normalizr/processo.schema';
import {createSelector} from '@ngrx/store';
import {getDataPrevistaTransicaoAppState, DataPrevistaTransicaoAppState, DataPrevistaTransicaoState} from '../reducers';

const schemaDataPrevistaTransicaoSelectors = createSchemaSelectors<Processo>(processoShema);

export const getDataPrevistaTransicaoState = createSelector(
    getDataPrevistaTransicaoAppState,
    (state: DataPrevistaTransicaoAppState) => state.dataPrevistaTransicao
);

export const getDataPrevistaTransicaoId = createSelector(
    getDataPrevistaTransicaoState,
    (state: DataPrevistaTransicaoState) => state.loaded ? state.loaded.value : null
);

export const getDataPrevistaTransicaoList = createSelector(
    schemaDataPrevistaTransicaoSelectors.getNormalizedEntities,
    getDataPrevistaTransicaoId,
    schemaDataPrevistaTransicaoSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getDataPrevistaTransicaoState,
    (state: DataPrevistaTransicaoState) => state.saving
);

export const getHasLoaded = createSelector(
    getDataPrevistaTransicaoState,
    (state: DataPrevistaTransicaoState) => state.loaded
);

export const getErrors = createSelector(
    getDataPrevistaTransicaoState,
    (state: DataPrevistaTransicaoState) => state.errors
);