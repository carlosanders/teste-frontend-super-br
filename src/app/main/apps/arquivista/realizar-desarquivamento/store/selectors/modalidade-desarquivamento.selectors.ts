import { createSelector } from '@ngrx/store';

import { createSchemaSelectors } from '@cdk/ngrx-normalizr';
import { modalidadeTransicao as modalidadeTransicaoSchema } from '@cdk/normalizr';
import { ModalidadeTransicao } from '@cdk/models';
import {
    getRealizarDesarquivamentoAppState,
    ModalidadeDesarquivamentoState,
    RealizarDesarquivamentoAppState
} from '../reducers';

const schemaSelectors = createSchemaSelectors<ModalidadeTransicao>(modalidadeTransicaoSchema);

export const getModalidadeDesarquivamentoState = createSelector(
    getRealizarDesarquivamentoAppState,
    (state: RealizarDesarquivamentoAppState) => state.modalidadeDesarquivamento
);

export const getModalidadeTransicaoId = createSelector(
    getModalidadeDesarquivamentoState,
    (state: ModalidadeDesarquivamentoState) => state.modalidadeTransicaoId
);

export const getModalidadeTransicao = createSelector(
    schemaSelectors.getNormalizedEntities,
    getModalidadeTransicaoId,
    schemaSelectors.entityProjector
);

export const getModalidadeTransicaoLoaded = createSelector(
    getModalidadeDesarquivamentoState,
    (state: ModalidadeDesarquivamentoState) => state.loaded
);

export const getIsLoadingModalidadeTransicao = createSelector(
    getModalidadeDesarquivamentoState,
    (state: ModalidadeDesarquivamentoState) => state.loading
);
