import {Action} from '@ngrx/store';

export const GET_TEMPLATE = '[DOCUMENTO EDIT TEMPLATE] GET TEMPLATE';
export const GET_TEMPLATE_SUCCESS = '[DOCUMENTO EDIT TEMPLATE] GET TEMPLATE SUCCESS';
export const GET_TEMPLATE_FAILED = '[DOCUMENTO EDIT TEMPLATE] GET TEMPLATE FAILED';

export const UNLOAD_TEMPLATE = '[DOCUMENTO EDIT TEMPLATE] UNLOAD TEMPLATE';

export const SAVE_TEMPLATE = '[DOCUMENTO EDIT TEMPLATE] SAVE TEMPLATE';
export const SAVE_TEMPLATE_SUCCESS = '[DOCUMENTO EDIT TEMPLATE] SAVE TEMPLATE SUCCESS';
export const SAVE_TEMPLATE_FAILED = '[DOCUMENTO EDIT TEMPLATE] SAVE TEMPLATE FAILED';

/**
 * Get Template
 */
export class GetTemplate implements Action
{
    readonly type = GET_TEMPLATE;

    constructor()
    {
    }
}

/**
 * Get Template Success
 */
export class GetTemplateSuccess implements Action
{
    readonly type = GET_TEMPLATE_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Template Failed
 */
export class GetTemplateFailed implements Action
{
    readonly type = GET_TEMPLATE_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Unload Template
 */
export class UnloadTemplate implements Action
{
    readonly type = UNLOAD_TEMPLATE;

    constructor()
    {
    }
}

/**
 * Save Template
 */
export class SaveTemplate implements Action
{
    readonly type = SAVE_TEMPLATE;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Template Success
 */
export class SaveTemplateSuccess implements Action
{
    readonly type = SAVE_TEMPLATE_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save Template Failed
 */
export class SaveTemplateFailed implements Action
{
    readonly type = SAVE_TEMPLATE_FAILED;

    constructor(public payload: any)
    {
    }
}

export type TemplateEditActionsAll
    = GetTemplate
    | GetTemplateSuccess
    | GetTemplateFailed
    | UnloadTemplate
    | SaveTemplate
    | SaveTemplateSuccess
    | SaveTemplateFailed;
