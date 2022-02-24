import {createSelector} from '@ngrx/store';
import {EspecieDocumentoAvulsoEditAppState, EspecieDocumentoAvulsoEditState, getEspecieDocumentoAvulsoEditAppState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {EspecieDocumentoAvulso} from '@cdk/models';
import {especieDocumentoAvulso as especieDocumentoAvulsoSchema} from '@cdk/normalizr';

const schemaEspecieDocumentoAvulsoSelectors = createSchemaSelectors<EspecieDocumentoAvulso>(especieDocumentoAvulsoSchema);

export const getEspecieDocumentoAvulsoEditState: any = createSelector(
    getEspecieDocumentoAvulsoEditAppState,
    (state: EspecieDocumentoAvulsoEditAppState) => state.especieDocumentoAvulso
);

export const getEspecieDocumentoAvulsoId: any = createSelector(
    getEspecieDocumentoAvulsoEditState,
    (state: EspecieDocumentoAvulsoEditState) => state.entityId
);

export const getEspecieDocumentoAvulso: any = createSelector(
    schemaEspecieDocumentoAvulsoSelectors.getNormalizedEntities,
    getEspecieDocumentoAvulsoId,
    schemaEspecieDocumentoAvulsoSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getEspecieDocumentoAvulsoEditState,
    (state: EspecieDocumentoAvulsoEditState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getEspecieDocumentoAvulsoEditState,
    (state: EspecieDocumentoAvulsoEditState) => state.loaded
);

export const getErrors: any = createSelector(
    getEspecieDocumentoAvulsoEditState,
    (state: EspecieDocumentoAvulsoEditState) => state.errors
);
