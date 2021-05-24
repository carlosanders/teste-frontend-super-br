import * as AcompanhamentoActions from '../actions/acompanhamento.actions';

export interface AcompanhamentoState {
    entitiesId: number[];
    entityId: number;
    loading: boolean;
    loaded: any;
    acompanhamentoId: number;
    saving: boolean;
    deletingIds: number[];
    deletedIds: number[];
    errors: any;
}

export const AcompanhamentoInitialState: AcompanhamentoState = {
    entitiesId: [],
    loading: false,
    loaded: false,
    acompanhamentoId: null,
    saving: false,
    deletedIds: [],
    deletingIds: [],
    errors: false,
    entityId: null
};

export function AcompanhamentoReducer(state = AcompanhamentoInitialState, action: AcompanhamentoActions.AcompanhamentoActionsAll): AcompanhamentoState {
    switch (action.type) {

        case AcompanhamentoActions.GET_ACOMPANHAMENTO: {
            return {
                ...state,
                loading: true
            };
        }

        case AcompanhamentoActions.GET_ACOMPANHAMENTO_SUCCESS: {

            const loaded = action.payload.loaded;

            return {
                ...state,
                entitiesId: [...state.entitiesId, ...action.payload.entitiesId],
                entityId: [ ...action.payload.entitiesId].pop(),
                loading: false,
                loaded
            };
        }

        case AcompanhamentoActions.GET_ACOMPANHAMENTO_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case AcompanhamentoActions.UNLOAD_ACOMPANHAMENTO: {

            if (action.payload.reset) {
                return {
                    ...AcompanhamentoInitialState
                };
            } else {
                return {
                    ...state,
                    entitiesId: []
                };
            }
        }

        case AcompanhamentoActions.CREATE_ACOMPANHAMENTO: {
            return {
                ...state,
                acompanhamentoId: null,
                loading: false
            };
        }

        case AcompanhamentoActions.SAVE_ACOMPANHAMENTO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case AcompanhamentoActions.SAVE_ACOMPANHAMENTO_SUCCESS: {
            return {
                ...state,
                entityId: action.payload.id,
                saving: false,
                errors: false
            };
        }

        case AcompanhamentoActions.SAVE_ACOMPANHAMENTO_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        case AcompanhamentoActions.DELETE_ACOMPANHAMENTO: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload]
            };
        }

        case AcompanhamentoActions.DELETE_ACOMPANHAMENTO_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload]
            };
        }

        case AcompanhamentoActions.DELETE_ACOMPANHAMENTO_FAILED: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload)
            };
        }

        default:
            return state;
    }
}
