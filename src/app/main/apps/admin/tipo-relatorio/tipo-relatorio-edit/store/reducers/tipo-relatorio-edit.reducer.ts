import * as TipoRelatorioEditActions from '../actions/tipo-relatorio-edit.actions';

export interface TipoRelatorioEditState {
    entityId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const TipoRelatorioEditInitialState: TipoRelatorioEditState = {
    entityId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function TipoRelatorioEditReducer(
    state = TipoRelatorioEditInitialState,
    action: TipoRelatorioEditActions.TipoRelatorioEditActionsAll
): TipoRelatorioEditState {
    switch (action.type) {

        case TipoRelatorioEditActions.GET_TIPO_RELATORIO: {
            return {
                ...state,
                entityId: null,
                loading: true
            };
        }

        case TipoRelatorioEditActions.GET_TIPO_RELATORIO_SUCCESS: {

            return {
                ...state,
                entityId: action.payload.entityId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case TipoRelatorioEditActions.CREATE_TIPO_RELATORIO: {
            return {
                ...state,
                entityId: null,
                loaded: {
                    id: 'tipoRelatorioHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case TipoRelatorioEditActions.GET_TIPO_RELATORIO_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case TipoRelatorioEditActions.SAVE_TIPO_RELATORIO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case TipoRelatorioEditActions.SAVE_TIPO_RELATORIO_SUCCESS: {
            return {
                ...state,
                entityId: action.payload.id,
                loaded: {
                    id: 'tipoRelatorioHandle',
                    value: action.payload.id
                },
                saving: false,
                errors: false
            };
        }

        case TipoRelatorioEditActions.SAVE_TIPO_RELATORIO_FAILED: {
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
