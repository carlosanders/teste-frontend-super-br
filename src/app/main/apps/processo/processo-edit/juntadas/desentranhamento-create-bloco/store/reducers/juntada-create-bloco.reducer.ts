import * as JuntadaCreateBlocoActions
    from 'app/main/apps/processo/processo-edit/juntadas/desentranhamento-create-bloco/store/actions';

export interface JuntadaCreateBlocoState {
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

export const JuntadaCreateBlocoInitialState: JuntadaCreateBlocoState = {
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
    copiadoIds: []
};

export function JuntadaCreateBlocoReducer(state = JuntadaCreateBlocoInitialState, action: JuntadaCreateBlocoActions.JuntadaCreateBlocoActionsAll): JuntadaCreateBlocoState {
    switch (action.type) {
        case JuntadaCreateBlocoActions.GET_JUNTADAS: {
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

        case JuntadaCreateBlocoActions.GET_JUNTADAS_SUCCESS: {

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

        case JuntadaCreateBlocoActions.GET_JUNTADAS_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case JuntadaCreateBlocoActions.RELOAD_JUNTADAS: {
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
