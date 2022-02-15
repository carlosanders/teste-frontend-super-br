import {createSelector} from '@ngrx/store';
import {DadosBasicosAppState, DadosBasicosState, getDadosBasicosAppState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Processo} from '@cdk/models';
import {processo as processoSchema} from '@cdk/normalizr';

const schemaProcessoSelectors = createSchemaSelectors<Processo>(processoSchema);

export const getDadosBasicosState: any = createSelector(
    getDadosBasicosAppState,
    (state: DadosBasicosAppState) => state.dadosBasicos
);

export const getProcessoId: any = createSelector(
    getDadosBasicosState,
    (state: DadosBasicosState) => state.loaded && state.loaded.value !== 'criar' ? state.loaded.value : null
);

export const getProcesso: any = createSelector(
    schemaProcessoSelectors.getNormalizedEntities,
    getProcessoId,
    schemaProcessoSelectors.entityProjector
);

export const getProcessoLoaded: any = createSelector(
    getDadosBasicosState,
    (state: DadosBasicosState) => state.loaded
);

export const getIsSaving: any = createSelector(
    getDadosBasicosState,
    (state: DadosBasicosState) => state.saving
);

export const getErrors: any = createSelector(
    getDadosBasicosState,
    (state: DadosBasicosState) => state.errors
);
