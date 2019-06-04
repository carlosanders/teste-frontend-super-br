import * as ComponenteDigitalActions from '../actions/componente-digital.actions';

export interface ComponenteDigitalState {
    loaded: boolean;
    loading: boolean;
    componenteDigitalId: number;
}

export const ComponenteDigitalInitialState: ComponenteDigitalState = {
    loaded: false,
    loading: false,
    componenteDigitalId: null,
};

export function ComponenteDigitalReducer(state = ComponenteDigitalInitialState, action: ComponenteDigitalActions.ComponenteDigitalActionsAll): ComponenteDigitalState {
    switch (action.type) {
        case ComponenteDigitalActions.DOWNLOAD_COMPONENTE_DIGITAL: {
            return {
                loaded: false,
                componenteDigitalId: null,
                loading: true
            };
        }

        case ComponenteDigitalActions.DOWNLOAD_COMPONENTE_DIGITAL_SUCCESS: {
            return {
                loaded: action.payload.loaded,
                componenteDigitalId: action.payload.componenteDigitalId,
                loading: false
            };
        }

        case ComponenteDigitalActions.DOWNLOAD_COMPONENTE_DIGITAL_FAILED: {
            return {
                loaded: false,
                componenteDigitalId: null,
                loading: false
            };
        }

        default:
            return state;
    }
}
