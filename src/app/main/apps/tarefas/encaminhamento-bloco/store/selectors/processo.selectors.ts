import {createSelector} from '@ngrx/store';
import {EncaminhamentoAppState, getEncaminhamentoAppState, ProcessoState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {processo as processoSchema} from '@cdk/normalizr';
import {Processo} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Processo>(processoSchema);

export const getProcessoState = createSelector(
    getEncaminhamentoAppState,
    (state: EncaminhamentoAppState) => state.processo
);

export const getIsSaving = createSelector(
    getProcessoState,
    (state: ProcessoState) => state.saving
);

export const getErrors = createSelector(
    getProcessoState,
    (state: ProcessoState) => state.errors
);

export const getProcessosIdsEncaminhar = createSelector(
    getProcessoState,
    (state: ProcessoState) => state.encaminhandoProcessosIds
);

export const getProcessosEncaminhamento = createSelector(
    schemaSelectors.getNormalizedEntities,
    getProcessosIdsEncaminhar,
    schemaSelectors.entitiesProjector
);
