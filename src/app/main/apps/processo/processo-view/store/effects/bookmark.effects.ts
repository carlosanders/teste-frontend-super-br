import {Injectable, SecurityContext} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as BookmarkActions from '../actions/bookmark.actions';

import {BookmarkService} from '@cdk/services/bookmark.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {componenteDigital as componenteDigitalSchema, documento as documentoSchema} from '@cdk/normalizr';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {DomSanitizer} from '@angular/platform-browser';
import {Bookmark} from "../../../../../../../@cdk/models/bookmark.model";

@Injectable()
export class ComponentesDigitaisEffects {
    routerState: any;
    bookmarkId: number;

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
        switchMap(action => this._bookmarkService.save(action.payload.componenteDigital).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'bookmark',
                content: `Bookmark id ${response.id} criado com sucesso!`,
                status: 1, // sucesso
            }))),
            mergeMap((response: any) => [
                new BookmarkActions.SaveBookmarkSuccess(),
                new AddData<Bookmark>({
                    data: [{...action.payload.bookmark, ...response}],
                    schema: componenteDigitalSchema
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
        ))
    ));

    /**
     * Get Bookmark
     *
     * @type {Observable<any>}
     */
    getBookmark: any = createEffect(() => this._actions.pipe(
        ofType<BookmarkActions.GetBookmarks>(BookmarkActions.GET_BOOKMARK),
        tap((action) => {
                this.bookmarkId = action.payload.bookmarkId;
            }
        ),
        switchMap(action => this._bookmarkService.query(
            `{"componentesDigitais.id": "eq:${action.payload.bookmarkId}"}`,
            1,
            0,
            '{}',
            '[]')),
        switchMap(response => [
            new AddData<Bookmark>({data: response['entities'], schema: documentoSchema}),
            new BookmarkActions.GetBookmarksSuccess({
                documentoId: response['entities'][0].id
            }),
        ]),
        catchError((err) => {
            console.log(err);
            return of(new BookmarkActions.GetBookmarksFailed(err));
        })
    ));

    getDocumentoSuccess: any = createEffect(() => this._actions.pipe(
        ofType<BookmarkActions.GetBookmarksSuccess>(BookmarkActions.GET_BOOKMARK_SUCCESS),
        tap((action) => {
            const primary = 'bookmark/' + action.payload.componenteDigitalId;
            const sidebar = 'editar/' + action.payload.routeDocumento;

            this._router.navigate([
                    this.routerState.url.split('processo/')[0] + 'processo/' + this.routerState.params.processoHandle
                    + '/visualizar/' + this.routerState.params.stepHandle + '/documento/' + action.payload.documentoId,
                    {
                        outlets: {
                            primary: primary,
                            sidebar: sidebar
                        }
                    }
                ],
                {
                    relativeTo: this._activatedRoute.parent
                }).then();
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
