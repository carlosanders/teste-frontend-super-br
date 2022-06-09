import * as ComponenteDigitalActions from '../actions/componente-digital.actions';

export interface ComponenteDigitalState {
    loaded: any;
    loading: boolean;
    componenteDigitalId: string;
    errors: any;
}

export const componenteDigitalInitialState: ComponenteDigitalState = {
    loaded: false,
    loading: false,
    componenteDigitalId: null,
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
                errors: false
            };
        }

        case ComponenteDigitalActions.DOWNLOAD_COMPONENTE_DIGITAL: {
            return {
                loaded: false,
                componenteDigitalId: null,
                loading: true,
                errors: false
            };
        }

        case ComponenteDigitalActions.DOWNLOAD_COMPONENTE_DIGITAL_SUCCESS: {
            return {
                ...state,
                loaded: action.payload.loaded,
                componenteDigitalId: action.payload.componenteDigitalId,
                loading: false,
                errors: false
            };
        }

        case ComponenteDigitalActions.DOWNLOAD_COMPONENTE_DIGITAL_FAILED: {
            return {
                loaded: false,
                componenteDigitalId: null,
                loading: false,
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
