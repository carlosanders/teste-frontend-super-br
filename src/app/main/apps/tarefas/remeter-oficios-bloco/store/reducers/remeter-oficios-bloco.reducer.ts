import * as _ from 'lodash';
import * as RemeterOficiosBlocoActions from '../actions/remeter-oficios-bloco.actions';

export interface RemeterOficiosBlocoState {
    entitiesId: number[];
    pagination: {
        limit: number;
        offset: number;
        filter: any;
        gridFilter: any;
        populate: any;
        sort: any;
        total: number;
        context: any;
    };
    loaded: any;
    loading: boolean;
    error?: any;
    loteSize: number;
    remeterIds: number[];
}

export const OficioCreateInitialState: RemeterOficiosBlocoState = {
    entitiesId: [],
    pagination: {
        limit: 0,
        offset: 0,
        filter: {},
        gridFilter: {},
        populate: [],
        sort: {},
        total: 0,
        context: {}
    },
    loaded: false,
    loading: false,
    error: {},
    loteSize: 0,
    remeterIds: []
};

export function RemeterOficiosBlocoReducer(
    state = OficioCreateInitialState, action: RemeterOficiosBlocoActions.OficioBlocoRemoveActionsAll
): RemeterOficiosBlocoState {
    switch (action.type) {

        case RemeterOficiosBlocoActions.GET_OFICIOS: {
            return {
                ...state,
                entitiesId: [],
                pagination: {
                    limit: action.payload.limit,
                    offset: action.payload.offset,
                    filter: action.payload.filter,
                    gridFilter: action.payload.gridFilter,
                    populate: action.payload.populate,
                    sort: action.payload.sort,
                    total: state.pagination.total,
                    context: action.payload.context
                },
                loading: true,
                loaded: false,
                error: {},
                loteSize: 0,
                remeterIds: []
            };
        }

        case RemeterOficiosBlocoActions.GET_OFICIOS_SUCCESS: {
            return {
                ...state,
                entitiesId: [...action.payload.entitiesId],
                pagination: {
                    ...state.pagination,
                    total: action.payload.total
                },
                loading: false,
                loaded: action.payload.loaded ?? state.loading,
            };
        }

        case RemeterOficiosBlocoActions.GET_OFICIOS_FAILED: {
            return {
                ...state,
                error: action.payload
            };
        }

        case RemeterOficiosBlocoActions.REMETER_OFICIO: {
            return {
                ...state,
                remeterIds: [
                    ...state.remeterIds.filter((id) => id !== action.payload.oficio.id),
                    action.payload.oficio.id
                ]
            };
        }

        case RemeterOficiosBlocoActions.REMETER_OFICIO_SUCCESS: {
            const loteSize = (state.loteSize ? state.loteSize-1 : 0);
            return {
                ...state,
                error: _.omit(state.error, [action.payload.oficio.id]),
                loteSize: loteSize,
                remeterIds: [
                    ...state.remeterIds.filter((id) => id !== action.payload.oficio.id),
                ]
            };
        }

        case RemeterOficiosBlocoActions.REMETER_OFICIO_FAILED: {
            const loteSize = (state.loteSize ? state.loteSize-1 : 0);
            return {
                ...state,
                error: {
                    ...state.error,
                    [action.payload.oficio.id]:action.payload.error
                },
                loteSize: loteSize,
                remeterIds: [
                    ...state.remeterIds.filter((id) => id !== action.payload.oficio.id),
                ]
            };
        }

        case RemeterOficiosBlocoActions.UNLOAD_OFICIOS: {
            return {
                ...OficioCreateInitialState
            };
        }

        case RemeterOficiosBlocoActions.SET_LOTE_SIZE: {
            return {
                ...state,
                loteSize: action.payload
            };
        }

        default:
            return state;
    }
}
