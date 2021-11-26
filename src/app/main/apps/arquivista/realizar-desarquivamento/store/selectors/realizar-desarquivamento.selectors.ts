import {createSelector} from '@ngrx/store';

import {Processo} from '@cdk/models';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {processo as processoShema} from '@cdk/normalizr';
import {
    getRealizarDesarquivamentoAppState,
    RealizarDesarquivamentoAppState,
    RealizarDesarquivamentoState
} from '../reducers';
import {getProcessosIds} from '../../../arquivista-list/store';

const schemaRealizarDesarquivamentoSelectors = createSchemaSelectors<Processo>(processoShema);

export const getRealizarDesarquivamentoState: any = createSelector(
    getRealizarDesarquivamentoAppState,
    (state: RealizarDesarquivamentoAppState) => state.transicao
);

export const getProcessos: any = createSelector(
    schemaRealizarDesarquivamentoSelectors.getNormalizedEntities,
    getProcessosIds,
    schemaRealizarDesarquivamentoSelectors.entitiesProjector
);


export const getIsSaving: any = createSelector(
    getRealizarDesarquivamentoState,
    (state: RealizarDesarquivamentoState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getRealizarDesarquivamentoState,
    (state: RealizarDesarquivamentoState) => state.loaded
);

export const getErrors: any = createSelector(
    getRealizarDesarquivamentoState,
    (state: RealizarDesarquivamentoState) => state.errors
);
