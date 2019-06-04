import { Action } from '@ngrx/store';

export const RESULTADO = '[OPERACOES] RESULTADO';

/**
 * Message
 */
export class Resultado implements Action
{
    readonly type = RESULTADO;

    constructor(public payload: any)
    {
    }
}

export type OperacoesActionsAll
    = Resultado;
