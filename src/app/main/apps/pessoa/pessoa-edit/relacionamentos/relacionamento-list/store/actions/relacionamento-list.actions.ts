import {Action} from '@ngrx/store';

export const GET_RELACIONAMENTOS = '[RELACIONAMENTO LIST] GET RELACIONAMENTOS';
export const GET_RELACIONAMENTOS_SUCCESS = '[RELACIONAMENTO LIST] GET RELACIONAMENTOS SUCCESS';
export const GET_RELACIONAMENTOS_FAILED = '[RELACIONAMENTO LIST] GET RELACIONAMENTOS FAILED';

export const RELOAD_RELACIONAMENTOS = '[RELACIONAMENTO LIST] RELOAD RELACIONAMENTOS';

export const DELETE_RELACIONAMENTO = '[RELACIONAMENTO LIST] DELETE RELACIONAMENTO';
export const DELETE_RELACIONAMENTO_SUCCESS = '[RELACIONAMENTO LIST] DELETE RELACIONAMENTO SUCCESS';
export const DELETE_RELACIONAMENTO_FAILED = '[RELACIONAMENTO LIST] DELETE RELACIONAMENTO FAILED';

/**
 * Get Relacionamentos
 */
export class GetRelacionamentos implements Action
{
    readonly type = GET_RELACIONAMENTOS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Relacionamentos Success
 */
export class GetRelacionamentosSuccess implements Action
{
    readonly type = GET_RELACIONAMENTOS_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Relacionamentos Failed
 */
export class GetRelacionamentosFailed implements Action
{
    readonly type = GET_RELACIONAMENTOS_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Reload Relacionamentos
 */
export class ReloadRelacionamentos implements Action
{
    readonly type = RELOAD_RELACIONAMENTOS;

    constructor()
    {
    }
}

/**
 * Delete Relacionamento
 */
export class DeleteRelacionamento implements Action
{
    readonly type = DELETE_RELACIONAMENTO;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Relacionamento Success
 */
export class DeleteRelacionamentoSuccess implements Action
{
    readonly type = DELETE_RELACIONAMENTO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Relacionamento Failed
 */
export class DeleteRelacionamentoFailed implements Action
{
    readonly type = DELETE_RELACIONAMENTO_FAILED;

    constructor(public payload: any)
    {
    }
}

export type RelacionamentoListActionsAll
    = GetRelacionamentos
    | GetRelacionamentosSuccess
    | GetRelacionamentosFailed
    | ReloadRelacionamentos
    | DeleteRelacionamento
    | DeleteRelacionamentoSuccess
    | DeleteRelacionamentoFailed;

