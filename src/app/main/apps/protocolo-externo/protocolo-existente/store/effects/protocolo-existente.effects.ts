import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as ProtocoloExistenteActions from '../actions';

import {JuntadaService} from '@cdk/services/juntada.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {juntada as juntadaSchema} from '@cdk/normalizr';
import {Juntada} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {ReloadProcessos, UnloadProcessos} from '../../../store';
import {CONCLUIR_JUNTADA} from "../actions";

@Injectable()
export class ProtocoloExistenteEffects {
    routerState: any;
    /**
     * Save Processo
     *
     * @type {Observable<any>}
     */
    saveJuntada: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ProtocoloExistenteActions.SaveJuntada>(ProtocoloExistenteActions.SAVE_JUNTADA),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'juntada',
            content: 'Salvando a juntada ...',
            status: 0, // carregando
        }))),
        switchMap(action =>
            this._juntadaService.saveProtocoloExistente(
                action.payload.processo,
                JSON.stringify({context: 'protocoloExterno'}),).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'juntada',
                content: 'Juntada id ' + response.id + ' salva com sucesso.',
                status: 1, // sucesso
            }))),
            mergeMap((response: Juntada) => [
                new ProtocoloExistenteActions.SaveJuntadaSuccess(response),
                new UnloadProcessos({reset: false}),
                new ReloadProcessos(),
                new AddData<Juntada>({data: [response], schema: juntadaSchema})
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'juntada',
                    content: 'Erro ao salvar a juntada!',
                    status: 2, // erro
                }));
                return of(new ProtocoloExistenteActions.SaveJuntadaFailed(err));
            })
        ))
    ));
    /**
     * Save Processo Success
     */
    saveJuntadaSuccess: any = createEffect(() => this._actions.pipe(
        ofType<ProtocoloExistenteActions.SaveJuntadaSuccess>(ProtocoloExistenteActions.SAVE_JUNTADA_SUCCESS),
        tap((action) => {
            this._router.navigate([this.routerState.url + '/anexar']).then();
        })
    ), {dispatch: false});
    /**
     * Concluir Processo
     */
    concluirJuntada: any = createEffect(() => this._actions.pipe(
        ofType<ProtocoloExistenteActions.ConcluirJuntada>(ProtocoloExistenteActions.CONCLUIR_JUNTADA),
        tap(() => {
            this._router.navigate([this.routerState.url.split('/protocolo-existente')[0]]).then();
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _juntadaService: JuntadaService,
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
