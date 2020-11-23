import * as ModalidadeOrgaoCentralEditActions from '../actions/modalidade-orgao-central-edit.actions';

export interface ModalidadeOrgaoCentralEditState {
    entityId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const ModalidadeOrgaoCentralEditInitialState: ModalidadeOrgaoCentralEditState = {
    entityId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function ModalidadeOrgaoCentralEditReducer(
    state = ModalidadeOrgaoCentralEditInitialState,
    action: ModalidadeOrgaoCentralEditActions.ModalidadeOrgaoCentralEditActionsAll
): ModalidadeOrgaoCentralEditState {
    switch (action.type) {

        case ModalidadeOrgaoCentralEditActions.GET_MODALIDADE_ORGAO_CENTRAL: {
            return {
                ...state,
                entityId: null,
                loading: true
            };
        }

        case ModalidadeOrgaoCentralEditActions.GET_MODALIDADE_ORGAO_CENTRAL_SUCCESS: {

            return {
                ...state,
                entityId: action.payload.entityId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case ModalidadeOrgaoCentralEditActions.CREATE_MODALIDADE_ORGAO_CENTRAL: {
            return {
                ...state,
                entityId: null,
                loaded: {
                    id: 'modalidadeOrgaoCentralHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case ModalidadeOrgaoCentralEditActions.GET_MODALIDADE_ORGAO_CENTRAL_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case ModalidadeOrgaoCentralEditActions.SAVE_MODALIDADE_ORGAO_CENTRAL: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case ModalidadeOrgaoCentralEditActions.SAVE_MODALIDADE_ORGAO_CENTRAL_SUCCESS: {
            return {
                ...state,
                entityId: action.payload.id,
                loaded: {
                    id: 'modalidadeOrgaoCentralHandle',
                    value: action.payload.id
                },
                saving: false,
                errors: false
            };
        }

        case ModalidadeOrgaoCentralEditActions.SAVE_MODALIDADE_ORGAO_CENTRAL_FAILED: {
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
