import * as CompetenciaEditActions from '../actions/competencia-edit.actions';

export interface CompetenciaEditState {
    competenciaId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const CompetenciaEditInitialState: CompetenciaEditState = {
    competenciaId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function CompetenciaEditReducer(
    state = CompetenciaEditInitialState,
    action: CompetenciaEditActions.CompetenciaEditActionsAll
): CompetenciaEditState {
    switch (action.type) {

        case CompetenciaEditActions.GET_COMPETENCIA: {
            return {
                ...state,
                competenciaId: null,
                loading: true
            };
        }

        case CompetenciaEditActions.GET_COMPETENCIA_SUCCESS: {

            return {
                ...state,
                competenciaId: action.payload.competenciaId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case CompetenciaEditActions.CREATE_COMPETENCIA: {
            return {
                ...state,
                competenciaId: null,
                loaded: {
                    id: 'competenciaHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case CompetenciaEditActions.GET_COMPETENCIA_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case CompetenciaEditActions.SAVE_COMPETENCIA: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case CompetenciaEditActions.SAVE_COMPETENCIA_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case CompetenciaEditActions.SAVE_COMPETENCIA_FAILED: {
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
