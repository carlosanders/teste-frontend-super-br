import {createSelector} from '@ngrx/store';
import * as fromStore from '../';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Documento} from '@cdk/models';
import {documento as documentoSchema} from '@cdk/normalizr';

const schemaDocumentoSelectors = createSchemaSelectors<Documento>(documentoSchema);

export const getAssinaturasState: any = createSelector(
    fromStore.getTarefaDetailAppState,
    (state: fromStore.TarefaDetailAppState) => state?.assinaturas
);

export const getAssinandoTarefasId: any = createSelector(
    getAssinaturasState,
    (state: fromStore.AssinaturasState) => state?.assinandoTarefasId
);

export const getAllDocumentos: any = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    schemaDocumentoSelectors.entitiesProjector
);
