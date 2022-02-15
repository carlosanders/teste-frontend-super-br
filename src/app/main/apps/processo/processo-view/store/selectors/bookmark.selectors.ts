import {createSelector} from '@ngrx/store';
import {BookmarksState, getProcessoViewAppState, ProcessoViewAppState} from "../reducers";
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Bookmark} from '@cdk/models/bookmark.model';
import {bookmark as bookmarkSchema} from '@cdk/normalizr';

const schemaSelectors = createSchemaSelectors<Bookmark>(bookmarkSchema);

export const getBookmarkState: any = createSelector(
    getProcessoViewAppState,
    (state: ProcessoViewAppState) => state.bookmark
);

export const getBookmarksIds: any = createSelector(
    getBookmarkState,
    (state: BookmarksState) => state.entitiesId
);

export const getBookmarks: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getBookmarksIds,
    schemaSelectors.entitiesProjector
);

export const getIsSavingBookmark: any = createSelector(
    getBookmarkState,
    (state: BookmarksState) => state.saving
);

export const getErrorsBookmark: any = createSelector(
    getBookmarkState,
    (state: BookmarksState) => state.errors
);

export const getIsLoadingBookmark: any = createSelector(
    getBookmarkState,
    (state: BookmarksState) => state.loading
);

export const getBookmarksId: any = createSelector(
    getBookmarkState,
    (state: BookmarksState) => state.entitiesId
);

export const getPaginationBookmark: any = createSelector(
    getBookmarkState,
    (state: BookmarksState) => state.pagination
);

export const getDeletingBookmarkId: any = createSelector(
    getBookmarkState,
    (state: BookmarksState) => state.deletingBookmarksIds
);
