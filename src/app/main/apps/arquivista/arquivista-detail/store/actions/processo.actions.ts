import {Action} from '@ngrx/store';

export const EXPANDIR_TELA = '[PROCESSO VIEW] EXPANDIR PROCESSO';

/**
 * Expandir Processo
 */
export class ExpandirTela implements Action
{
    readonly type = EXPANDIR_TELA;

    constructor(public payload: boolean)
    {
    }
}

export type ProcessoActionsAll
    = ExpandirTela;
