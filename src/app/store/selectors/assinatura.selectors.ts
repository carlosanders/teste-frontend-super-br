import {createSelector} from '@ngrx/store';
import {Documento} from '@cdk/models';
import {documento as documentoSchema} from '@cdk/normalizr';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {AssinaturaState} from '../reducers/assinatura.reducer';
import {getAssinaturaState} from '../reducers';


const schemaSelectors = createSchemaSelectors<Documento>(documentoSchema);
const schemaDocumentoSelectors = createSchemaSelectors<Documento>(documentoSchema);

export const getDocumentosAssinandoIds: any = createSelector(
    getAssinaturaState,
    (state: AssinaturaState) => state.assinandoDocumentosId
);

export const getDocumentosRemovendoAssinaturaIds: any = createSelector(
    getAssinaturaState,
    (state: AssinaturaState) => state.removendoAssinaturaDocumentosId
);

export const getNormalizedDocumentosEntities: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    schemaSelectors.entitiesProjector
);

export const getDocumentosAssinando: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getDocumentosAssinandoIds,
    schemaSelectors.entitiesProjector
);

export const getAssinaturaErrosDocumentosId: any = createSelector(
    getAssinaturaState,
    (state: AssinaturaState) => state.errosAssinaturaDocumentosId
);

export const getAssinaturaErrors: any = createSelector(
    getAssinaturaState,
    (state: AssinaturaState) => state.errors
);

export const getAssinaturaRedirectRevalidaGovBr: any = createSelector(
    getAssinaturaState,
    (state: AssinaturaState) => state.redirectRevalidaGovBr
);

export const getAllDocumentos: any = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    schemaDocumentoSelectors.entitiesProjector
);

export const getTarefaIdByDocumentoId = (documentoId: number): any => createSelector(
    getAllDocumentos,
    (documentos: Documento[]) => {
        console.log(documentos);
        console.log(documentoId);
        return documentos.find(documento => documento.id === documentoId).tarefaOrigem.id;
    }
);
