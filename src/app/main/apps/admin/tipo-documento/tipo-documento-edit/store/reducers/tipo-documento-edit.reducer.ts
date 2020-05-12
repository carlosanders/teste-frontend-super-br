import * as TipoDocumentoEditActions from '../actions/tipo-documento-edit.actions';

export interface TipoDocumentoEditState {
    entityId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const TipoDocumentoEditInitialState: TipoDocumentoEditState = {
    entityId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function TipoDocumentoEditReducer(
    state = TipoDocumentoEditInitialState,
    action: TipoDocumentoEditActions.TipoDocumentoEditActionsAll
): TipoDocumentoEditState {
    switch (action.type) {

        case TipoDocumentoEditActions.GET_TIPO_DOCUMENTO: {
            return {
                ...state,
                entityId: null,
                loading: true
            };
        }

        case TipoDocumentoEditActions.GET_TIPO_DOCUMENTO_SUCCESS: {

            return {
                ...state,
                entityId: action.payload.entityId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case TipoDocumentoEditActions.CREATE_TIPO_DOCUMENTO: {
            return {
                ...state,
                entityId: null,
                loaded: {
                    id: 'tipoDocumentoHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case TipoDocumentoEditActions.GET_TIPO_DOCUMENTO_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case TipoDocumentoEditActions.SAVE_TIPO_DOCUMENTO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case TipoDocumentoEditActions.SAVE_TIPO_DOCUMENTO_SUCCESS: {
            return {
                ...state,
                entityId: action.payload.id,
                loaded: {
                    id: 'tipoDocumentoHandle',
                    value: action.payload.id
                },
                saving: false,
                errors: false
            };
        }

        case TipoDocumentoEditActions.SAVE_TIPO_DOCUMENTO_FAILED: {
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
