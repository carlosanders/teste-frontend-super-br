import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, switchMap} from 'rxjs/operators';

import * as BookmarkActions from '../actions/bookmark.actions';

import {BookmarkService} from '@cdk/services/bookmark.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {bookmark as bookmarkSchema} from '@cdk/normalizr';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {DomSanitizer} from '@angular/platform-browser';
import {Bookmark} from '@cdk/models/bookmark.model';
import {CdkUtils} from '@cdk/utils';
import * as fromStore from '../index';

@Injectable()
export class BookmarkEffects {
    routerState: any;

    /**
     * Get Bookmark
     *
     * @type {Observable<any>}
     */
    getBookmark: any = createEffect(() => this._actions.pipe(
        ofType<BookmarkActions.GetBookmarks>(BookmarkActions.GET_BOOKMARKS),
        switchMap(action => this._bookmarkService.query(
            JSON.stringify({
                ...action.payload.params.filter,
                ...action.payload.params.gridFilter,
            }),
            action.payload.params.limit,
            action.payload.params.offset,
            JSON.stringify(action.payload.params.sort),
            JSON.stringify(action.payload.params.populate)
        )),
        switchMap(response => [
            new AddData<Bookmark>({data: response['entities'], schema: bookmarkSchema}),
            new BookmarkActions.GetBookmarksSuccess({
                entitiesId: response['entities'].map(bookmark => bookmark.id),
                total: response['total']
            }),
        ]),
        catchError((err) => {
            console.log(err);
            return of(new BookmarkActions.GetBookmarksFailed(err));
        })
    ));

    /**
     * Reload Bookmarks with router parameters
     *
     * @type {any}
     */
    reloadBookmarks: any = createEffect(() => this._actions.pipe(
        ofType<BookmarkActions.ReloadBookmarks>(BookmarkActions.RELOAD_BOOKMARKS),
        map(() => {
            const params = {
                filter: {
                    'processo.id': 'eq:' + this.routerState.params.processoViewHandle
                },
                listFilter: {},
                limit: 25,
                offset: 0,
                sort: {'juntada.numeracaoSequencial': 'DESC', 'pagina': 'ASC'},
                populate: [
                    'juntada',
                    'componenteDigital'
                ]
            };

            const operacaoId = CdkUtils.makeId();
            this._store.dispatch(new fromStore.GetBookmarks({
                params: params,
                operacaoId: operacaoId
            }));
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _bookmarkService: BookmarkService,
        private _store: Store<State>,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _sanitizer: DomSanitizer,
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }
}
