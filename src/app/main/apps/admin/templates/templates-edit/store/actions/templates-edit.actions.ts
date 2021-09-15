import {Action} from '@ngrx/store';

export const CREATE_TEMPLATES = '[TEMPLATES EDIT] CREATE TEMPLATES';
export const CREATE_TEMPLATES_SUCCESS = '[TEMPLATES EDIT] CREATE TEMPLATES SUCCESS';

export const SAVE_TEMPLATES = '[TEMPLATES EDIT] SAVE TEMPLATES';
export const SAVE_TEMPLATES_SUCCESS = '[TEMPLATES EDIT] SAVE TEMPLATES SUCCESS';
export const SAVE_TEMPLATES_FAILED = '[TEMPLATES EDIT] SAVE TEMPLATES FAILED';

export const GET_TEMPLATES = '[TEMPLATES EDIT] GET TEMPLATES';
export const GET_TEMPLATES_SUCCESS = '[TEMPLATES EDIT] GET TEMPLATES SUCCESS';
export const GET_TEMPLATES_FAILED = '[TEMPLATES EDIT] GET TEMPLATES FAILED';

/**
 * Get Templates
 */
export class GetTemplates implements Action {
    readonly type = GET_TEMPLATES;

    constructor(public payload: any) {
    }
}

/**
 * Get Templates Success
 */
export class GetTemplatesSuccess implements Action {
    readonly type = GET_TEMPLATES_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get Templates Failed
 */
export class GetTemplatesFailed implements Action {
    readonly type = GET_TEMPLATES_FAILED;

    constructor(public payload: string) {
    }
}

/**
 * Save Templates
 */
export class SaveTemplates implements Action {
    readonly type = SAVE_TEMPLATES;

    constructor(public payload: any) {
    }
}

/**
 * Save Templates Success
 */
export class SaveTemplatesSuccess implements Action {
    readonly type = SAVE_TEMPLATES_SUCCESS;

    constructor() {
    }
}

/**
 * Save Templates Failed
 */
export class SaveTemplatesFailed implements Action {
    readonly type = SAVE_TEMPLATES_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Create Templates
 */
export class CreateTemplates implements Action {
    readonly type = CREATE_TEMPLATES;

    constructor() {
    }
}

/**
 * Create Templates Success
 */
export class CreateTemplatesSuccess implements Action {
    readonly type = CREATE_TEMPLATES_SUCCESS;

    constructor(public payload: any) {
    }
}

export type TemplatesEditActionsAll
    = CreateTemplates
    | CreateTemplatesSuccess
    | GetTemplates
    | GetTemplatesSuccess
    | GetTemplatesFailed
    | SaveTemplates
    | SaveTemplatesSuccess
    | SaveTemplatesFailed;
