import * as ComponenteDigitalActions from '../actions/componente-digital.actions';

export interface ComponenteDigitalState {
    loaded: boolean;
    loading: boolean;
    componenteDigitalId: number;
    saving: boolean;
    errors: any;
}

export const ComponenteDigitalInitialState: ComponenteDigitalState = {
    loaded: false,
    loading: false,
    componenteDigitalId: null,
    saving: false,
    errors: false
};

export function ComponenteDigitalReducer(state = ComponenteDigitalInitialState, action: ComponenteDigitalActions.ComponenteDigitalActionsAll): ComponenteDigitalState {
    switch (action.type) {
        case ComponenteDigitalActions.UNLOAD_COMPONENTE_DIGITAL: {
            return {
                loaded: false,
                loading: false,
                componenteDigitalId: null,
                saving: false,
                errors: false
            };
        }

        case ComponenteDigitalActions.DOWNLOAD_COMPONENTE_DIGITAL: {
            return {
                loaded: false,
                componenteDigitalId: null,
                loading: true,
                saving: false,
                errors: false
            };
        }

        case ComponenteDigitalActions.DOWNLOAD_COMPONENTE_DIGITAL_SUCCESS: {
            return {
                loaded: action.payload.loaded,
                componenteDigitalId: action.payload.componenteDigitalId,
                loading: false,
                saving: false,
                errors: false
            };
        }

        case ComponenteDigitalActions.DOWNLOAD_COMPONENTE_DIGITAL_FAILED: {
            return {
                loaded: false,
                componenteDigitalId: null,
                loading: false,
                saving: false,
                errors: action.payload
            };
        }

        default:
            return state;
    }
}
