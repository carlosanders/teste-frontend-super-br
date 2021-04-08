import * as GrupoContatoEditActions from '../actions/grupo-contato-edit.actions';

export interface GrupoContatoEditState {
    grupoContatoId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const GrupoContatoEditInitialState: GrupoContatoEditState = {
    grupoContatoId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function GrupoContatoEditReducer(
    state = GrupoContatoEditInitialState,
    action: GrupoContatoEditActions.GrupoContatoEditActionsAll
): GrupoContatoEditState {
    switch (action.type) {

        case GrupoContatoEditActions.GET_GRUPO_CONTATO: {
            return {
                ...state,
                grupoContatoId: null,
                loading: true
            };
        }

        case GrupoContatoEditActions.GET_GRUPO_CONTATO_SUCCESS: {

            return {
                ...state,
                grupoContatoId: action.payload.grupoContatoId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case GrupoContatoEditActions.CREATE_GRUPO_CONTATO: {
            return {
                ...state,
                grupoContatoId: null,
                loaded: {
                    id: 'grupoContatoHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case GrupoContatoEditActions.GET_GRUPO_CONTATO_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case GrupoContatoEditActions.SAVE_GRUPO_CONTATO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case GrupoContatoEditActions.SAVE_GRUPO_CONTATO_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case GrupoContatoEditActions.SAVE_GRUPO_CONTATO_FAILED: {
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
