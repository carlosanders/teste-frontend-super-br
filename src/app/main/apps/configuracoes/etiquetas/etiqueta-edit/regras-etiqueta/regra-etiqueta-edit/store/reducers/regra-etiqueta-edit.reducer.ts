import * as RegraEtiquetaEditActions from '../actions/regra-etiqueta-edit.actions';

export interface RegraEtiquetaEditState {
    regraEtiquetaId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const RegraEtiquetaEditInitialState: RegraEtiquetaEditState = {
    regraEtiquetaId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function RegraEtiquetaEditReducer(
    state = RegraEtiquetaEditInitialState,
    action: RegraEtiquetaEditActions.RegraEtiquetaEditActionsAll
): RegraEtiquetaEditState {
    switch (action.type) {

        case RegraEtiquetaEditActions.GET_REGRA_ETIQUETA: {
            return {
                ...state,
                regraEtiquetaId: null,
                loading: true
            };
        }

        case RegraEtiquetaEditActions.GET_REGRA_ETIQUETA_SUCCESS: {

            return {
                ...state,
                regraEtiquetaId: action.payload.regraEtiquetaId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case RegraEtiquetaEditActions.CREATE_REGRA_ETIQUETA: {
            return {
                ...state,
                regraEtiquetaId: null,
                loaded: {
                    id: 'regraEtiquetaHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case RegraEtiquetaEditActions.GET_REGRA_ETIQUETA_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case RegraEtiquetaEditActions.SAVE_REGRA_ETIQUETA: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case RegraEtiquetaEditActions.SAVE_REGRA_ETIQUETA_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case RegraEtiquetaEditActions.SAVE_REGRA_ETIQUETA_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        default:
            return state;
    }
}
