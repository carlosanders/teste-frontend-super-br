import {createSelector} from '@ngrx/store';
import {
    ArquivistaAppState,
    getArquivistaAppState,
    ModalidadeTransicaoState
} from 'app/main/apps/arquivista/arquivista-list/store/reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {modalidadeTransicao as modalidadeTransicaoSchema} from '@cdk/normalizr';
import {ModalidadeTransicao} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<ModalidadeTransicao>(modalidadeTransicaoSchema);

export const getModalidadeTransicaoState: any = createSelector(
    getArquivistaAppState,
    (state: ArquivistaAppState) => state.modalidadeTransicao
);

export const getModalidadeTransicaoId: any = createSelector(
    getModalidadeTransicaoState,
    (state: ModalidadeTransicaoState) => state.modalidadeTransicaoId
);

export const getModalidadeTransicao: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getModalidadeTransicaoId,
    schemaSelectors.entityProjector
);

export const getModalidadeTransicaoLoaded: any = createSelector(
    getModalidadeTransicaoState,
    (state: ModalidadeTransicaoState) => state.loaded
);

export const getIsLoadingModalidadeTransicao: any = createSelector(
    getModalidadeTransicaoState,
    (state: ModalidadeTransicaoState) => state.loading
);
