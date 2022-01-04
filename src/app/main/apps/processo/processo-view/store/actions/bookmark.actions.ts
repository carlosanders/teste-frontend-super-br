import {Action} from '@ngrx/store';

export const SAVE_BOOKMARK = '[PROCESSO VIEW] SAVE BOOKMARK';
export const SAVE_BOOKMARK_SUCCESS = '[PROCESSO VIEW] SAVE BOOKMARK SUCCESS';
export const SAVE_BOOKMARK_FAILED = '[PROCESSO VIEW] SAVE BOOKMARK FAILED';

export const GET_BOOKMARKS = '[PROCESSO VIEW] GET BOOKMARKS';
export const GET_BOOKMARKS_SUCCESS = '[PROCESSO VIEW] GET BOOKMARKS SUCCESS';
export const GET_BOOKMARKS_FAILED = '[PROCESSO VIEW] GET BOOKMARKS FAILED';

export const DELETE_BOOKMARK = '[PROCESSO VIEW] DELETE BOOKMARK';
export const DELETE_BOOKMARK_SUCCESS = '[PROCESSO VIEW] DELETE BOOKMARK SUCCESS';
export const DELETE_BOOKMARK_FAILED = '[PROCESSO VIEW] DELETE BOOKMARK FAILED';

export const RELOAD_BOOKMARKS = '[PROCESSO VIEW] RELOAD BOOKMARKS';

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
 * Save Bookmark
 */
export class SaveBookmark implements Action
{
    readonly type = SAVE_BOOKMARK;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Bookmark Success
 */
export class SaveBookmarkSuccess implements Action
{
    readonly type = SAVE_BOOKMARK_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Bookmark Failed
 */
export class SaveBookmarkFailed implements Action
{
    readonly type = SAVE_BOOKMARK_FAILED;

    constructor(public payload: any)
    {
    }
}


/**
 * Delete Bookmark
 */
export class DeleteBookmark implements Action
{
    readonly type = DELETE_BOOKMARK;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Bookmark Success
 */
export class DeleteBookmarkSuccess implements Action
{
    readonly type = DELETE_BOOKMARK_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Bookmark Failed
 */
export class DeleteBookmarkFailed implements Action
{
    readonly type = DELETE_BOOKMARK_FAILED;

    constructor(public payload: any)
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
    | SaveBookmark
    | SaveBookmarkSuccess
    | SaveBookmarkFailed
    | DeleteBookmark
    | DeleteBookmarkSuccess
    | DeleteBookmarkFailed
    | ReloadBookmarks;
