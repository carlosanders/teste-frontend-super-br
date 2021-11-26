import {createSelector} from '@ngrx/store';
import {AcompanhamentoEditAppState, AcompanhamentoEditState, getAcompanhamentoEditAppState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Compartilhamento} from '@cdk/models';
import {compartilhamento as acompanhamentoSchema} from '@cdk/normalizr';

const schemaAcompanhamentoSelectors = createSchemaSelectors<Compartilhamento>(acompanhamentoSchema);

export const getAcompanhamentoEditState: any = createSelector(
    getAcompanhamentoEditAppState,
    (state: AcompanhamentoEditAppState) => state.acompanhamento
);

export const getAcompanhamentoId: any = createSelector(
    getAcompanhamentoEditState,
    (state: AcompanhamentoEditState) => state.loaded ? state.loaded.value : null
);

export const getAcompanhamento: any = createSelector(
    schemaAcompanhamentoSelectors.getNormalizedEntities,
    getAcompanhamentoId,
    schemaAcompanhamentoSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getAcompanhamentoEditState,
    (state: AcompanhamentoEditState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getAcompanhamentoEditState,
    (state: AcompanhamentoEditState) => state.loaded
);

export const getErrors: any = createSelector(
    getAcompanhamentoEditState,
    (state: AcompanhamentoEditState) => state.errors
);
