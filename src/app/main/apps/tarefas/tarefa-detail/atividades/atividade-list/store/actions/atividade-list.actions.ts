import {Action} from '@ngrx/store';

export const GET_ATIVIDADES = '[ATIVIDADE LIST] GET ATIVIDADES';
export const GET_ATIVIDADES_SUCCESS = '[ATIVIDADE LIST] GET ATIVIDADES SUCCESS';
export const GET_ATIVIDADES_FAILED = '[ATIVIDADE LIST] GET ATIVIDADES FAILED';

/**
 * Get Atividades
 */
export class GetAtividades implements Action
{
    readonly type = GET_ATIVIDADES;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Atividades Success
 */
export class GetAtividadesSuccess implements Action
{
    readonly type = GET_ATIVIDADES_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Atividades Failed
 */
export class GetAtividadesFailed implements Action
{
    readonly type = GET_ATIVIDADES_FAILED;

    constructor(public payload: string)
    {
    }
}

export type AtividadeListActionsAll
    = GetAtividades
    | GetAtividadesSuccess
    | GetAtividadesFailed;

