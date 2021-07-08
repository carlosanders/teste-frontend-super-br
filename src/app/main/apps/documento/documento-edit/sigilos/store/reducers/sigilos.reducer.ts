import * as SigilosActions from '../actions';

export interface SigilosState {
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
    documentoId: number;
    sigiloId: number;
    loading: boolean;
    loaded: any;
    sigilosId: number;
    saving: boolean;
    errors: any;
}

export const SigilosInitialState: SigilosState = {
    entitiesId: [],
    pagination: {
        limit: 10,
        offset: 0,
        filter: {},
        gridFilter: {},
        populate: [],
        sort: {},
        total: 0,
    },
    sigilosId: null,
    documentoId: null,
    sigiloId: null,
    loading: false,
    loaded: false,
    saving: false,
    errors: false,
};

export function SigilosReducer(
    state = SigilosInitialState,
    action: SigilosActions.SigiloActionsAll
): SigilosState {
    switch (action.type) {

        case SigilosActions.GET_SIGILO_DOCUMENTO: {
            return {
                ...state,
                loading: true,
                sigiloId: action.payload.sigiloId
            };
        }

        case SigilosActions.GET_SIGILO_DOCUMENTO_SUCCESS: {
            return {
                ...state,
                sigiloId: action.payload.sigiloId,
                loading: false,
                loaded: action.payload.loaded
            };
        }

        case SigilosActions.RELOAD_SIGILOS_DOCUMENTO: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case SigilosActions.GET_SIGILO_DOCUMENTO_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case SigilosActions.GET_SIGILOS_DOCUMENTO: {
            return {
                ...state,
                entitiesId: null,
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

        case SigilosActions.GET_SIGILOS_DOCUMENTO_SUCCESS: {
            return {
                ...state,
                entitiesId: action.payload.entitiesId,
                pagination: {
                    ...state.pagination,
                    total: action.payload.total
                },
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case SigilosActions.SAVE_SIGILO_DOCUMENTO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case SigilosActions.SAVE_SIGILO_DOCUMENTO_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case SigilosActions.SAVE_SIGILO_DOCUMENTO_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        case SigilosActions.UNLAOD_SIGILOS: {
            return {
                ...SigilosInitialState
            };
        }

        default:
            return state;
    }
}
