import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {getRouterState, State} from 'app/store/reducers';
import {JuntadaService} from '@cdk/services/juntada.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Desentranhamento, Juntada} from '@cdk/models';
import {
    desentranhamento as desentranhamentoSchema,
    juntada as juntadaSchema
} from '@cdk/normalizr';
import {Router} from '@angular/router';
import {DocumentoService} from '@cdk/services/documento.service';
import {DesentranhamentoService} from '@cdk/services/desentranhamento.service';
import * as OperacoesActions from '../../../../../../../store/actions/operacoes.actions';
import {getPagination} from '../selectors';
import * as JuntadaActions from 'app/main/apps/processo/processo-edit/processo-create/store/actions';
import {CdkUtils} from '@cdk/utils';

@Injectable()
export class JuntadaEffects {
    routerState: any;
    /**
     * Get Juntadas with router parameters
     *
     * @type {Observable<any>}
     */
    getJuntadas: any = createEffect(() => this._actions.pipe(
        ofType<JuntadaActions.GetJuntadas>(JuntadaActions.GET_JUNTADAS),
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
            new JuntadaActions.GetJuntadasSuccess({
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
            return of(new JuntadaActions.GetJuntadasFailed(err));
        })
    ));
    /**
     * Reload Documentos
     */
    reloadJuntadas: any = createEffect(() => this._actions.pipe(
        ofType<JuntadaActions.ReloadJuntadas>(JuntadaActions.RELOAD_JUNTADAS),
        withLatestFrom(this._store.pipe(select(getPagination))),
        tap(([, pagination]) => this._store.dispatch(new JuntadaActions.GetJuntadas(pagination)))
    ), {dispatch: false});
    /**
     * Save Desentranhamento
     *
     * @type {Observable<any>}
     */
    saveDesentranhamento: any = createEffect(() => this._actions.pipe(
        ofType<JuntadaActions.SaveDesentranhamento>(JuntadaActions.SAVE_DESENTRANHAMENTO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'desentranhamento',
            content: 'Salvando o desentranhamento ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._desentranhamentoService.save(action.payload.desentranhamento).pipe(
            tap(() => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'desentranhamento',
                content: 'Juntada id ' + action.payload.desentranhamento.juntada.id + ' desentranhada com sucesso.',
                status: 1, // sucesso
            }))),
            mergeMap((response: Desentranhamento) => [
                new JuntadaActions.SaveDesentranhamentoSuccess(action.payload),
                new AddData<Desentranhamento>({data: [response], schema: desentranhamentoSchema}),
            ]),
            catchError((err) => {
                console.log(err);
                const serializedMessage = CdkUtils.errorsToString(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'desentranhamento',
                    content: 'Erro no desentranhamento da juntada id ' + action.payload.desentranhamento.juntada.id + ': ' +
                        serializedMessage,
                    status: 2, // erro
                }));
                return of(new JuntadaActions.SaveDesentranhamentoFailed(action.payload));
            })
        ))
    ));

    constructor(
        private _actions: Actions,
        private _juntadaService: JuntadaService,
        private _documentoService: DocumentoService,
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
