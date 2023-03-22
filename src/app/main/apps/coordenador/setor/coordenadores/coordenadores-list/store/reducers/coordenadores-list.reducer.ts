/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
import * as CoordenadoresListActions from '../actions';
import * as _ from 'lodash';

export interface CoordenadoresListState {
    entitiesId: number[];
    pagination: {
        limit: number;
        offset: number;
        filter: any;
        gridFilter: any;
        populate: any;
        context: any;
        sort: any;
        total: number;
    };
    loading: boolean;
    loaded: any;
    deletingIds: number[];
    deletedIds: number[];
    deletingErrors: any;
    errors: any;
}

export const CoordenadoresListInitialState: CoordenadoresListState = {
    entitiesId: [],
    pagination: {
        limit: 0,
        offset: 0,
        filter: {},
        gridFilter: {},
        populate: [],
        context: {},
        sort: {},
        total: 0,
    },
    loading: false,
    loaded: false,
    deletedIds: [],
    deletingIds: [],
    deletingErrors: {},
    errors: false,
};

export function CoordenadoresListReducer(
    state = CoordenadoresListInitialState,
    action: CoordenadoresListActions.CoordenadoresListActionsAll
): CoordenadoresListState {
    switch (action.type) {

        case CoordenadoresListActions.GET_COORDENADORES_SETOR: {
            return {
                ...state,
                loading: true,
                pagination: {
                    limit: action.payload.limit,
                    offset: action.payload.offset,
                    filter: action.payload.filter,
                    gridFilter: action.payload.gridFilter,
                    populate: action.payload.populate,
                    context: action.payload.context,
                    sort: action.payload.sort,
                    total: state.pagination.total
                },

            };
        }

        case CoordenadoresListActions.GET_COORDENADORES_SETOR_SUCCESS: {

            const loaded = action.payload.loaded;
            return {
                ...state,
                entitiesId: action.payload.entitiesId,
                pagination: {
                    ...state.pagination,
                    total: action.payload.total
                },
                deletingErrors: {},
                loading: false,
                loaded,
                errors: false,
                // deletingErrors: {},
                // loading: false,
                // loaded: false
            };
        }

        case CoordenadoresListActions.GET_COORDENADORES_SETOR_FAILED: {
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
