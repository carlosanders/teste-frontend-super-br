import { createSelector } from '@ngrx/store';
import {
    getArquivistaAppState,
    ArquivistaAppState,
    ArquivistaState,
    ModalidadeTransicaoState
} from 'app/main/apps/arquivista/arquivista-list/store/reducers';

import { createSchemaSelectors } from '@cdk/ngrx-normalizr';
import { modalidadeTransicao as modalidadeTransicaoSchema } from '@cdk/normalizr';
import { ModalidadeTransicao } from '@cdk/models';

const schemaSelectors = createSchemaSelectors<ModalidadeTransicao>(modalidadeTransicaoSchema);

export const getModalidadeTransicaoState = createSelector(
    getArquivistaAppState,
    (state: ArquivistaAppState) => state.modalidadeTransicao
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
