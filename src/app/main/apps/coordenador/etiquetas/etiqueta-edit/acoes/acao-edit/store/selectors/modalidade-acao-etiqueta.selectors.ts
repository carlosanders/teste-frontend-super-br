import {createSelector} from '@ngrx/store';
import {
    getAcaoEditAppState,
    AcaoEditAppState,
    ModalidadeAcaoEtiquetaState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {modalidadeAcaoEtiqueta as modalidadeAcaoEtiquetaSchema} from '@cdk/normalizr';
import {ModalidadeAcaoEtiqueta} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<ModalidadeAcaoEtiqueta>(modalidadeAcaoEtiquetaSchema);

export const getModalidadeAcaoEtiquetaListState = createSelector(
    getAcaoEditAppState,
    (state: AcaoEditAppState) => state.modalidadeAcaoEtiquetaList
);

export const getModalidadeAcaoEtiquetaListIds = createSelector(
    getModalidadeAcaoEtiquetaListState,
    (state: ModalidadeAcaoEtiquetaState) => state.entitiesId
);

export const getModalidadeAcaoEtiquetaList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getModalidadeAcaoEtiquetaListIds,
    schemaSelectors.entitiesProjector
);

export const getModalidadeAcaoEtiquetaListLoaded = createSelector(
    getModalidadeAcaoEtiquetaListState,
    (state: ModalidadeAcaoEtiquetaState) => state.loaded
);

export const getIsLoading = createSelector(
    getModalidadeAcaoEtiquetaListState,
    (state: ModalidadeAcaoEtiquetaState) => state.loading
);
