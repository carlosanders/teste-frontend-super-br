import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {ContaEmailReducer, ContaEmailState} from './conta-email.reducer';
import {FolderReducer, FolderState} from './folder.reducer';
import {MessageReducer, MessageState} from './message.reducer';


export interface CaixaEmailAppState
{
    contaEmail: ContaEmailState;
    folder: FolderState;
    message: MessageState;

}
export const getCaixaEmailAppState = createFeatureSelector<CaixaEmailAppState>(
    'caixa-email-app'
);

export const getAppState: any = createSelector(
    getCaixaEmailAppState,
    (state: CaixaEmailAppState) => state
);

export const reducers: ActionReducerMap<CaixaEmailAppState> = {
    contaEmail: ContaEmailReducer,
    folder: FolderReducer,
    message: MessageReducer
};

export * from './conta-email.reducer';
export * from './folder.reducer';
export * from './message.reducer';
