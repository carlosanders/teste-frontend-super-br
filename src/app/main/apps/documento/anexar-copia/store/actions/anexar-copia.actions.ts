import {Action} from '@ngrx/store';

export const GET_PROCESSO = '[ANEXAR COPIA] GET PROCESSO';

/**
 * Get Processo
 */
export class GetProcesso implements Action
{
    readonly type = GET_PROCESSO;

    constructor(public payload: any)
    {
    }
}

export type AnexarCopiaActionsAll
    = GetProcesso;
