import * as UploadBlocoActions from '../actions/upload-bloco.actions';

export interface UploadBlocoState {
    savingTarefasId: number[];
    errors: any;
}

export const uploadBlocoInitialState: UploadBlocoState = {
    savingTarefasId: [],
    errors: false
};

export const uploadBlocoReducer = (
    state = uploadBlocoInitialState, action: UploadBlocoActions.UploadBlocoActionsAll
): UploadBlocoState => {
    switch (action.type) {

        case UploadBlocoActions.UPLOAD_INICIADO: {
            return {
                savingTarefasId: [...action.payload],
                errors: false
            };
        }

        case UploadBlocoActions.UPLOAD_CONCLUIDO: {
            return {
                savingTarefasId: state.savingTarefasId.filter(id => id !== action.payload),
                errors: false
            };
        }

        default:
            return state;
    }
};
