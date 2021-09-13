import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as ProtocoloCreateActions from '../actions';

import {ProcessoService} from '@cdk/services/processo.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {processo as processoSchema} from '@cdk/normalizr';
import {Processo} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {ReloadProcessos, UnloadProcessos} from '../../../store';

@Injectable()
export class ProtocoloCreateEffects {
    routerState: any;
    /**
     * Save Processo
     *
     * @type {Observable<any>}
     */
    saveProcesso: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ProtocoloCreateActions.SaveProcesso>(ProtocoloCreateActions.SAVE_PROCESSO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'processo',
            content: 'Salvando a processo ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._processoService.save(action.payload.processo).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'processo',
                content: 'Processo id ' + response.id + ' salva com sucesso.',
                status: 1, // sucesso
            }))),
            mergeMap((response: Processo) => [
                new ProtocoloCreateActions.SaveProcessoSuccess(response),
                new UnloadProcessos({reset: false}),
                new ReloadProcessos(),
                new AddData<Processo>({data: [response], schema: processoSchema})
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'processo',
                    content: 'Erro ao salvar a processo!',
                    status: 2, // erro
                }));
                return of(new ProtocoloCreateActions.SaveProcessoFailed(err));
            })
        ))
    ));
    /**
     * Save Processo Success
     */
    saveProcessoSuccess: any = createEffect(() => this._actions.pipe(
        ofType<ProtocoloCreateActions.SaveProcessoSuccess>(ProtocoloCreateActions.SAVE_PROCESSO_SUCCESS),
        tap((action) => {
            this._router.navigate([this.routerState.url + '/' + action.payload.id]).then();
        })
    ), {dispatch: false});
    /**
     * Concluir Processo
     */
    concluirProcesso: any = createEffect(() => this._actions.pipe(
        ofType<ProtocoloCreateActions.ConcluirProcesso>(ProtocoloCreateActions.CONCLUIR_PROCESSO),
        tap(() => {
            this._router.navigate([this.routerState.url.split('/criar')[0]]).then();
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _processoService: ProcessoService,
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
