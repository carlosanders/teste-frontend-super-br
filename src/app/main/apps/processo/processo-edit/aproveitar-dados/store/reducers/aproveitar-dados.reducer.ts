import * as DadosBasicosActions from '../actions/dados-basicos.actions';

export interface DadosBasicosState {
    saving: boolean;
    errors: any;
    loaded: any;
}

export const DadosBasicosInitialState: DadosBasicosState = {
    saving: false,
    errors: false,
    loaded: false
};

export function DadosBasicosReducer(state = DadosBasicosInitialState, action: DadosBasicosActions.DadosBasicosActionsAll): DadosBasicosState {
    switch (action.type) {

        case DadosBasicosActions.CREATE_PROCESSO: {
            return {
                loaded: {
                    id: 'processoHandle',
                    value: 'criar'
                },
                saving: false,
                errors: false
            };
        }

        case DadosBasicosActions.SET_PROCESSO: {
            return {
                ...state,
                loaded: action.payload
            };
        }

        case DadosBasicosActions.SAVE_PROCESSO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case DadosBasicosActions.SAVE_PROCESSO_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case DadosBasicosActions.SAVE_PROCESSO_FAILED: {
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
