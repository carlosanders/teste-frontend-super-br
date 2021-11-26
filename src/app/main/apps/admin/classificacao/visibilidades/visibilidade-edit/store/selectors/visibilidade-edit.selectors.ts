import {createSelector} from '@ngrx/store';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Visibilidade} from '@cdk/models';
import {visibilidade as visibilidadeSchema} from '@cdk/normalizr';
import * as fromStore from '../index';

const schemaVisibilidadeSelectors = createSchemaSelectors<Visibilidade>(visibilidadeSchema);

export const getClassificacaoVisibilidadeEditState: any = createSelector(
    fromStore.getClassificacaoVisibilidadeEditAppState,
    (state: fromStore.ClassificacaoVisibilidadeEditAppState) => state.classificacaoVisibilidade
);

export const getClassificacaoVisibilidadeId: any = createSelector(
    getClassificacaoVisibilidadeEditState,
    (state: fromStore.ClassificacaoVisibilidadeEditState) => state.loaded ? state.loaded.value : null
);

export const getClassificacaoVisibilidade: any = createSelector(
    schemaVisibilidadeSelectors.getNormalizedEntities,
    getClassificacaoVisibilidadeId,
    schemaVisibilidadeSelectors.entityProjector
);

export const getClassificacaoVisibilidadeIsSaving: any = createSelector(
    getClassificacaoVisibilidadeEditState,
    (state: fromStore.ClassificacaoVisibilidadeEditState) => state.saving
);

export const getClassificacaoVisibilidadeHasLoaded: any = createSelector(
    getClassificacaoVisibilidadeEditState,
    (state: fromStore.ClassificacaoVisibilidadeEditState) => state.loaded
);

export const getClassificacaoVisibilidadeErrors: any = createSelector(
    getClassificacaoVisibilidadeEditState,
    (state: fromStore.ClassificacaoVisibilidadeEditState) => state.errors
);
