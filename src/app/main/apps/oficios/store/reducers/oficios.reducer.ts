import * as DocumentosAvulsoActions from 'app/main/apps/oficios/store/actions/oficios.actions';
import {Etiqueta} from '@cdk/models';

export interface DocumentosAvulsoState {
    entitiesId: number[];
    pagination: {
        limit: number;
        offset: number;
        filter: any;
        folderFilter: any;
        listFilter: any;
        etiquetaFilter: Etiqueta[];
        populate: any;
        sort: any;
        total: number;
    };
    loading: boolean;
    loaded: any;
    togglingLidaProcessoIds: number[];
    currentDocumentoAvulsoId: number;
    selectedDocumentoAvulsoIds: number[];
    maximizado: boolean;
    togglingLidaDocumentoAvulsoIds: number[];
}

export const DocumentosAvulsoInitialState: DocumentosAvulsoState = {
    entitiesId: [],
    pagination: {
        limit: 0,
        offset: 0,
        filter: {},
        folderFilter: {},
        listFilter: {},
        etiquetaFilter: [],
        populate: [],
        sort: {},
        total: 0,
    },
    loading: false,
    loaded: false,
    togglingLidaProcessoIds: [],
    selectedDocumentoAvulsoIds: [],
    currentDocumentoAvulsoId: null,
    maximizado: false,
    togglingLidaDocumentoAvulsoIds: [],
};

export function OficiosReducer(state = DocumentosAvulsoInitialState, action: DocumentosAvulsoActions.DocumentosAvulsoActionsAll): DocumentosAvulsoState {
    switch (action.type) {

        case DocumentosAvulsoActions.UNLOAD_DOCUMENTOS_AVULSO: {
            if (action.payload.reset) {
                return {
                    ...DocumentosAvulsoInitialState
                };
            } else {
                return {
                    ...state,
                    entitiesId: [],
                    pagination: {
                        ...state.pagination,
                        limit: 10,
                        offset: 0,
                        total: 0
                    }
                };
            }
        }

        case DocumentosAvulsoActions.GET_DOCUMENTOS_AVULSO: {
            return {
                ...state,
                loading: true,
                pagination: {
                    limit: action.payload.limit,
                    offset: action.payload.offset,
                    filter: action.payload.filter,
                    folderFilter: action.payload.folderFilter,
                    listFilter: action.payload.listFilter,
                    etiquetaFilter: action.payload.etiquetaFilter,
                    populate: action.payload.populate,
                    sort: action.payload.sort,
                    total: state.pagination.total
                }
            };
        }

        case DocumentosAvulsoActions.GET_DOCUMENTOS_AVULSO_SUCCESS: {
            return {
                ...state,
                entitiesId: [...state.entitiesId, ...action.payload.entitiesId],
                pagination: {
                    ...state.pagination,
                    total: action.payload.total
                },
                loading: false,
                loaded: action.payload.loaded
            };
        }

        case DocumentosAvulsoActions.GET_DOCUMENTOS_AVULSO_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case DocumentosAvulsoActions.SET_CURRENT_DOCUMENTOS_AVULSO: {
            return {
                ...state,
                currentDocumentoAvulsoId: action.payload
            };
        }

        case DocumentosAvulsoActions.TOGGLE_MAXIMIZADO: {
            return {
                ...state,
                maximizado: !state.maximizado
            };
        }

        case DocumentosAvulsoActions.CHANGE_SELECTED_DOCUMENTOS_AVULSO: {
            return {
                ...state,
                selectedDocumentoAvulsoIds: action.payload
            };
        }

        case DocumentosAvulsoActions.TOGGLE_LIDA_DOCUMENTOS_AVULSO: {
            return {
                ...state,
                togglingLidaDocumentoAvulsoIds: [...state.togglingLidaDocumentoAvulsoIds, action.payload]
            };
        }

        case DocumentosAvulsoActions.TOGGLE_LIDA_DOCUMENTOS_AVULSO_SUCCESS: {
            return {
                ...state,
                togglingLidaDocumentoAvulsoIds: state.togglingLidaDocumentoAvulsoIds.filter(id => id !== action.payload)
            };
        }

        case DocumentosAvulsoActions.TOGGLE_LIDA_DOCUMENTOS_AVULSO_FAILED: {
            return {
                ...state,
                togglingLidaDocumentoAvulsoIds: state.togglingLidaDocumentoAvulsoIds.filter(id => id !== action.payload)
            };
        }

        default:
            return state;
    }
}
