import * as FoldersActions from 'app/main/apps/relatorios/store/actions/folders.actions';

export interface FoldersState
{
    entitiesId: number[];
    loading: boolean;
    loaded: boolean;
}

export const FoldersInitialState: FoldersState = {
    entitiesId: [],
    loading : false,
    loaded  : false
};

export function FoldersReducer(state = FoldersInitialState, action: FoldersActions.FoldersActionsAll): FoldersState
{
    switch ( action.type )
    {
        case FoldersActions.GET_FOLDERS:
            return {
                ...state,
                loading: true,
                loaded : false
            };
        case FoldersActions.GET_FOLDERS_SUCCESS:
            return {
                ...state,
                entitiesId: action.payload.entitiesId,
                loading: false,
                loaded: action.payload.loaded
            };

        case FoldersActions.GET_FOLDERS_FAILED:
            return {
                ...state,
                loading: false,
                loaded : false
            };
        default:
            return state;
    }
}
