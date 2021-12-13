import {Action} from '@ngrx/store';

export const SAVE_BOOKMARK = '[PROCESSO VIEW] SAVE BOOKMARK';
export const SAVE_BOOKMARK_SUCCESS = '[PROCESSO VIEW] SAVE BOOKMARK SUCCESS';
export const SAVE_BOOKMARK_FAILED = '[PROCESSO VIEW] SAVE BOOKMARK FAILED';

export const GET_BOOKMARK = '[PROCESSO VIEW] GET BOOKMARK';
export const GET_BOOKMARK_SUCCESS = '[PROCESSO VIEW] GET BOOKMARK SUCCESS';
export const GET_BOOKMARK_FAILED = '[PROCESSO VIEW] GET BOOKMARK FAILED';

/**
 * Get Bookmarks
 */
export class GetBookmarks implements Action
{
    readonly type = GET_BOOKMARK;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Bookmarks Success
 */
export class GetBookmarksSuccess implements Action
{
    readonly type = GET_BOOKMARK_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Bookmarks Failed
 */
export class GetBookmarksFailed implements Action
{
    readonly type = GET_BOOKMARK_FAILED;

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

    constructor()
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

export type BookmarksActionsAll
    = GetBookmarks
    | GetBookmarksSuccess
    | GetBookmarksFailed
    | SaveBookmark
    | SaveBookmarkSuccess
    | SaveBookmarkFailed;
