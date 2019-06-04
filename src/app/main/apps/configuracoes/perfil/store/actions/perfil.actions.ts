import { Action } from '@ngrx/store';

export const SAVE_PERFIL = '[PERFIL] SAVE PERFIL';
export const SAVE_PERFIL_SUCCESS = '[PERFIL] SAVE PERFIL SUCCESS';
export const SAVE_PERFIL_FAILED = '[PERFIL] SAVE PERFIL FAILED';

/**
 * Save Profile
 */
export class SaveProfile implements Action
{
    readonly type = SAVE_PERFIL;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Profile Success
 */
export class SaveProfileSuccess implements Action
{
    readonly type = SAVE_PERFIL_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save Profile Failed
 */
export class SaveProfileFailed implements Action
{
    readonly type = SAVE_PERFIL_FAILED;

    constructor(public payload: any)
    {
    }
}

export type ProfileActionsAll
    = SaveProfile
    | SaveProfileSuccess
    | SaveProfileFailed;
