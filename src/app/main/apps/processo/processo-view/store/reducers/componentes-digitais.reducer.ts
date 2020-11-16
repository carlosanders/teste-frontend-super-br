import * as ComponenteDigitalActions from '../actions/componentes-digitais.actions';

export interface ComponenteDigitalState {
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const ComponenteDigitalInitialState: ComponenteDigitalState = {
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function ComponenteDigitalReducer(state = ComponenteDigitalInitialState, action: ComponenteDigitalActions.ComponenteDigitalActionsAll): ComponenteDigitalState {
    switch (action.type) {

        case ComponenteDigitalActions.CREATE_COMPONENTE_DIGITAL: {
            return {
                ...state,
                saving: false,
                errors: false,
                loading: true,
                loaded: false
            };
        }

        case ComponenteDigitalActions.SAVE_COMPONENTE_DIGITAL: {
            return {
                ...state,
                saving: true,
                loading: true,
                loaded: false
            };
        }

        case ComponenteDigitalActions.SAVE_COMPONENTE_DIGITAL_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false,
                loading: false,
                loaded: true
            };
        }

        case ComponenteDigitalActions.SAVE_COMPONENTE_DIGITAL_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload,
                loading: false
            };
        }

        default:
            return state;
    }
}
