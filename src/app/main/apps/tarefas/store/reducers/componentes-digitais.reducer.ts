import * as ComponenteDigitalActions from '../actions/componentes-digitais.actions';

export interface ComponenteDigitalState {
    saving: number[];
    errors: any;
    loading: boolean;
    loaded: any;
}

export const componenteDigitalInitialState: ComponenteDigitalState = {
    saving: [],
    errors: false,
    loading: false,
    loaded: false
};

export const componenteDigitalReducer = (
    state = componenteDigitalInitialState,
    action: ComponenteDigitalActions.ComponenteDigitalActionsAll
): ComponenteDigitalState => {
    switch (action.type) {

        case ComponenteDigitalActions.CREATE_COMPONENTE_DIGITAL: {
            return {
                ...state,
                errors: false,
                loading: true,
                loaded: false
            };
        }

        case ComponenteDigitalActions.SAVE_COMPONENTE_DIGITAL: {
            return {
                ...state,
                saving: [...state.saving, action.payload.componenteDigital.tarefaOrigem.id],
                loading: true,
                loaded: false
            };
        }

        case ComponenteDigitalActions.SAVE_COMPONENTE_DIGITAL_SUCCESS: {
            return {
                ...state,
                saving: state.saving.filter(id => id !== action.payload.tarefa.id),
                errors: false,
                loading: false,
                loaded: true
            };
        }

        case ComponenteDigitalActions.SAVE_COMPONENTE_DIGITAL_FAILED: {
            return {
                ...state,
                saving: state.saving.filter(id => id !== action.payload.id),
                errors: action.payload.error,
                loading: false
            };
        }

        case ComponenteDigitalActions.MODELO_SAVE_COMPONENTE_DIGITAL: {
            return {
                ...state,
                saving: [...state.saving, action.payload.componenteDigital.tarefaOrigem.id],
                loading: true,
                loaded: false
            };
        }

        case ComponenteDigitalActions.MODELO_SAVE_COMPONENTE_DIGITAL_SUCCESS: {
            return {
                ...state,
                saving: state.saving.filter(id => id !== action.payload.tarefaId),
                errors: false,
                loading: false,
                loaded: true
            };
        }

        case ComponenteDigitalActions.MODELO_SAVE_COMPONENTE_DIGITAL_FAILED: {
            return {
                ...state,
                saving: state.saving.filter(id => id !== action.payload.id),
                errors: action.payload.error,
                loading: false
            };
        }

        case ComponenteDigitalActions.MODELO_BLOCO_SAVE_COMPONENTE_DIGITAL: {
            return {
                ...state,
                saving: [...state.saving, action.payload.componenteDigital.tarefaOrigem.id],
                loading: true,
                loaded: false
            };
        }

        case ComponenteDigitalActions.MODELO_BLOCO_SAVE_COMPONENTE_DIGITAL_SUCCESS: {
            return {
                ...state,
                saving: state.saving.filter(id => id !== action.payload.tarefaId),
                errors: false,
                loading: false,
                loaded: true
            };
        }

        case ComponenteDigitalActions.MODELO_BLOCO_SAVE_COMPONENTE_DIGITAL_FAILED: {
            return {
                ...state,
                saving: state.saving.filter(id => id !== action.payload.id),
                errors: action.payload.error,
                loading: false
            };
        }

        case ComponenteDigitalActions.SAVE_DOCUMENTO_AVULSO: {
            return {
                ...state,
                saving: [...state.saving, action.payload.tarefaId],
                loading: true,
                loaded: false
            };
        }

        case ComponenteDigitalActions.SAVE_DOCUMENTO_AVULSO_SUCCESS: {
            return {
                ...state,
                saving: state.saving.filter(id => id !== action.payload),
                errors: false,
                loading: false,
                loaded: true
            };
        }

        case ComponenteDigitalActions.SAVE_DOCUMENTO_AVULSO_FAILED: {
            return {
                ...state,
                saving: state.saving.filter(id => id !== action.payload.tarefaId),
                errors: action.payload.errors,
                loading: false
            };
        }

        case ComponenteDigitalActions.SAVE_DOCUMENTO_AVULSO_BLOCO: {
            return {
                ...state,
                saving: [...state.saving, action.payload.tarefaId],
                loading: true,
                loaded: false
            };
        }

        case ComponenteDigitalActions.SAVE_DOCUMENTO_AVULSO_BLOCO_SUCCESS: {
            return {
                ...state,
                saving: state.saving.filter(id => id !== action.payload.tarefaId),
                errors: false,
                loading: false,
                loaded: true
            };
        }

        case ComponenteDigitalActions.SAVE_DOCUMENTO_AVULSO_BLOCO_FAILED: {
            return {
                ...state,
                saving: state.saving.filter(id => id !== action.payload.tarefaId),
                errors: action.payload.errors,
                loading: false
            };
        }

        case ComponenteDigitalActions.ACERVO_SAVE_COMPONENTE_DIGITAL: {
            return {
                ...state,
                saving: [...state.saving, action.payload.componenteDigital.tarefaOrigem.id],
                loading: true,
                loaded: false
            };
        }

        case ComponenteDigitalActions.ACERVO_SAVE_COMPONENTE_DIGITAL_SUCCESS: {
            return {
                ...state,
                saving: state.saving.filter(id => id !== action.payload.tarefaId),
                errors: false,
                loading: false,
                loaded: true
            };
        }

        case ComponenteDigitalActions.ACERVO_SAVE_COMPONENTE_DIGITAL_FAILED: {
            return {
                ...state,
                saving: state.saving.filter(id => id !== action.payload.id),
                errors: action.payload.error,
                loading: false
            };
        }

        case ComponenteDigitalActions.ACERVO_BLOCO_SAVE_COMPONENTE_DIGITAL: {
            return {
                ...state,
                saving: [...state.saving, action.payload.componenteDigital.tarefaOrigem.id],
                loading: true,
                loaded: false
            };
        }

        case ComponenteDigitalActions.ACERVO_BLOCO_SAVE_COMPONENTE_DIGITAL_SUCCESS: {
            return {
                ...state,
                saving: state.saving.filter(id => id !== action.payload.tarefaId),
                errors: false,
                loading: false,
                loaded: true
            };
        }

        case ComponenteDigitalActions.ACERVO_BLOCO_SAVE_COMPONENTE_DIGITAL_FAILED: {
            return {
                ...state,
                saving: state.saving.filter(id => id !== action.payload.id),
                errors: action.payload.error,
                loading: false
            };
        }

        case ComponenteDigitalActions.ATIVIDADE_SAVE_COMPONENTE_DIGITAL: {
            return {
                ...state,
                saving: [...state.saving, action.payload.componenteDigital.tarefaOrigem.id],
                loading: true,
                loaded: false
            };
        }

        case ComponenteDigitalActions.ATIVIDADE_SAVE_COMPONENTE_DIGITAL_SUCCESS: {
            return {
                ...state,
                saving: state.saving.filter(id => id !== action.payload.tarefa.id),
                errors: false,
                loading: false,
                loaded: true
            };
        }

        case ComponenteDigitalActions.ATIVIDADE_SAVE_COMPONENTE_DIGITAL_FAILED: {
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
