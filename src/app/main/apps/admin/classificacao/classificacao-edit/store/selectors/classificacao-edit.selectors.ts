import {createSelector} from '@ngrx/store';
import {ClassificacaoEditAppState, ClassificacaoEditState, getClassificacaoEditAppState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Classificacao} from '@cdk/models';
import {classificacao as classificacaoSchema} from '@cdk/normalizr';

const schemaClassificacaoSelectors = createSchemaSelectors<Classificacao>(classificacaoSchema);

export const getClassificacaoEditState: any = createSelector(
    getClassificacaoEditAppState,
    (state: ClassificacaoEditAppState) => state.classificacao
);

export const getClassificacaoId: any = createSelector(
    getClassificacaoEditState,
    (state: ClassificacaoEditState) => state.entityId
);

export const getClassificacao: any = createSelector(
    schemaClassificacaoSelectors.getNormalizedEntities,
    getClassificacaoId,
    schemaClassificacaoSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getClassificacaoEditState,
    (state: ClassificacaoEditState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getClassificacaoEditState,
    (state: ClassificacaoEditState) => state.loaded
);

export const getErrors: any = createSelector(
    getClassificacaoEditState,
    (state: ClassificacaoEditState) => state.errors
);
