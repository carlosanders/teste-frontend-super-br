import * as DocumentosActions from 'app/main/apps/pesquisa/documentos/store/actions';

export interface DocumentosState {
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
}

export const DocumentosInitialState: DocumentosState = {
    entitiesId: [],
    pagination: {
        limit: 5,
        offset: 0,
        filter: {},
        gridFilter: {},
        populate: ['populateAll'],
        sort: {},
        total: 0,
    },
    loading: false,
    loaded: false
};

export function DocumentosReducer(state = DocumentosInitialState, action: DocumentosActions.DocumentosActionsAll): DocumentosState {
    switch (action.type) {

        case DocumentosActions.GET_DOCUMENTOS: {
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

        case DocumentosActions.GET_DOCUMENTOS_SUCCESS: {

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

        case DocumentosActions.RELOAD_DOCUMENTOS: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case DocumentosActions.GET_DOCUMENTOS_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        default:
            return state;
    }
}
