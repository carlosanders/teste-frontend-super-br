import * as RelatorioCreateActions
    from 'app/main/apps/relatorios/relatorio-create/store/actions/relatorio-create.actions';

export interface RelatorioCreateState {
    saving: boolean;
    errors: any;
}

export const RelatorioCreateInitialState: RelatorioCreateState = {
    saving: false,
    errors: false
};

export function RelatorioCreateReducer(state = RelatorioCreateInitialState, action: RelatorioCreateActions.RelatorioCreateActionsAll): RelatorioCreateState {
    switch (action.type) {

        case RelatorioCreateActions.CREATE_RELATORIO: {
            return {
                saving: false,
                errors: false
            };
        }

        case RelatorioCreateActions.SAVE_RELATORIO: {
            return {
                ...state,
                saving: true
            };
        }

        case RelatorioCreateActions.SAVE_RELATORIO_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case RelatorioCreateActions.SAVE_RELATORIO_FAILED: {
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
