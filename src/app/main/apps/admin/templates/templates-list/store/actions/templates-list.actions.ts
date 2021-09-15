import {Action} from '@ngrx/store';

export const GET_TEMPLATES = '[TEMPLATES LIST] GET TEMPLATES';
export const GET_TEMPLATES_SUCCESS = '[TEMPLATES LIST] GET TEMPLATES SUCCESS';
export const GET_TEMPLATES_FAILED = '[TEMPLATES LIST] GET TEMPLATES FAILED';

export const RELOAD_TEMPLATES = '[TEMPLATES LIST] RELOAD TEMPLATES';
export const UNLOAD_TEMPLATES = '[TEMPLATES LIST] UNLOAD TEMPLATES';

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
 * Unload UsuariosExternos
 */
export class UnloadTemplates implements Action {
    readonly type = UNLOAD_TEMPLATES;

    constructor() {
    }
}

/**
 * Reload Templates
 */
export class ReloadTemplates implements Action {
    readonly type = RELOAD_TEMPLATES;

    constructor() {
    }
}


export type TemplatesListActionsAll
    = GetTemplates
    | GetTemplatesSuccess
    | GetTemplatesFailed
    | UnloadTemplates
    | ReloadTemplates;

