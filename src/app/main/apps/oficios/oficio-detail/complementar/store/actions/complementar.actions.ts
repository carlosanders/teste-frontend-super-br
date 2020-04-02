import {Action} from '@ngrx/store';

export const SAVE_COMPLEMENTAR = '[COMPLEMENTAR CREATE] SAVE COMPLEMENTAR';
export const SAVE_COMPLEMENTAR_SUCCESS = '[COMPLEMENTAR CREATE] SAVE COMPLEMENTAR SUCCESS';
export const SAVE_COMPLEMENTAR_FAILED = '[COMPLEMENTAR CREATE] SAVE COMPLEMENTAR FAILED';

export class SaveComplementar implements Action {
    readonly type = SAVE_COMPLEMENTAR;

    constructor(public payload: any) {
    }
}

export class SaveComplementarSuccess implements Action {
    readonly type = SAVE_COMPLEMENTAR_SUCCESS;

    constructor(public payload: any) {
    }
}


export class SaveComplementarFailed implements Action {
    readonly type = SAVE_COMPLEMENTAR_FAILED;

    constructor(public payload: any) {
    }
}

export type ComplementarActionsAll
    = SaveComplementar
    | SaveComplementarFailed
    | SaveComplementarSuccess;
