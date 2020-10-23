import * as ProcessosActions from 'app/main/apps/pesquisa/processos/store/actions';

export interface ProcessosState {
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

export const ProcessosInitialState: ProcessosState = {
    entitiesId: [],
    pagination: {
        limit: 10,
        offset: 0,
        filter: {},
        gridFilter: {},
        populate: ['setorAtual', 'setorAtual.unidade', 'especieProcesso', 'especieProcesso.generoProcesso'],
        sort: {},
        total: 0,
    },
    loading: false,
    loaded: false
};

export function ProcessosReducer(state = ProcessosInitialState, action: ProcessosActions.ProcessosActionsAll): ProcessosState {
    switch (action.type) {

        case ProcessosActions.GET_PROCESSOS: {
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

        case ProcessosActions.GET_PROCESSOS_SUCCESS: {

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

        case ProcessosActions.RELOAD_PROCESSOS: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case ProcessosActions.GET_PROCESSOS_FAILED: {
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
