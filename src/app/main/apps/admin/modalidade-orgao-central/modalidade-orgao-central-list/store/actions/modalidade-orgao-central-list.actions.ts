import {Action} from '@ngrx/store';

export const GET_MODALIDADE_ORGAO_CENTRAL = '[ADMIN MODALIDADE ORGAO CENTRAL LIST] GET MODALIDADE_ORGAO_CENTRAL';
export const GET_MODALIDADE_ORGAO_CENTRAL_SUCCESS = '[ADMIN MODALIDADE ORGAO CENTRAL LIST] GET MODALIDADE_ORGAO_CENTRAL SUCCESS';
export const GET_MODALIDADE_ORGAO_CENTRAL_FAILED = '[ADMIN MODALIDADE ORGAO CENTRAL LIST] GET MODALIDADE_ORGAO_CENTRAL FAILED';

export const RELOAD_MODALIDADE_ORGAO_CENTRAL = '[ADMIN MODALIDADE ORGAO CENTRAL LIST] RELOAD MODALIDADE_ORGAO_CENTRAL';
export const UNLOAD_MODALIDADE_ORGAO_CENTRAL = '[ADMIN MODALIDADE ORGAO CENTRAL LIST] UNLOAD MODALIDADE_ORGAO_CENTRAL';


/**
 * Get ModalidadeOrgaoCentral
 */
export class GetModalidadeOrgaoCentral implements Action {
    readonly type = GET_MODALIDADE_ORGAO_CENTRAL;

    constructor(public payload: any) {
    }
}

/**
 * Get ModalidadeOrgaoCentral Success
 */
export class GetModalidadeOrgaoCentralSuccess implements Action {
    readonly type = GET_MODALIDADE_ORGAO_CENTRAL_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get ModalidadeOrgaoCentral Failed
 */
export class GetModalidadeOrgaoCentralFailed implements Action {
    readonly type = GET_MODALIDADE_ORGAO_CENTRAL_FAILED;

    constructor(public payload: string) {
    }
}

/**
 * Unload ModalidadeOrgaoCentral
 */
export class UnloadModalidadeOrgaoCentral implements Action {
    readonly type = UNLOAD_MODALIDADE_ORGAO_CENTRAL;

    constructor() {
    }
}

/**
 * Reload ModalidadeOrgaoCentral
 */
export class ReloadModalidadeOrgaoCentral implements Action {
    readonly type = RELOAD_MODALIDADE_ORGAO_CENTRAL;

    constructor() {
    }
}


export type ModalidadeOrgaoCentralListActionsAll
    = GetModalidadeOrgaoCentral
    | GetModalidadeOrgaoCentralSuccess
    | GetModalidadeOrgaoCentralFailed
    | UnloadModalidadeOrgaoCentral
    | ReloadModalidadeOrgaoCentral;

