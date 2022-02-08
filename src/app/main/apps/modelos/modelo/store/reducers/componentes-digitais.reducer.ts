import * as ComponenteDigitalActions from 'app/main/apps/modelos/modelo/store/actions/componentes-digitais.actions';

export interface ComponenteDigitalState {
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const componenteDigitalInitialState: ComponenteDigitalState = {
    saving: false,
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
                errors: action.payload.error,
                loading: false
            };
        }

        default:
            return state;
    }
};
