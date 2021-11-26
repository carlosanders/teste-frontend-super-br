import {createSelector} from '@ngrx/store';

import {Processo} from '@cdk/models';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {processo as processoShema} from '@cdk/normalizr';
import {getRealizarTransicaoAppState, RealizarTransicaoAppState, RealizarTransicaoState} from '../reducers';
import {getProcessosIds} from '../../../arquivista-list/store';

const schemaRealizarTransicaoSelectors = createSchemaSelectors<Processo>(processoShema);

export const getRealizarTransicaoState: any = createSelector(
    getRealizarTransicaoAppState,
    (state: RealizarTransicaoAppState) => state.transicao
);

export const getProcessos: any = createSelector(
    schemaRealizarTransicaoSelectors.getNormalizedEntities,
    getProcessosIds,
    schemaRealizarTransicaoSelectors.entitiesProjector
);


export const getIsSaving: any = createSelector(
    getRealizarTransicaoState,
    (state: RealizarTransicaoState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getRealizarTransicaoState,
    (state: RealizarTransicaoState) => state.loaded
);

export const getErrors: any = createSelector(
    getRealizarTransicaoState,
    (state: RealizarTransicaoState) => state.errors
);
