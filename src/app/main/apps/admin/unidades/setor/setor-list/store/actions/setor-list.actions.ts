import {Action} from '@ngrx/store';

export const GET_SETORES = '[ADMIN SETOR LIST] GET SETORES';
export const GET_SETORES_SUCCESS = '[ADMIN SETOR LIST] GET SETORES SUCCESS';
export const GET_SETORES_FAILED = '[ADMIN SETOR LIST] GET SETORES FAILED';

export const RELOAD_SETORES = '[ADMIN SETOR LIST] RELOAD SETORES';

export const DELETE_SETOR = '[ADMIN SETOR LIST] DELETE SETOR';
export const DELETE_SETOR_SUCCESS = '[ADMIN SETOR LIST] DELETE SETOR SUCCESS';
export const DELETE_SETOR_FAILED = '[ADMIN SETOR LIST] DELETE SETOR FAILED';

export const TRANSFERIR_PROCESSOS_PROTOCOLO = '[ADMIN SETOR LIST] TRANSFERIR PROCESSOS PROTOCOLO';
export const TRANSFERIR_PROCESSOS_PROTOCOLO_SUCCESS = '[ADMIN SETOR LIST] TRANSFERIR PROCESSOS PROTOCOLO SUCCESS';
export const TRANSFERIR_PROCESSOS_PROTOCOLO_FAILED = '[ADMIN SETOR LIST] TRANSFERIR PROCESSOS PROTOCOLO FAILED';

/**
 * Get Setores
 */
export class GetSetores implements Action {
    readonly type = GET_SETORES;

    constructor(public payload: any) {
    }
}

/**
 * Get Setores Success
 */
export class GetSetoresSuccess implements Action {
    readonly type = GET_SETORES_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get Setores Failed
 */
export class GetSetoresFailed implements Action {
    readonly type = GET_SETORES_FAILED;

    constructor(public payload: string) {
    }
}

/**
 * Reload Setores
 */
export class ReloadSetores implements Action {
    readonly type = RELOAD_SETORES;

    constructor() {
    }
}

/**
 * Delete Setor
 */
export class DeleteSetor implements Action {
    readonly type = DELETE_SETOR;

    constructor(public payload: any) {
    }
}

/**
 * Delete Setor Success
 */
export class DeleteSetorSuccess implements Action {
    readonly type = DELETE_SETOR_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Delete Setor Failed
 */
export class DeleteSetorFailed implements Action {
    readonly type = DELETE_SETOR_FAILED;

    constructor(public payload: any) {
    }
}

export class TransferirProcessosProtocolo implements Action {
    readonly type = TRANSFERIR_PROCESSOS_PROTOCOLO;

    constructor(public payload: any) {
    }
}

export class TransferirProcessosProtocoloSuccess implements Action {
    readonly type = TRANSFERIR_PROCESSOS_PROTOCOLO_SUCCESS;

    constructor(public payload: any) {
    }
}

export class TransferirProcessosProtocoloFailed implements Action {
    readonly type = TRANSFERIR_PROCESSOS_PROTOCOLO_FAILED;

    constructor(public payload: any) {
    }
}

export type SetorListActionsAll
    = GetSetores
    | GetSetoresSuccess
    | GetSetoresFailed
    | ReloadSetores
    | DeleteSetor
    | DeleteSetorSuccess
    | DeleteSetorFailed
    | TransferirProcessosProtocolo
    | TransferirProcessosProtocoloSuccess
    | TransferirProcessosProtocoloFailed;

