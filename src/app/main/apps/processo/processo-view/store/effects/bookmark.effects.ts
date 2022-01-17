import {Injectable, SecurityContext} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as BookmarkActions from '../actions/bookmark.actions';

import {BookmarkService} from '@cdk/services/bookmark.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {bookmark as bookmarkSchema} from '@cdk/normalizr';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {DomSanitizer} from '@angular/platform-browser';
import {Bookmark} from '@cdk/models/bookmark.model';
import {CdkUtils} from '@cdk/utils';
import * as fromStore from '../index';

@Injectable()
export class BookmarkEffects {
    routerState: any;

    /**
     * Save Bookmark
     *
     * @type {Observable<any>}
     */
    saveBookmark: any = createEffect(() => this._actions.pipe(
        ofType<BookmarkActions.SaveBookmark>(BookmarkActions.SAVE_BOOKMARK),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'bookmark',
            content: 'Criando bookmark ...',
            status: 0, // carregando
        }))),
        switchMap((action) => {
            const populate = JSON.stringify([
                'componenteDigital',
                'juntada'
            ]);
            return this._bookmarkService.save(action.payload.bookmark, '{}', populate).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'bookmark',
                content: `Bookmark id ${response.id} criado com sucesso!`,
                status: 1, // sucesso
            }))),
            mergeMap((response: any) => [
                new BookmarkActions.SaveBookmarkSuccess({
                    entitiesId: [response.id]
                }),
                new AddData<Bookmark>({
                    data: [{...action.payload.bookmark, ...response}],
                    schema: bookmarkSchema
                })
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'bookmark',
                    content: 'Ocorreu um erro ao salvar o bookmark.',
                    status: 2, // erro
                }));
                return of(new BookmarkActions.SaveBookmarkFailed(err));
            })
        )}
        )
    ));

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
     * Delete Bookmark
     *
     * @type {Observable<any>}
     */
    deleteBookmark: Observable<BookmarkActions.BookmarksActionsAll> = createEffect(() => this._actions.pipe(
        ofType<BookmarkActions.DeleteBookmark>(BookmarkActions.DELETE_BOOKMARK),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'bookmark',
            content: 'Apagando o bookmark id ' + action.payload.bookmarkId + '...',
            status: 0
        }))),
        mergeMap(action => this._bookmarkService.destroy(action.payload.bookmarkId).pipe(
            map((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'bookmark',
                    content: 'Bookmark id ' + action.payload.bookmarkId + ' deletado com sucesso.',
                    status: 1
                }));
                this._store.dispatch(new UpdateData<Bookmark>({
                    id: response.id,
                    schema: bookmarkSchema,
                    changes: {apagadoEm: response.apagadoEm}
                }));
                return new BookmarkActions.DeleteBookmarkSuccess(response.id);
            }),
            catchError((err) => {
                const payload = {
                    id: action.payload.bookmarkId,
                    error: err
                };
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'documento',
                    content: 'Erro ao apagar o documento anexo de id ' + action.payload.bookmarkId + '!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                console.log(err);
                return of(new BookmarkActions.DeleteBookmarkFailed(payload));
            })
        ), 25)
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
                    'processo.id': 'eq:' + this.routerState.params.processoHandle
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
