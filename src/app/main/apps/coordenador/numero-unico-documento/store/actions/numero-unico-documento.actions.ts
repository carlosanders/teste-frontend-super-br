import {Action} from '@ngrx/store';

export const GET_SETOR_SUCCESS = '[COORDENADOR NUMERO-UNICO-DOCUMENTO] GET SETOR SUCCESS';
export const GET_SETOR_FAILED = '[COORDENADOR NUMERO-UNICO-DOCUMENTO] GET SETOR FAILED';

/**
 * Get Setor Success
 */
export class GetSetorSuccess implements Action
{
    readonly type = GET_SETOR_SUCCESS;

    constructor(public payload: any)
    {
    }
}

export type NumeroUnicoDocumentoActionsAll
    = GetSetorSuccess;
