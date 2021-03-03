import {createSelector} from '@ngrx/store';
import {AcaoTriggerAppState, AcaoTriggerState, getAcaoTriggerAppState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {ModalidadeAcaoEtiqueta} from '@cdk/models';
import {modalidadeAcaoEtiqueta as modalidadeAcaoEtiquetaSchema} from '@cdk/normalizr';

const schemaModalidadeAcaoEtiquetaSelectors = createSchemaSelectors<ModalidadeAcaoEtiqueta>(modalidadeAcaoEtiquetaSchema);

export const getAcaoTriggerState = createSelector(
    getAcaoTriggerAppState,
    (state: AcaoTriggerAppState) => state.modalidadeAcaoEtiqueta
);

export const getModalidadeAcaoEtiquetaId = createSelector(
    getAcaoTriggerState,
    (state: AcaoTriggerState) => state.loaded ? state.loaded.id : null
);

export const getModalidadeAcaoEtiqueta = createSelector(
    schemaModalidadeAcaoEtiquetaSelectors.getNormalizedEntities,
    getModalidadeAcaoEtiquetaId,
    schemaModalidadeAcaoEtiquetaSelectors.entityProjector
);

export const getHasLoaded = createSelector(
    getAcaoTriggerState,
    (state: AcaoTriggerState) => state.loaded
);
