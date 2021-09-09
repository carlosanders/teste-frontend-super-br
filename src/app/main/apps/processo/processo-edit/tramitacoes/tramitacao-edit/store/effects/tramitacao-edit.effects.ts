import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as TramitacaoEditActions from '../actions/tramitacao-edit.actions';
import * as TramitacaoListActions from '../../../tramitacao-list/store/actions/tramitacao-list.actions';

import {TramitacaoService} from '@cdk/services/tramitacao.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {tramitacao as tramitacaoSchema} from '@cdk/normalizr';
import {Tramitacao} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class TramitacaoEditEffect {
    routerState: any;
    /**
     * Get Tramitacao with router parameters
     *
     * @type {Observable<any>}
     */
    getTramitacao: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<TramitacaoEditActions.GetTramitacao>(TramitacaoEditActions.GET_TRAMITACAO),
        switchMap(action => this._tramitacaoService.query(
            JSON.stringify(action.payload),
            1,
            0,
            JSON.stringify({}),
            JSON.stringify([
                'populateAll'
            ]))),
        switchMap(response => [
            new AddData<Tramitacao>({data: response['entities'], schema: tramitacaoSchema}),
            new TramitacaoEditActions.GetTramitacaoSuccess({
                loaded: {
                    id: 'tramitacaoHandle',
                    value: this.routerState.params.tramitacaoHandle
                },
                tramitacaoId: response['entities'][0].id
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new TramitacaoEditActions.GetTramitacaoFailed(err));
        })
    ));
    /**
     * Save Tramitacao
     *
     * @type {Observable<any>}
     */
    saveTramitacao: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<TramitacaoEditActions.SaveTramitacao>(TramitacaoEditActions.SAVE_TRAMITACAO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'tramitação',
            content: 'Salvando a tramitação ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._tramitacaoService.save(action.payload.tramitacao).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'tramitação',
                content: 'Tramitação id ' + response.id + ' salva com sucesso.',
                status: 1, // sucesso
            }))),
            mergeMap((response: Tramitacao) => [
                new TramitacaoEditActions.SaveTramitacaoSuccess(),
                new TramitacaoListActions.ReloadTramitacoes(),
                new AddData<Tramitacao>({data: [response], schema: tramitacaoSchema})
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'tramitação',
                    content: 'Erro ao salvar a tramitação!',
                    status: 2, // erro
                }));
                return of(new TramitacaoEditActions.SaveTramitacaoFailed(err));
            })
        ))
    ));
    /**
     * Save Tramitacao Success
     */
    saveTramitacaoSuccess: any = createEffect(() => this._actions.pipe(
        ofType<TramitacaoEditActions.SaveTramitacaoSuccess>(TramitacaoEditActions.SAVE_TRAMITACAO_SUCCESS),
        tap(() => {
            this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.tramitacaoHandle), 'listar')]).then();
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _tramitacaoService: TramitacaoService,
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
