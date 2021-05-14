import { createSelector } from '@ngrx/store';

import { createSchemaSelectors } from '@cdk/ngrx-normalizr';
import { modalidadeTransicao as modalidadeTransicaoSchema } from '@cdk/normalizr';
import { ModalidadeTransicao } from '@cdk/models';
import {
    getRegistrarExtravioAppState,
    ModalidadeExtravioState,
    RegistrarExtravioAppState
} from "../reducers";

const schemaSelectors = createSchemaSelectors<ModalidadeTransicao>(modalidadeTransicaoSchema);

export const getModalidadeExtravioState = createSelector(
    getRegistrarExtravioAppState,
    (state: RegistrarExtravioAppState) => state.modalidadeExtravio
);

export const getModalidadeTransicaoId = createSelector(
    getModalidadeExtravioState,
    (state: ModalidadeExtravioState) => state.modalidadeTransicaoId
);

export const getModalidadeTransicao = createSelector(
    schemaSelectors.getNormalizedEntities,
    getModalidadeTransicaoId,
    schemaSelectors.entityProjector
);

export const getModalidadeTransicaoLoaded = createSelector(
    getModalidadeExtravioState,
    (state: ModalidadeExtravioState) => state.loaded
);

export const getIsLoadingModalidadeTransicao = createSelector(
    getModalidadeExtravioState,
    (state: ModalidadeExtravioState) => state.loading
);
