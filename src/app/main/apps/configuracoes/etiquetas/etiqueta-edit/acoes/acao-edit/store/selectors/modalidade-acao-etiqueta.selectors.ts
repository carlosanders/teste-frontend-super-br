import {createSelector} from '@ngrx/store';
import {AcaoEditAppState, getAcaoEditAppState, ModalidadeAcaoEtiquetaState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {modalidadeAcaoEtiqueta as modalidadeAcaoEtiquetaSchema} from '@cdk/normalizr';
import {ModalidadeAcaoEtiqueta} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<ModalidadeAcaoEtiqueta>(modalidadeAcaoEtiquetaSchema);

export const getModalidadeAcaoEtiquetaListState: any = createSelector(
    getAcaoEditAppState,
    (state: AcaoEditAppState) => state.modalidadeAcaoEtiquetaList
);

export const getModalidadeAcaoEtiquetaListIds: any = createSelector(
    getModalidadeAcaoEtiquetaListState,
    (state: ModalidadeAcaoEtiquetaState) => state.entitiesId
);

export const getModalidadeAcaoEtiquetaList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getModalidadeAcaoEtiquetaListIds,
    schemaSelectors.entitiesProjector
);

export const getModalidadeAcaoEtiquetaListLoaded: any = createSelector(
    getModalidadeAcaoEtiquetaListState,
    (state: ModalidadeAcaoEtiquetaState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getModalidadeAcaoEtiquetaListState,
    (state: ModalidadeAcaoEtiquetaState) => state.loading
);
