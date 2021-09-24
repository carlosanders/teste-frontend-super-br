import * as JuntadaActions from '../actions';

export interface JuntadaState {
    entitiesId: number[];
    pagination: {
        limit: number;
        offset: number;
        filter: any;
        gridFilter: any;
        populate: any;
        sort: any;
        total: number;
    };
    loading: boolean;
    loaded: any;
    desentranhandoIds: number[];
    desentranhadoIds: number[];
    copiandoIds: number[];
    copiadoIds: number[];
    assinandoDocumentoIds: number[];
}

export const JuntadaInitialState: JuntadaState = {
    entitiesId: [],
    pagination: {
        limit: 0,
        offset: 0,
        filter: {},
        gridFilter: {},
        populate: [],
        sort: {},
        total: 0,
    },
    loading: false,
    loaded: false,
    desentranhadoIds: [],
    desentranhandoIds: [],
    copiandoIds: [],
    copiadoIds: [],
    assinandoDocumentoIds: [],
};

export function JuntadaReducer(state = JuntadaInitialState, action: JuntadaActions.JuntadaActionsAll): JuntadaState {
    switch (action.type) {

        case JuntadaActions.GET_JUNTADAS: {
            return {
                ...state,
                entitiesId: [],
                loading: true,
                pagination: {
                    limit: action.payload.limit,
                    offset: action.payload.offset,
                    filter: action.payload.filter,
                    gridFilter: action.payload.gridFilter,
                    populate: action.payload.populate,
                    sort: action.payload.sort,
                    total: state.pagination.total
                }
            };
        }

        case JuntadaActions.GET_JUNTADAS_SUCCESS: {

            const loaded = action.payload.loaded;

            return {
                ...state,
                entitiesId: action.payload.entitiesId,
                pagination: {
                    ...state.pagination,
                    total: action.payload.total
                },
                loading: false,
                loaded
            };
        }

        case JuntadaActions.UNLOAD_JUNTADAS: {

            if (action.payload.reset) {
                return {
                    ...JuntadaInitialState
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

        case JuntadaActions.GET_JUNTADAS_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case JuntadaActions.ASSINA_DOCUMENTO_JUNTADA: {
            return {
                ...state,
                assinandoDocumentoIds: [...state.assinandoDocumentoIds, action.payload]
            };
        }

        case JuntadaActions.ASSINA_DOCUMENTO_JUNTADA_SUCCESS: {
            return {
                ...state,
                assinandoDocumentoIds: state.assinandoDocumentoIds.filter(id => id !== action.payload)
            };
        }

        case JuntadaActions.ASSINA_DOCUMENTO_JUNTADA_FAILED: {
            return {
                ...state,
                assinandoDocumentoIds: state.assinandoDocumentoIds.filter(id => id !== action.payload)
            };
        }

        case JuntadaActions.ASSINA_DOCUMENTO_ELETRONICAMENTE: {
            return {
                ...state,
                assinandoDocumentoIds: [...state.assinandoDocumentoIds, action.payload.documento.id]
            };
        }

        case JuntadaActions.ASSINA_DOCUMENTO_ELETRONICAMENTE_SUCCESS: {
            const newState = [...state.assinandoDocumentoIds];
            const index = newState.indexOf(action.payload);
            if (index > -1) {
                newState.splice(index, 1);
            }
            return {
                ...state,
                assinandoDocumentoIds: newState
            };
        }

        case JuntadaActions.ASSINA_DOCUMENTO_ELETRONICAMENTE_FAILED: {
            const newState = [...state.assinandoDocumentoIds];
            const index = newState.indexOf(action.payload.documentoId);
            if (index > -1) {
                newState.splice(index, 1);
            }
            return {
                ...state,
                assinandoDocumentoIds: newState
            };
        }

        case JuntadaActions.SAVE_DESENTRANHAMENTO: {
            return {
                ...state,
                desentranhandoIds: [...state.desentranhandoIds, action.payload.desentranhamento.juntada.id],
            };
        }

        case JuntadaActions.SAVE_DESENTRANHAMENTO_SUCCESS: {
            return {
                ...state,
                desentranhandoIds: state.desentranhandoIds.filter(id => id !== action.payload.desentranhamento.juntada.id),
                desentranhadoIds: [...state.desentranhadoIds, action.payload.desentranhamento.juntada.id]
            };
        }

        case JuntadaActions.SAVE_DESENTRANHAMENTO_FAILED: {
            return {
                ...state,
                desentranhandoIds: state.desentranhandoIds.filter(id => id !== action.payload.desentranhamento.juntada.id),
            };
        }

        default:
            return state;
    }
}
