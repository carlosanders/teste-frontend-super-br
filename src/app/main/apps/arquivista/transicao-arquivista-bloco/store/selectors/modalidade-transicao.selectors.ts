import { createSelector } from '@ngrx/store';
import {
    getTransicaoArquivistaBlocoAppState,
    TransicaoArquivistaBlocoAppState,
    ModalidadeTransicaoState
} from '../reducers';

import { createSchemaSelectors } from '@cdk/ngrx-normalizr';
import { modalidadeTransicao as modalidadeTransicaoSchema } from '@cdk/normalizr';
import { ModalidadeTransicao } from '@cdk/models';

const schemaSelectors = createSchemaSelectors<ModalidadeTransicao>(modalidadeTransicaoSchema);

export const getModalidadeTransicaoState = createSelector(
    getTransicaoArquivistaBlocoAppState,
    (state: TransicaoArquivistaBlocoAppState) => state.modalidadeTransicao
);

export const getModalidadeTransicaoId = createSelector(
    getModalidadeTransicaoState,
    (state: ModalidadeTransicaoState) => state.modalidadeTransicaoId
);

export const getModalidadeTransicao = createSelector(
    schemaSelectors.getNormalizedEntities,
    getModalidadeTransicaoId,
    schemaSelectors.entityProjector
);

export const getModalidadeTransicaoLoaded = createSelector(
    getModalidadeTransicaoState,
    (state: ModalidadeTransicaoState) => state.loaded
);

export const getIsLoadingModalidadeTransicao = createSelector(
    getModalidadeTransicaoState,
    (state: ModalidadeTransicaoState) => state.loading
);
