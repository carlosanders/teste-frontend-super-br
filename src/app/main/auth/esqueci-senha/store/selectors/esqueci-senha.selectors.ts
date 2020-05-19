import { createSelector } from '@ngrx/store';
import { getEsqueciSenhaAppState, EsqueciSenhaAppState } from '../../store';

export const getErrorMessage = createSelector(
    getEsqueciSenhaAppState,
    (esqueciSenha: EsqueciSenhaAppState) => esqueciSenha.esqueciSenha.errorMessage
);
