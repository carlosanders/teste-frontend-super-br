import * as DocumentoEditActions from '../actions/documento-edit.actions';

export interface DocumentoEditRestaurarState {
    undeleting: boolean;
    errors: any;
}

export const DocumentoInitialState: DocumentoEditRestaurarState = {
    undeleting: false,
    errors: false
};

export function DocumentoEditRestaurarReducer(state = DocumentoInitialState, action: DocumentoEditActions.DocumentoEditActionsAll): DocumentoEditRestaurarState {

    switch (action.type) {

        case DocumentoEditActions.UNDELETE_DOCUMENTO: {
            return {
                ...state,
                undeleting: true
            };
        }

        case DocumentoEditActions.UNDELETE_DOCUMENTO_SUCCESS: {
            return {
                ...state,
                undeleting: false
            };
        }

        case DocumentoEditActions.UNDELETE_DOCUMENTO_FAILED: {
            return {
                ...state,
                undeleting: false
            };
        }

        default:
            return state;
    }
}
