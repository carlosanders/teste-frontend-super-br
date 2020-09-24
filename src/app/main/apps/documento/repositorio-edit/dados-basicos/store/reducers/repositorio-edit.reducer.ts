import * as RepositorioEditActions from '../actions/repositorio-edit.actions';

export interface RepositorioEditDadosBasicosState {
    saving: boolean;
    errors: any;
}

export const RepositorioEditInitialState: RepositorioEditDadosBasicosState = {
    saving: false,
    errors: false
};

export function RepositorioEditDadosBasicosReducer(state = RepositorioEditInitialState, action: RepositorioEditActions.RepositorioEditActionsAll): RepositorioEditDadosBasicosState {

    switch (action.type) {

        case RepositorioEditActions.SAVE_REPOSITORIO: {
            return {
                saving: true,
                errors: false
            };
        }

        case RepositorioEditActions.SAVE_REPOSITORIO_SUCCESS: {
            return {
                saving: false,
                errors: false
            };
        }

        case RepositorioEditActions.SAVE_REPOSITORIO_FAILED: {
            return {
                saving: false,
                errors: action.payload
            };
        }

        default:
            return state;
    }
}
