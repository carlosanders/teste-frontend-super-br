import * as TipoRelatorioCreateActions from '../actions/tipo-relatorio-create.actions';

export interface TipoRelatorioCreateState {
    entityId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const TipoRelatorioCreateInitialState: TipoRelatorioCreateState = {
    entityId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function TipoRelatorioCreateReducer(
    state = TipoRelatorioCreateInitialState,
    action: TipoRelatorioCreateActions.TipoRelatorioCreateActionsAll
): TipoRelatorioCreateState {
    switch (action.type) {

        case TipoRelatorioCreateActions.GET_TIPO_RELATORIO: {
            return {
                ...state,
                entityId: null,
                loading: true
            };
        }

        case TipoRelatorioCreateActions.GET_TIPO_RELATORIO_SUCCESS: {

            return {
                ...state,
                entityId: action.payload.entityId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case TipoRelatorioCreateActions.CREATE_TIPO_RELATORIO: {
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

        case TipoRelatorioCreateActions.GET_TIPO_RELATORIO_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case TipoRelatorioCreateActions.SAVE_TIPO_RELATORIO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case TipoRelatorioCreateActions.SAVE_TIPO_RELATORIO_SUCCESS: {
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

        case TipoRelatorioCreateActions.SAVE_TIPO_RELATORIO_FAILED: {
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
