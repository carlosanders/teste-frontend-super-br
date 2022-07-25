import * as ComponenteDigitalActions from '../actions/componente-digital.actions';

export interface ComponenteDigitalState {
    loaded: any;
    loading: boolean;
    componenteDigitalId: string;
    saving: boolean;
    autosaving: boolean;
    errors: any;
}

export const componenteDigitalInitialState: ComponenteDigitalState = {
    loaded: false,
    loading: false,
    componenteDigitalId: null,
    saving: false,
    autosaving: false,
    errors: false
};

export const componenteDigitalReducer = (
    state = componenteDigitalInitialState,
    action: ComponenteDigitalActions.ComponenteDigitalActionsAll
): ComponenteDigitalState => {
    switch (action.type) {
        case ComponenteDigitalActions.UNLOAD_COMPONENTE_DIGITAL: {
            return {
                loaded: false,
                loading: false,
                componenteDigitalId: null,
                saving: false,
                autosaving: false,
                errors: false
            };
        }

        case ComponenteDigitalActions.DOWNLOAD_COMPONENTE_DIGITAL: {
            return {
                loaded: false,
                componenteDigitalId: null,
                loading: true,
                saving: false,
                autosaving: false,
                errors: false
            };
        }

        case ComponenteDigitalActions.DOWNLOAD_COMPONENTE_DIGITAL_SUCCESS: {
            return {
                ...state,
                componenteDigitalId: action.payload.componenteDigitalId,
                loading: false,
                saving: false,
                autosaving: false,
                loaded: action.payload.loaded,
                errors: false
            };
        }

        case ComponenteDigitalActions.COMPONENTE_DIGITAL_EXIBIDO: {
            return {
                ...state,
                loaded: action.payload
            };
        }

        case ComponenteDigitalActions.DOWNLOAD_COMPONENTE_DIGITAL_FAILED: {
            return {
                loaded: false,
                componenteDigitalId: null,
                loading: false,
                saving: false,
                autosaving: false,
                errors: addError(action.payload)
            };
        }

        case ComponenteDigitalActions.SAVE_COMPONENTE_DIGITAL: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case ComponenteDigitalActions.SAVE_COMPONENTE_DIGITAL_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case ComponenteDigitalActions.SAVE_COMPONENTE_DIGITAL_FAILED: {
            return {
                ...state,
                saving: false,
                errors: addError(action.payload)
            };
        }

        case ComponenteDigitalActions.AUTO_SAVE_COMPONENTE_DIGITAL: {
            return {
                ...state,
                autosaving: true,
                errors: false
            };
        }

        case ComponenteDigitalActions.AUTO_SAVE_COMPONENTE_DIGITAL_SUCCESS: {
            return {
                ...state,
                autosaving: false,
                errors: false
            };
        }

        case ComponenteDigitalActions.AUTO_SAVE_COMPONENTE_DIGITAL_FAILED: {
            return {
                ...state,
                autosaving: false,
                errors: addError(action.payload)
            };
        }

        default:
            return state;
    }
};

const addError = (errors: any): any => {
    return {
        ...errors,
        statusText: (errors?.statusText || '').replace('Unknown Error', 'Erro Desconhecido'),
        error: {
            ...(errors?.error || {}),
            message: (errors?.error?.message || '').replace('Unknown Error', 'Erro Desconhecido')
        }
    }

}
