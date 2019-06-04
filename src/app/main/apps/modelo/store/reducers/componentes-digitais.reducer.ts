import * as ComponenteDigitalActions from 'app/main/apps/modelo/store/actions/componentes-digitais.actions';

export interface ComponenteDigitalState {
    saving: boolean;
    errors: any;
}

export const ComponenteDigitalInitialState: ComponenteDigitalState = {
    saving: false,
    errors: false
};

export function ComponenteDigitalReducer(state = ComponenteDigitalInitialState, action: ComponenteDigitalActions.ComponenteDigitalActionsAll): ComponenteDigitalState {
    switch (action.type) {

        case ComponenteDigitalActions.CREATE_COMPONENTE_DIGITAL: {
            return {
                saving: false,
                errors: false
            };
        }

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

        default:
            return state;
    }
}
