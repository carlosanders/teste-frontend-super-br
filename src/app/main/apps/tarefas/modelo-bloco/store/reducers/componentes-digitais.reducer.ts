import * as ComponenteDigitalActions from '../actions/componentes-digitais.actions';

export interface ComponenteDigitalState {
    saving: number;
}

export const ComponenteDigitalInitialState: ComponenteDigitalState = {
    saving: 0
};

export function ComponenteDigitalReducer(state = ComponenteDigitalInitialState, action: ComponenteDigitalActions.ComponenteDigitalActionsAll): ComponenteDigitalState {
    switch (action.type) {

        case ComponenteDigitalActions.SAVE_COMPONENTE_DIGITAL: {
            return {
                saving: state.saving + 1
            };
        }

        case ComponenteDigitalActions.SAVE_COMPONENTE_DIGITAL_SUCCESS: {
            return {
                saving: state.saving - 1
            };
        }

        case ComponenteDigitalActions.SAVE_COMPONENTE_DIGITAL_FAILED: {
            return {
                saving: state.saving - 1
            };
        }

        default:
            return state;
    }
}
