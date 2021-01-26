import {createSelector} from '@ngrx/store';
import {getModalidadeAcaoEtiquetaEditAppState, ModalidadeAcaoEtiquetaEditAppState, ModalidadeAcaoEtiquetaEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {ModalidadeAcaoEtiqueta} from '@cdk/models';
import {modalidadeAcaoEtiqueta as modalidadeAcaoEtiquetaSchema} from '@cdk/normalizr';

const schemaModalidadeAcaoEtiquetaSelectors = createSchemaSelectors<ModalidadeAcaoEtiqueta>(modalidadeAcaoEtiquetaSchema);

export const getModalidadeAcaoEtiquetaEditState = createSelector(
    getModalidadeAcaoEtiquetaEditAppState,
    (state: ModalidadeAcaoEtiquetaEditAppState) => state.modalidadeAcaoEtiqueta
);

export const getModalidadeAcaoEtiquetaId = createSelector(
    getModalidadeAcaoEtiquetaEditState,
    (state: ModalidadeAcaoEtiquetaEditState) => state.entityId
);

export const getModalidadeAcaoEtiqueta = createSelector(
    schemaModalidadeAcaoEtiquetaSelectors.getNormalizedEntities,
    getModalidadeAcaoEtiquetaId,
    schemaModalidadeAcaoEtiquetaSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getModalidadeAcaoEtiquetaEditState,
    (state: ModalidadeAcaoEtiquetaEditState) => state.saving
);

export const getHasLoaded = createSelector(
    getModalidadeAcaoEtiquetaEditState,
    (state: ModalidadeAcaoEtiquetaEditState) => state.loaded
);

export const getErrors = createSelector(
    getModalidadeAcaoEtiquetaEditState,
    (state: ModalidadeAcaoEtiquetaEditState) => state.errors
);
