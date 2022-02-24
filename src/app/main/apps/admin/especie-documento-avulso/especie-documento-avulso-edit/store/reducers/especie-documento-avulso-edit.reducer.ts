import * as EspecieDocumentoAvulsoEditActions from '../actions/especie-documento-avulso-edit.actions';

export interface EspecieDocumentoAvulsoEditState {
    entityId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const EspecieDocumentoAvulsoEditInitialState: EspecieDocumentoAvulsoEditState = {
    entityId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function EspecieDocumentoAvulsoEditReducer(
    state = EspecieDocumentoAvulsoEditInitialState,
    action: EspecieDocumentoAvulsoEditActions.EspecieDocumentoAvulsoEditActionsAll
): EspecieDocumentoAvulsoEditState {
    switch (action.type) {

        case EspecieDocumentoAvulsoEditActions.GET_ESPECIE_DOCUMENTO_AVULSO: {
            return {
                ...state,
                entityId: null,
                loading: true
            };
        }

        case EspecieDocumentoAvulsoEditActions.GET_ESPECIE_DOCUMENTO_AVULSO_SUCCESS: {

            return {
                ...state,
                entityId: action.payload.entityId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case EspecieDocumentoAvulsoEditActions.CREATE_ESPECIE_DOCUMENTO_AVULSO: {
            return {
                ...state,
                entityId: null,
                loaded: {
                    id: 'especieDocumentoAvulsoHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case EspecieDocumentoAvulsoEditActions.GET_ESPECIE_DOCUMENTO_AVULSO_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case EspecieDocumentoAvulsoEditActions.SAVE_ESPECIE_DOCUMENTO_AVULSO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case EspecieDocumentoAvulsoEditActions.SAVE_ESPECIE_DOCUMENTO_AVULSO_SUCCESS: {
            return {
                ...state,
                entityId: action.payload.id,
                loaded: {
                    id: 'especieDocumentoAvulsoHandle',
                    value: action.payload.id
                },
                saving: false,
                errors: false
            };
        }

        case EspecieDocumentoAvulsoEditActions.SAVE_ESPECIE_DOCUMENTO_AVULSO_FAILED: {
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
