import {createSelector} from '@ngrx/store';

import {Processo} from '@cdk/models';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {processo as processoShema} from '@cdk/normalizr';
import {getRegistrarExtravioAppState, RegistrarExtravioAppState, RegistrarExtravioState} from '../reducers';
import {getProcessosIds} from '../../../arquivista-list/store';

const schemaRegistrarExtravioSelectors = createSchemaSelectors<Processo>(processoShema);

export const getRegistrarExtravioState: any = createSelector(
    getRegistrarExtravioAppState,
    (state: RegistrarExtravioAppState) => state.transicao
);

export const getProcessos: any = createSelector(
    schemaRegistrarExtravioSelectors.getNormalizedEntities,
    getProcessosIds,
    schemaRegistrarExtravioSelectors.entitiesProjector
);


export const getIsSaving: any = createSelector(
    getRegistrarExtravioState,
    (state: RegistrarExtravioState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getRegistrarExtravioState,
    (state: RegistrarExtravioState) => state.loaded
);

export const getErrors: any = createSelector(
    getRegistrarExtravioState,
    (state: RegistrarExtravioState) => state.errors
);
