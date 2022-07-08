import {Action} from '@ngrx/store';

export const GET_BOOKMARKS = '[VISUALIZAR PROCESSO] GET BOOKMARKS';
export const GET_BOOKMARKS_SUCCESS = '[VISUALIZAR PROCESSO] GET BOOKMARKS SUCCESS';
export const GET_BOOKMARKS_FAILED = '[VISUALIZAR PROCESSO] GET BOOKMARKS FAILED';

export const RELOAD_BOOKMARKS = '[VISUALIZAR PROCESSO] RELOAD BOOKMARKS';

/**
 * Get Bookmarks
 */
export class GetBookmarks implements Action
{
    readonly type = GET_BOOKMARKS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Bookmarks Success
 */
export class GetBookmarksSuccess implements Action
{
    readonly type = GET_BOOKMARKS_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Bookmarks Failed
 */
export class GetBookmarksFailed implements Action
{
    readonly type = GET_BOOKMARKS_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Reload Bookmarks
 */
export class ReloadBookmarks implements Action
{
    readonly type = RELOAD_BOOKMARKS;

    constructor()
    {
    }
}

export type BookmarksActionsAll
    = GetBookmarks
    | GetBookmarksSuccess
    | GetBookmarksFailed
    | ReloadBookmarks;
