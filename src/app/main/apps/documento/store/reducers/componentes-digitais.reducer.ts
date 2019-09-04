import * as ComponenteDigitalActions from '../actions/componentes-digitais.actions';

export interface ComponenteDigitalState {
    saving: boolean;
    errors: any;
    loading: number;
    loaded: number;
    componenteDigitalId: number;
    repositorio: string;
}

export const ComponenteDigitalInitialState: ComponenteDigitalState = {
    saving: false,
    errors: false,
    loading: null,
    loaded: null,
    componenteDigitalId: null,
    repositorio: null
};

export function ComponenteDigitalReducer(state = ComponenteDigitalInitialState, action: ComponenteDigitalActions.ComponenteDigitalActionsAll): ComponenteDigitalState {
    switch (action.type) {

        case ComponenteDigitalActions.SAVE_COMPONENTE_DIGITAL: {
            return {
                ...state,
                saving: true
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
                errors: action.payload
            };
        }

        case ComponenteDigitalActions.DOWNLOAD_COMPONENTE_DIGITAL: {
            return {
                ...state,
                componenteDigitalId: null,
                loading: action.payload.repositorioId,
                saving: false,
                errors: false
            };
        }

        case ComponenteDigitalActions.DOWNLOAD_COMPONENTE_DIGITAL_SUCCESS: {
            return {
                ...state,
                componenteDigitalId: action.payload.componenteDigitalId,
                loading: null,
                loaded: action.payload.repositorioId,
                saving: false,
                errors: false
            };
        }

        case ComponenteDigitalActions.DOWNLOAD_COMPONENTE_DIGITAL_FAILED: {
            return {
                ...state,
                componenteDigitalId: null,
                loading: null,
                loaded: null,
                saving: false,
                errors: action.payload
            };
        }

        case ComponenteDigitalActions.SET_REPOSITORIO_COMPONENTE_DIGITAL: {
            return {
                ...state,
                loaded: action.payload ? state.loaded : null,
                repositorio: action.payload
            };
        }

        default:
            return state;
    }
}
