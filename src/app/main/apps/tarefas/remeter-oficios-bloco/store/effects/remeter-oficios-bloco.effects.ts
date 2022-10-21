import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {DocumentoAvulso} from '@cdk/models';
import {AddData} from '@cdk/ngrx-normalizr';
import {documentoAvulso as documentoAvulsoSchema} from '@cdk/normalizr';
import {DocumentoAvulsoService} from '@cdk/services/documento-avulso.service';
import {CdkUtils} from '@cdk/utils';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {select, Store} from '@ngrx/store';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {getRouterState, RouterStateUrl, State} from 'app/store/reducers';
import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, tap} from 'rxjs/operators';
import * as fromStore from '../../store';

@Injectable()
export class RemeterOficiosBlocoEffect {

    routerState: RouterStateUrl;

    remeterOficio: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<fromStore.RemeterOficio>(fromStore.REMETER_OFICIO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao(action.payload.operacao))),
        mergeMap(action => this._documentoAvulsoService.remeter(action.payload.oficio).pipe(
            tap(() => this._store.dispatch(new OperacoesActions.Operacao({
                ...action.payload.operacao,
                content: 'Ofício id ' + action.payload.oficio.id + ' remetido com sucesso.',
                status: 1, // sucesso
                redo: 'inherent'
            }))),
            mergeMap((response: DocumentoAvulso) => [
                new fromStore.RemeterOficioSuccess(action.payload),
                new AddData<DocumentoAvulso>({data: [response], schema: documentoAvulsoSchema}),
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    ...action.payload.operacao,
                    content: 'Erro ao remeter ofício id ' + action.payload.oficio.id + '!',
                    status: 2, // erro
                    redo: 'inherent'
                }));
                return of(new fromStore.RemeterOficioFailed({
                    id: action.payload.documentoId,
                    error: CdkUtils.errorsToString(err)
                }));
            })
        ), 25)
    ));

    getDocumentos: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<fromStore.GetOficios>(fromStore.GET_OFICIOS),
        mergeMap(action => this._documentoAvulsoService.query(
                JSON.stringify({
                    ...action.payload.filter,
                    ...action.payload.gridFilter,
                }),
                action.payload.limit,
                action.payload.offset ?? 0,
                JSON.stringify(action.payload.sort),
                JSON.stringify(action.payload.populate),
                JSON.stringify(action.payload.context)
            ).pipe(
            mergeMap(response => [
                new AddData<DocumentoAvulso>({data: response['entities'], schema: documentoAvulsoSchema}),
                new fromStore.GetOficiosSuccess({
                    entitiesId: response['entities'].map((documento) => documento.id),
                    loaded: [this.routerState.params['generoHandle'], this.routerState.params['typeHandle'], this.routerState.params['targetHandle']].join('_'),
                    total: response['total'],
                }),
            ]),
            catchError((err) => {
                console.log(err);
                return of(new fromStore.GetOficiosFailed(err));
            })
        ))
    ));

    constructor(
        private _actions: Actions,
        private _documentoAvulsoService: DocumentoAvulsoService,
        private _store: Store<State>,
        private _router: Router
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }

}
