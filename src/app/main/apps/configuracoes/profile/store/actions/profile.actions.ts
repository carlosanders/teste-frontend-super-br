import { Action } from '@ngrx/store';

export const SAVE_PROFILE = '[PROFILE] SAVE PROFILE';
export const SAVE_PROFILE_SUCCESS = '[PROFILE] SAVE PROFILE SUCCESS';
export const SAVE_PROFILE_FAILED = '[PROFILE] SAVE PROFILE FAILED';

/**
 * Save Profile
 */
export class SaveProfile implements Action
{
    readonly type = SAVE_PROFILE;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Profile Success
 */
export class SaveProfileSuccess implements Action
{
    readonly type = SAVE_PROFILE_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save Profile Failed
 */
export class SaveProfileFailed implements Action
{
    readonly type = SAVE_PROFILE_FAILED;

    constructor(public payload: any)
    {
    }
}

export type ProfileActionsAll
    = SaveProfile
    | SaveProfileSuccess
    | SaveProfileFailed;
