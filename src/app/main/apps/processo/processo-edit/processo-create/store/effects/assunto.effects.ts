import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import * as AssuntoActions from '../actions/assunto.actions';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {Assunto} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {assunto as assuntoSchema} from '@cdk/normalizr';
import {AssuntoService} from '@cdk/services/assunto.service';
import {getAssuntosPagination} from '../selectors';
import * as OperacoesActions from '../../../../../../../store/actions/operacoes.actions';

@Injectable()
export class AssuntosEffect {
    routerState: any;
    /**
     * Get Assuntos Processo
     *
     * @type {Observable<any>}
     */
    getAssuntosProcesso: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<AssuntoActions.GetAssuntos>(AssuntoActions.GET_ASSUNTOS),
        switchMap(action => this._assuntoService.query(
            JSON.stringify({
                ...action.payload.filter,
                ...action.payload.gridFilter,
            }),
            action.payload.limit,
            action.payload.offset,
            JSON.stringify(action.payload.sort),
            JSON.stringify(action.payload.populate),
            JSON.stringify(action.payload.context))),
        mergeMap(response => [
            new AddData<Assunto>({data: response['entities'], schema: assuntoSchema}),
            new AssuntoActions.GetAssuntosSuccess({
                entitiesId: response['entities'].map(assunto => assunto.id),
                loaded: {
                    id: 'processoHandle',
                    value: this.routerState.params.processoHandle,
                },
                total: response['total']
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new AssuntoActions.GetAssuntosFailed(err));
        })
    ));
    /**
     * Delete Assunto
     *
     * @type {Observable<any>}
     */
    deleteAssunto: Observable<AssuntoActions.AssuntoActionsAll> = createEffect(() => this._actions.pipe(
        ofType<AssuntoActions.DeleteAssunto>(AssuntoActions.DELETE_ASSUNTO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'assunto',
            content: 'Apagando o assunto id ' + action.payload.assuntoId + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._assuntoService.destroy(action.payload.assuntoId).pipe(
            map((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'assunto',
                    content: 'Assunto id ' + action.payload.assuntoId + ' deletado com sucesso.',
                    status: 1, // sucesso
                    lote: action.payload.loteId
                }));
                this._store.dispatch(new UpdateData<Assunto>({
                    id: response.id,
                    schema: assuntoSchema,
                    changes: {apagadoEm: response.apagadoEm}
                }));
                return new AssuntoActions.DeleteAssuntoSuccess(response.id);
            }),
            catchError((err) => {
                const payload = {
                    id: action.payload.assuntoId,
                    error: err
                };
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'assunto',
                    content: 'Erro ao apagar o assunto id ' + action.payload.assuntoId + '!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                console.log(err);
                return of(new AssuntoActions.DeleteAssuntoFailed(payload));
            })
        ), 25)
    ));
    /**
     * Save Assunto
     *
     * @type {Observable<any>}
     */
    saveAssunto: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<AssuntoActions.SaveAssunto>(AssuntoActions.SAVE_ASSUNTO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'assunto',
            content: 'Salvando o assunto ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._assuntoService.save(action.payload.assunto).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'assunto',
                content: 'Assunto id ' + response.id + ' salvo com sucesso.',
                status: 1, // sucesso
            }))),
            mergeMap((response: Assunto) => [
                new AssuntoActions.SaveAssuntoSuccess(),
                new AddData<Assunto>({data: [response], schema: assuntoSchema})
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'assunto',
                    content: 'Erro ao salvar o assunto!',
                    status: 2, // erro
                }));
                return of(new AssuntoActions.SaveAssuntoFailed(err));
            })
        ))
    ));
    /**
     * Save Assunto Success
     *
     * @type {Observable<any>}
     */
    saveAssuntoSuccess: any = createEffect(() => this._actions.pipe(
        ofType<AssuntoActions.SaveAssuntoSuccess>(AssuntoActions.SAVE_ASSUNTO_SUCCESS),
        withLatestFrom(this._store.pipe(select(getAssuntosPagination))),
        tap(([, pagination]) => {
            this._store.dispatch(new AssuntoActions.GetAssuntos(pagination));
        }),
    ), {dispatch: false});

    /**
     *
     * @param _actions
     * @param _assuntoService
     * @param _store
     * @param _router
     */
    constructor(
        private _actions: Actions,
        private _assuntoService: AssuntoService,
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
