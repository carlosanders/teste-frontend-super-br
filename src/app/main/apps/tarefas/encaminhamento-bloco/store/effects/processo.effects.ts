import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as ProcessoActions from '../actions/processo.actions';

import {ProcessoService} from '@cdk/services/processo.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {processo as processoSchema} from '@cdk/normalizr';
import {Processo} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {CdkUtils} from '../../../../../../../@cdk/utils';

@Injectable()
export class ProcessoEffect {
    routerState: any;
    /**
     * Save Processo
     *
     * @type {Observable<any>}
     */
    saveProcesso: any = createEffect(() => this._actions.pipe(
        ofType<ProcessoActions.SaveProcesso>(ProcessoActions.SAVE_PROCESSO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'processo',
            content: 'Arquivando processo id ' + action.payload.processo.id + ' ...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        switchMap(action => this._processoService.arquivar(action.payload.processo).pipe(
            tap(() => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'processo',
                content: 'Processo id ' + action.payload.processo.id + ' arquivado com sucesso.',
                status: 1, // sucesso
                lote: action.payload.loteId
            }))),
            mergeMap((response: Processo) => [
                new ProcessoActions.SaveProcessoSuccess(response),
                new AddData<Processo>({data: [response], schema: processoSchema})
            ]),
            catchError((err) => {
                console.log(err);
                const payload = {
                    id: action.payload.processo.id,
                    errors: err
                };
                const erroString = CdkUtils.errorsToString(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'processo',
                    content: `Houve erro ao arquivar o processo ${action.payload.processo.NUPFormatado}! ${erroString}`,
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                return of(new ProcessoActions.SaveProcessoFailed(payload));
            })
        ))
    ));
    /**
     * Save Processo Success
     */
    saveProcessoSuccess: any = createEffect(() => this._actions.pipe(
        ofType<ProcessoActions.SaveProcessoSuccess>(ProcessoActions.SAVE_PROCESSO_SUCCESS),
        tap(() => {
            this._router.navigate([
                'apps/tarefas/' + this.routerState.params.generoHandle + '/'
                + this.routerState.params.typeHandle + '/'
                + this.routerState.params.targetHandle
            ]).then();
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
