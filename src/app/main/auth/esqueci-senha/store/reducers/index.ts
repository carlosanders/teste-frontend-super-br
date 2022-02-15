import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {EsqueciSenhaReducers, EsqueciSenhaState} from './esqueci-senha.reducer';

export interface EsqueciSenhaAppState
{
    esqueciSenha: EsqueciSenhaState;
}

export const getEsqueciSenhaAppState = createFeatureSelector<EsqueciSenhaAppState>(
    'esqueci-senha-app'
);

export const getAppState: any = createSelector(
    getEsqueciSenhaAppState,
    (state: EsqueciSenhaAppState) => state
);

export const reducers: ActionReducerMap<EsqueciSenhaAppState> = {
    esqueciSenha: EsqueciSenhaReducers
};

export * from './esqueci-senha.reducer';
