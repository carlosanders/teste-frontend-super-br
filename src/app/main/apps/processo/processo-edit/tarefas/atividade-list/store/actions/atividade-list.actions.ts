import {Action} from '@ngrx/store';

export const GET_ATIVIDADES = '[ATIVIDADE LIST PROCESSO_EDIT] GET ATIVIDADES TAREFA';
export const GET_ATIVIDADES_SUCCESS = '[ATIVIDADE LIST PROCESSO_EDIT] GET ATIVIDADES TAREFA SUCCESS';
export const GET_ATIVIDADES_FAILED = '[ATIVIDADE LIST PROCESSO_EDIT] GET ATIVIDADES TAREFA FAILED';

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

