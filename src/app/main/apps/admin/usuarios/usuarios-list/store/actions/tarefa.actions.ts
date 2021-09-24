import {Action} from '@ngrx/store';

export const DISTRIBUIR_TAREFAS_USUARIO = '[ADMIN USUARIO LIST] DISTRIBUIR TAREFAS USUARIO';
export const DISTRIBUIR_TAREFAS_USUARIO_SUCCESS = '[ADMIN USUARIO LIST] DISTRIBUIR TAREFAS USUARIO SUCCESS';
export const DISTRIBUIR_TAREFAS_USUARIO_FAILED = '[ADMIN USUARIO LIST] DISTRIBUIR TAREFAS USUARIO FAILED';

export class DistribuirTarefasUsuario implements Action {
    readonly type = DISTRIBUIR_TAREFAS_USUARIO;

    constructor(public payload: any) {
    }
}

export class DistribuirTarefasUsuarioSuccess implements Action {
    readonly type = DISTRIBUIR_TAREFAS_USUARIO_SUCCESS;

    constructor(public payload: any) {
    }
}

export class DistribuirTarefasUsuarioFailed implements Action {
    readonly type = DISTRIBUIR_TAREFAS_USUARIO_FAILED;

    constructor(public payload: any) {
    }
}

export type TarefaActionsAll
    = DistribuirTarefasUsuario
    | DistribuirTarefasUsuarioSuccess
    | DistribuirTarefasUsuarioFailed;
