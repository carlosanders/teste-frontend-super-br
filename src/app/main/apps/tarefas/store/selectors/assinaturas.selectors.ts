import {createSelector} from '@ngrx/store';
import {AssinaturasState, getTarefasAppState, TarefasAppState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Documento} from '@cdk/models';
import {documento as documentoSchema} from '@cdk/normalizr';

const schemaDocumentoSelectors = createSchemaSelectors<Documento>(documentoSchema);

export const getAssinaturasState: any = createSelector(
    getTarefasAppState,
    (state: TarefasAppState) => state?.assinaturas
);

export const getAssinandoTarefasId: any = createSelector(
    getAssinaturasState,
    (state: AssinaturasState) => state?.assinandoTarefasId
);

export const getAllDocumentos: any = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    schemaDocumentoSelectors.entitiesProjector
);
