import * as ProcessoSolicitarDossiesActions from '../actions/processo-solicitar-dossies.actions';

export interface ProcessoSolicitarDossiesState {
    entitiesId: number[];
    entitiesDossieId: number[];
    pagination: {
        limit: number;
        offset: number;
        filter: any;
        gridFilter: any;
        populate: any;
        sort: any;
        total: number;
    };
    loadingInteressados: boolean;
    loading: boolean;
    loaded: any;
    binary: {
        src: any;
        loading: boolean;
    };
}

export const ProcessoSolicitarDossiesInitialState: ProcessoSolicitarDossiesState = {
    entitiesId: [],
    entitiesDossieId: [],
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
    loadingInteressados: false,
    binary: {
        src: null,
        loading: false
    }
};

export function ProcessoSolicitarDossiesReducer(
    state = ProcessoSolicitarDossiesInitialState,
    action: ProcessoSolicitarDossiesActions.ProcessoSolicitarDossiesActionsAll
): ProcessoSolicitarDossiesState {
    switch (action.type) {

        case ProcessoSolicitarDossiesActions.GET_INTERESSADOS_DOSSIES: {
            return {
                ...state,
                loadingInteressados: true,
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

        case ProcessoSolicitarDossiesActions.GET_INTERESSADOS_DOSSIES_SUCCESS: {

            const loaded = action.payload.loaded;

            return {
                ...state,
                entitiesId: action.payload.entitiesId,
                pagination: {
                    ...state.pagination,
                    total: action.payload.total
                },
                loadingInteressados: false,
                loaded
            };
        }

        case ProcessoSolicitarDossiesActions.GET_INTERESSADOS_DOSSIES_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case ProcessoSolicitarDossiesActions.GET_TIPOS_DOSSIES: {
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

        case ProcessoSolicitarDossiesActions.GET_TIPOS_DOSSIES_SUCCESS: {

            const loaded = action.payload.loaded;

            return {
                ...state,
                entitiesDossieId: action.payload.entitiesDossieId,
                pagination: {
                    ...state.pagination,
                    total: action.payload.total
                },
                loading: false,
                loaded
            };
        }

        case ProcessoSolicitarDossiesActions.GET_TIPOS_DOSSIES_FAILED: {
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
