import * as fromStore from '../';

export interface ComponenteDigitalState {
    saving: number[];
    errors: any;
    loading: boolean;
    loaded: any;
}

export const ComponenteDigitalInitialState: ComponenteDigitalState = {
    saving: [],
    errors: false,
    loading: false,
    loaded: false
};

export const ComponenteDigitalReducer = (
    state = ComponenteDigitalInitialState,
    action: fromStore.ComponenteDigitalActionsAll
): ComponenteDigitalState => {
    switch (action.type) {

        case fromStore.CREATE_COMPONENTE_DIGITAL: {
            return {
                ...state,
                errors: false,
                loading: true,
                loaded: false
            };
        }

        case fromStore.SAVE_COMPONENTE_DIGITAL: {
            return {
                ...state,
                saving: [...state.saving, action.payload.componenteDigital.tarefaOrigem.id],
                loading: true,
                loaded: false
            };
        }

        case fromStore.SAVE_COMPONENTE_DIGITAL_SUCCESS: {
            return {
                ...state,
                saving: state.saving.filter(id => id !== action.payload.tarefa.id),
                errors: false,
                loading: false,
                loaded: true
            };
        }

        case fromStore.SAVE_COMPONENTE_DIGITAL_FAILED: {
            return {
                ...state,
                saving: state.saving.filter(id => id !== action.payload.id),
                errors: action.payload.error,
                loading: false
            };
        }

        case fromStore.MODELO_SAVE_COMPONENTE_DIGITAL: {
            return {
                ...state,
                saving: [...state.saving, action.payload.componenteDigital.tarefaOrigem.id],
                loading: true,
                loaded: false
            };
        }

        case fromStore.MODELO_SAVE_COMPONENTE_DIGITAL_SUCCESS: {
            return {
                ...state,
                saving: state.saving.filter(id => id !== action.payload.tarefaId),
                errors: false,
                loading: false,
                loaded: true
            };
        }

        case fromStore.MODELO_SAVE_COMPONENTE_DIGITAL_FAILED: {
            return {
                ...state,
                saving: state.saving.filter(id => id !== action.payload.id),
                errors: action.payload.error,
                loading: false
            };
        }

        case fromStore.MODELO_BLOCO_SAVE_COMPONENTE_DIGITAL: {
            return {
                ...state,
                saving: [...state.saving, action.payload.componenteDigital.tarefaOrigem.id],
                loading: true,
                loaded: false
            };
        }

        case fromStore.MODELO_BLOCO_SAVE_COMPONENTE_DIGITAL_SUCCESS: {
            return {
                ...state,
                saving: state.saving.filter(id => id !== action.payload.tarefaId),
                errors: false,
                loading: false,
                loaded: true
            };
        }

        case fromStore.MODELO_BLOCO_SAVE_COMPONENTE_DIGITAL_FAILED: {
            return {
                ...state,
                saving: state.saving.filter(id => id !== action.payload.id),
                errors: action.payload.error,
                loading: false
            };
        }

        case fromStore.ACERVO_SAVE_COMPONENTE_DIGITAL: {
            return {
                ...state,
                saving: [...state.saving, action.payload.componenteDigital.tarefaOrigem.id],
                loading: true,
                loaded: false
            };
        }

        case fromStore.ACERVO_SAVE_COMPONENTE_DIGITAL_SUCCESS: {
            return {
                ...state,
                saving: state.saving.filter(id => id !== action.payload.tarefaId),
                errors: false,
                loading: false,
                loaded: true
            };
        }

        case fromStore.ACERVO_SAVE_COMPONENTE_DIGITAL_FAILED: {
            return {
                ...state,
                saving: state.saving.filter(id => id !== action.payload.id),
                errors: action.payload.error,
                loading: false
            };
        }

        case fromStore.ACERVO_BLOCO_SAVE_COMPONENTE_DIGITAL: {
            return {
                ...state,
                saving: [...state.saving, action.payload.componenteDigital.tarefaOrigem.id],
                loading: true,
                loaded: false
            };
        }

        case fromStore.ACERVO_BLOCO_SAVE_COMPONENTE_DIGITAL_SUCCESS: {
            return {
                ...state,
                saving: state.saving.filter(id => id !== action.payload.tarefaId),
                errors: false,
                loading: false,
                loaded: true
            };
        }

        case fromStore.ACERVO_BLOCO_SAVE_COMPONENTE_DIGITAL_FAILED: {
            return {
                ...state,
                saving: state.saving.filter(id => id !== action.payload.id),
                errors: action.payload.error,
                loading: false
            };
        }

        case fromStore.ATIVIDADE_SAVE_COMPONENTE_DIGITAL: {
            return {
                ...state,
                saving: [...state.saving, action.payload.componenteDigital.tarefaOrigem.id],
                loading: true,
                loaded: false
            };
        }

        case fromStore.ATIVIDADE_SAVE_COMPONENTE_DIGITAL_SUCCESS: {
            return {
                ...state,
                saving: state.saving.filter(id => id !== action.payload.tarefa.id),
                errors: false,
                loading: false,
                loaded: true
            };
        }

        case fromStore.ATIVIDADE_SAVE_COMPONENTE_DIGITAL_FAILED: {
            return {
                ...state,
                saving: state.saving.filter(id => id !== action.payload.id),
                errors: action.payload.error,
                loading: false
            };
        }

        default:
            return state;
    }
};
