import {Action} from '@ngrx/store';

export const GET_SETORES = '[TAREFAS COORDENADORES LIST] GET SETORES';
export const GET_SETORES_SUCCESS = '[TAREFAS COORDENADORES LIST] GET SETORES SUCCESS';
export const GET_SETORES_FAILED = '[TAREFAS COORDENADORES LIST] GET SETORES FAILED';

export const UNLOAD_SETORES = '[TAREFAS COORDENADORES LIST] UNLOAD SETORES';

/**
 * Get Setores
 */
export class GetSetores implements Action
{
    readonly type = GET_SETORES;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Setores Success
 */
export class GetSetoresSuccess implements Action
{
    readonly type = GET_SETORES_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Setores Failed
 */
export class GetSetoresFailed implements Action
{
    readonly type = GET_SETORES_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Unload Setores
 */
export class UnloadSetores implements Action
{
    readonly type = UNLOAD_SETORES;

    constructor()
    {
    }
}

export type RootSetorActionsAll
    = GetSetores
    | GetSetoresSuccess
    | GetSetoresFailed
    | UnloadSetores;
