import {Action} from '@ngrx/store';

export const REMETER_OFICIO = '[OFICIO REMETER BLOCO] REMETER OFICIO';
export const REMETER_OFICIO_SUCCESS = '[OFICIO REMETER BLOCO] REMETER OFICIO SUCCESS';
export const REMETER_OFICIO_FAILED = '[OFICIO REMETER BLOCO] REMETER OFICIO FAILED';

export const GET_OFICIOS = '[OFICIO REMETER BLOCO] GET OFICIOS';
export const GET_OFICIOS_SUCCESS = '[OFICIO REMETER BLOCO] GET OFICIOS SUCCESS';
export const GET_OFICIOS_FAILED = '[OFICIO REMETER BLOCO] GET OFICIOS FAILED';

export const UNLOAD_OFICIOS = '[OFICIO REMETER BLOCO] UNLOAD OFICIOS';

export const SET_SELECTED_IDS = '[OFICIO REMETER BLOCO] SET SELECTED IDS';

export class RemeterOficio implements Action
{
    readonly type = REMETER_OFICIO;

    constructor(public payload: any)
    {
    }
}

export class RemeterOficioSuccess implements Action
{
    readonly type = REMETER_OFICIO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

export class RemeterOficioFailed implements Action
{
    readonly type = REMETER_OFICIO_FAILED;

    constructor(public payload: any)
    {
    }
}

export class GetOficios implements Action
{
    readonly type = GET_OFICIOS;

    constructor(public payload: any)
    {
    }
}

export class GetOficiosSuccess implements Action
{
    readonly type = GET_OFICIOS_SUCCESS;

    constructor(public payload: any)
    {
    }
}

export class GetOficiosFailed implements Action
{
    readonly type = GET_OFICIOS_FAILED;

    constructor(public payload: any)
    {
    }
}

export class UnloadOficios implements Action
{
    readonly type = UNLOAD_OFICIOS;
}

export class SetSelectedIds implements Action
{
    readonly type = SET_SELECTED_IDS;

    constructor(public payload: any)
    {
    }

}

export type OficioBlocoRemoveActionsAll
    = RemeterOficio
    | RemeterOficioSuccess
    | RemeterOficioFailed
    | GetOficios
    | GetOficiosSuccess
    | GetOficiosFailed
    | UnloadOficios
    | SetSelectedIds
    ;
