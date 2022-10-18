import {Action} from '@ngrx/store';

export const DELETE_COMPARTILHAMENTO = '[COMPARTILHAMENTO DELETE BLOCO] DELETE COMPARTILHAMENTO';
export const DELETE_COMPARTILHAMENTO_SUCCESS = '[COMPARTILHAMENTO DELETE BLOCO] DELETE COMPARTILHAMENTO SUCCESS';
export const DELETE_COMPARTILHAMENTO_FAILED = '[COMPARTILHAMENTO DELETE BLOCO] DELETE COMPARTILHAMENTO FAILED';

export const GET_COMPARTILHAMENTOS = '[COMPARTILHAMENTO DELETE BLOCO] GET COMPARTILHAMENTOS';
export const GET_COMPARTILHAMENTOS_SUCCESS = '[COMPARTILHAMENTO DELETE BLOCO] GET COMPARTILHAMENTOS SUCCESS';
export const GET_COMPARTILHAMENTOS_FAILED = '[COMPARTILHAMENTO DELETE BLOCO] GET COMPARTILHAMENTOS FAILED';

export const UNLOAD_COMPARTILHAMENTOS = '[COMPARTILHAMENTO DELETE BLOCO] UNLOAD COMPARTILHAMENTOS';

export class DeleteCompartilhamento implements Action
{
    readonly type = DELETE_COMPARTILHAMENTO;

    constructor(public payload: any)
    {
    }
}

export class DeleteCompartilhamentoSuccess implements Action
{
    readonly type = DELETE_COMPARTILHAMENTO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

export class DeleteCompartilhamentoFailed implements Action
{
    readonly type = DELETE_COMPARTILHAMENTO_FAILED;

    constructor(public payload: any)
    {
    }
}

export class GetCompartilhamentos implements Action
{
    readonly type = GET_COMPARTILHAMENTOS;

    constructor(public payload: any)
    {
    }
}

export class GetCompartilhamentosSuccess implements Action
{
    readonly type = GET_COMPARTILHAMENTOS_SUCCESS;

    constructor(public payload: any)
    {
    }
}

export class GetCompartilhamentosFailed implements Action
{
    readonly type = GET_COMPARTILHAMENTOS_FAILED;

    constructor(public payload: any)
    {
    }
}

export class UnloadCompartilhamentos implements Action
{
    readonly type = UNLOAD_COMPARTILHAMENTOS;
}

export type CompartilhamentoBlocoRemoveActionsAll
    = DeleteCompartilhamento
    | DeleteCompartilhamentoSuccess
    | DeleteCompartilhamentoFailed
    | GetCompartilhamentos
    | GetCompartilhamentosSuccess
    | GetCompartilhamentosFailed
    | UnloadCompartilhamentos
    ;
