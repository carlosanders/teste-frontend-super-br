import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {
    buffer,
    catchError,
    concatMap,
    filter,
    map,
    mergeAll,
    mergeMap,
    switchMap,
    tap,
    withLatestFrom
} from 'rxjs/operators';
import {AddData} from '@cdk/ngrx-normalizr';
import {desentranhamento as desentranhamentoSchema, juntada as juntadaSchema} from '@cdk/normalizr';
import {Desentranhamento, Juntada} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {JuntadaService} from '@cdk/services/juntada.service';
import * as JuntadaCreateBlocoActions
    from 'app/main/apps/processo/processo-edit/juntadas/desentranhamento-create-bloco/store/actions';
import * as OperacoesActions from '../../../../../../../../store/actions/operacoes.actions';
import {DesentranhamentoService} from '@cdk/services/desentranhamento.service';
import {getBufferingDesentranhamento, getSavingIds} from '../selectors';
import {DesentranhaJuntada, DesentranhaJuntadaCancel} from '../../../juntada-list/store';

@Injectable()
export class JuntadaCreateBlocoEffect {
    routerState: any;
    /**
     * Get Juntadas with router parameters
     *
     * @type {Observable<any>}
     */
    getJuntadas: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<JuntadaCreateBlocoActions.GetJuntadas>(JuntadaCreateBlocoActions.GET_JUNTADAS),
        switchMap(action => this._juntadaService.query(
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
            new AddData<Juntada>({data: response['entities'], schema: juntadaSchema}),
            new JuntadaCreateBlocoActions.GetJuntadasSuccess({
                entitiesId: response['entities'].map(juntada => juntada.id),
                loaded: {
                    id: 'processoHandle',
                    value: this.routerState.params.processoHandle
                },
                total: response['total']
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new JuntadaCreateBlocoActions.GetJuntadasFailed(err));
        })
    ));
    /**
     * Save Desentranhamento
     *
     * @type {Observable<any>}
     */
    saveDesentranhamento: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<JuntadaCreateBlocoActions.SaveDesentranhamento>(JuntadaCreateBlocoActions.SAVE_DESENTRANHAMENTO),
        tap((action) => {
            this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'desentranhamento',
                content: 'Desentranhando juntada id ' + action.payload.desentranhamento.juntada.id + '...',
                status: 0, // carregando
                lote: action.payload.loteId,
                redo: action.payload.redo
            }));
            this._store.dispatch(new DesentranhaJuntada(action.payload.desentranhamento.juntada.id));
            this._router.navigate([this.routerState.url.replace('juntadas/desentranhar', 'juntadas/listar')]).then();
        }),
        buffer(this._store.pipe(select(getBufferingDesentranhamento))),
        mergeAll(),
        withLatestFrom(this._store.pipe(select(getSavingIds))),
        concatMap(([action, savingJuntadasIds]) => {
            if (savingJuntadasIds.indexOf(action.payload.desentranhamento.juntada.id) === -1) {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'desentranhamento',
                    content: 'Operação de desentranhamento na juntada id ' + action.payload.desentranhamento.juntada.id + ' foi cancelada!',
                    status: 3, // cancelada
                    lote: action.payload.loteId,
                    redo: 'inherent'
                }));
                this._store.dispatch(new DesentranhaJuntadaCancel(action.payload.desentranhamento.juntada.id));
                return of(new JuntadaCreateBlocoActions.SaveDesentranhamentoCancelSuccess(action.payload.desentranhamento.juntada.id));
            }
            return this._desentranhamentoService.save(action.payload.desentranhamento).pipe(
                map((response) => {
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'desentranhamento',
                        content: 'Juntada id ' + action.payload.desentranhamento.juntada.id + ' desentranhada com sucesso.',
                        status: 1, // sucesso
                        lote: action.payload.loteId,
                        redo: 'inherent'
                    }));
                    this._store.dispatch(new AddData<Desentranhamento>({
                        data: [response],
                        schema: desentranhamentoSchema
                    }));
                    return new JuntadaCreateBlocoActions.SaveDesentranhamentoSuccess(response);
                }),
                catchError((err) => {
                    const payload = {
                        id: action.payload.desentranhamento.juntada.id,
                        error: err
                    };
                    let serializedMessage: any;
                    if (err.error && err.error.status && err.error.status === 422) {
                        try {
                            serializedMessage = JSON.parse(err.error.message)[0]?.message;
                        } catch (e) {
                            serializedMessage = err.error.message;
                        }
                    }

                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'desentranhamento',
                        content: 'Erro no desentranhamento da juntada id ' + action.payload.desentranhamento.juntada.id + ': ' +
                            serializedMessage,
                        status: 2, // erro
                        lote: action.payload.loteId,
                        redo: 'inherent'
                    }));
                    console.log(err);
                    return of(new JuntadaCreateBlocoActions.SaveDesentranhamentoFailed(payload));
                })
            );
        })
    ));

    constructor(
        private _actions: Actions,
        private _juntadaService: JuntadaService,
        private _desentranhamentoService: DesentranhamentoService,
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
