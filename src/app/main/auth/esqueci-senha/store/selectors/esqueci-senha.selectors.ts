import {createSelector} from '@ngrx/store';
import {EsqueciSenhaAppState, getEsqueciSenhaAppState} from '../../store';

export const getErrorMessage: any = createSelector(
    getEsqueciSenhaAppState,
    (esqueciSenha: EsqueciSenhaAppState) => esqueciSenha.esqueciSenha.errorMessage
);
