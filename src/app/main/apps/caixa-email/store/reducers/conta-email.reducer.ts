import * as fromStore from '../index';

export interface ContaEmailState {
    entitiesId: number[];
    pagination: {
        limit: number;
        offset: number;
        filter: any;
        gridFilter: any;
        listFilter: any;
        populate: any;
        sort: any;
        total: number;
        context: any;
    };

    loading: boolean;
    loaded: any;
    selectedContaEmailId: number,
    saving: boolean;
    saveError: any;
    error: any;
    activeCard: string;
}

export const ContaEmailInitialState: ContaEmailState = {
    entitiesId: [],
    pagination: {
        limit: 0,
        offset: 0,
        filter: {},
        gridFilter: {},
        listFilter: {},
        populate: [],
        sort: {},
        total: 0,
        context: {}
    },
    loading: false,
    loaded: false,
    selectedContaEmailId: null,
    saving: false,
    saveError: null,
    error: null,
    activeCard: 'mail-list'
};

export function ContaEmailReducer(state = ContaEmailInitialState, action: fromStore.ContaEmailActionsAll): ContaEmailState {
    switch (action.type) {

        case fromStore.GET_CONTA_EMAIL: {
            return {
                ...state,
                loading: true,
                entitiesId: (action.payload.increment ? state.entitiesId : []),
                pagination: {
                    limit: action.payload.limit,
                    offset: action.payload.offset,
                    filter: action.payload.filter,
                    gridFilter: action.payload.gridFilter,
                    listFilter: action.payload.listFilter,
                    populate: action.payload.populate,
                    sort: action.payload.sort,
                    total: state.pagination.total,
                    context: action.payload.context
                },
                error: null,
                saving: false,
                saveError: null,
                activeCard: (action.payload.increment ? state.activeCard : 'mail-list')
            };
        }

        case fromStore.GET_CONTA_EMAIL_SUCCESS: {


            return {
                ...state,
                entitiesId: [...state.entitiesId, ...action.payload.entitiesId],
                pagination: {
                    ...state.pagination,
                    total: action.payload.total
                },
                loading: false,
                loaded: true,
                error: null
            };
        }

        case fromStore.GET_CONTA_EMAIL_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.payload
            };
        }

        case fromStore.SET_CONTA_EMAIL: {
            return {
                ...state,
                selectedContaEmailId: action.payload
            };
        }

        case fromStore.SAVE_EMAIL_PROCESSO_FORM: {
            return {
                ...state,
                saving: true,
                saveError: null
            }
        }

        case fromStore.SAVE_EMAIL_PROCESSO_FORM_SUCCESS: {
            return {
                ...state,
                saving: false,
            }
        }

        case fromStore.SAVE_EMAIL_PROCESSO_FORM_FAILED: {
            return {
                ...state,
                saving: false,
                saveError: action.payload
            }
        }

        case fromStore.SET_ACTIVE_CARD: {
            return {
                ...state,
                activeCard: action.payload
            }
        }

        default:
            return state;
    }
}


