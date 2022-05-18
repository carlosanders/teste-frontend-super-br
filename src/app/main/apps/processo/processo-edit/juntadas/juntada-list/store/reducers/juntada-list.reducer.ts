import * as JuntadaListActions from 'app/main/apps/processo/processo-edit/juntadas/juntada-list/store/actions';

export interface JuntadaListState {
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
}

export const JuntadaListInitialState: JuntadaListState = {
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
};

export function JuntadaListReducer(state = JuntadaListInitialState, action: JuntadaListActions.JuntadaListActionsAll): JuntadaListState {
    switch (action.type) {

        case JuntadaListActions.GET_JUNTADAS: {
            return {
                ...state,
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

        case JuntadaListActions.GET_JUNTADAS_SUCCESS: {

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

        case JuntadaListActions.RELOAD_JUNTADAS: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case JuntadaListActions.UNLOAD_JUNTADAS: {
            return {
                ...JuntadaListInitialState
            };
        }

        case JuntadaListActions.DESENTRANHA_JUNTADA: {
            return {
                ...state,
                desentranhadoIds: [...state.desentranhadoIds, action.payload]
            };
        }

        case JuntadaListActions.DESENTRANHA_JUNTADA_CANCEL: {
            return {
                ...state,
                desentranhadoIds: state.desentranhadoIds.filter(id => id !== action.payload)
            };
        }

        case JuntadaListActions.GET_JUNTADAS_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case JuntadaListActions.COPIA_DOCUMENTO_JUNTADA: {
            return {
                ...state,
                copiandoIds: action.payload
            };
        }

        case JuntadaListActions.COPIA_DOCUMENTO_JUNTADA_SUCCESS: {
            return {
                ...state,
                copiandoIds: state.copiandoIds.filter(id => id !== action.payload),
                copiadoIds: [...state.copiadoIds, action.payload]
            };
        }

        case JuntadaListActions.COPIA_DOCUMENTO_JUNTADA_FAILED: {
            return {
                ...state,
                copiandoIds: state.copiandoIds.filter(id => id !== action.payload)
            };
        }

        default:
            return state;
    }
}
