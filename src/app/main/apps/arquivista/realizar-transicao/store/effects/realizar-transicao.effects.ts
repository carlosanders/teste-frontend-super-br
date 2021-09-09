import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {select, Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {catchError, filter, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import * as moment from 'moment';

import {Transicao} from '@cdk/models';
import {ProcessoService} from '@cdk/services/processo.service';
import {LoginService} from '../../../../../auth/login/login.service';
import {TransicaoService} from '@cdk/services/transicao.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {transicao as transicaoSchema} from '@cdk/normalizr';

import {getRouterState, State} from '../../../../../../store';
import * as RealizarTransicaoActions from '../actions/realizar-transicao.actions';
import * as fromStore from '../../store';
import {ChangeProcessos, getProcessosIds} from '../../../arquivista-list/store';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class RealizarTransicaoEffects {
    routerState: any;
    /**
     * Save RealizarTransicao
     *
     * @type {Observable<any>}
     */
    saveRealizarTransicao: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<RealizarTransicaoActions.SaveRealizarTransicao>(RealizarTransicaoActions.SAVE_REALIZAR_TRANSICAO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'temporalidade e destinação',
            content: 'Salvando a temporalidade e destinação ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._transicaoService.save(action.payload.transicao).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'temporalidade e destinação',
                content: 'Temporalidade e destinação id ' + response.id + ' salva com sucesso.',
                status: 1, // sucesso
            }))),
            mergeMap((response: Transicao) => [
                new RealizarTransicaoActions.SaveRealizarTransicaoSuccess(response),
                new AddData<Transicao>({data: [response], schema: transicaoSchema})
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'temporalidade e destinação',
                    content: 'Erro ao salvar a temporalidade e destinação!',
                    status: 2, // erro
                }));
                return of(new RealizarTransicaoActions.SaveRealizarTransicaoFailed(err));
            })
        ))
    ));
    /**
     * Save RealizarTransicao Success
     */
    saveRealizarTransicaoSuccess: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<RealizarTransicaoActions.SaveRealizarTransicaoSuccess>(RealizarTransicaoActions.SAVE_REALIZAR_TRANSICAO_SUCCESS),
        tap((action) => {
            this._store.dispatch(new fromStore.GetProcesso(action.payload.processo));
        })
    ), {dispatch: false});
    /**
     * Get Processo with router parameters
     *
     * @type {Observable<any>}
     */
    getProcesso: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<RealizarTransicaoActions.GetProcesso>(RealizarTransicaoActions.GET_PROCESSO),
        switchMap((action) => {
            const populate = JSON.stringify([
                'classificacao',
                'modalidadeFase',
                'classificacao.modalidadeDestinacao'
            ]);
            return this._processoService.get(action.payload.id, populate);
        }),
        mergeMap(response => [
            new RealizarTransicaoActions.GetProcessoSuccess(response)
        ]),
        catchError((err) => {
            console.log(err);
            return of(new RealizarTransicaoActions.GetProcessoFailed(err));
        })
    ));
    /**
     * Get Processo Success
     */
    getProcessoSuccess: any = createEffect(() => this._actions.pipe(
        ofType<RealizarTransicaoActions.GetProcessoSuccess>(RealizarTransicaoActions.GET_PROCESSO_SUCCESS),
        withLatestFrom(this._store.pipe(select(getProcessosIds))),
        tap(([action, entitiesId]) => {
            const currentDate = moment();
            let typeHandle = this.routerState.params['typeHandle'];
            if (!action.payload.dataHoraProximaTransicao) {
                typeHandle = 'pendencia-analise';
            } else if (action.payload.dataHoraProximaTransicao > currentDate) {
                typeHandle = 'aguardando-decurso';
            } else if (action.payload.dataHoraProximaTransicao <= currentDate) {
                if (action.payload.modalidadeFase.valor === 'CORRENTE') {
                    typeHandle = 'pronto-transferencia';
                }
                if (action.payload.modalidadeFase.valor === 'INTERMEDIÁRIA' && action.payload.classificacao.modalidadeDestinacao.valor === 'ELIMINAÇÃO') {
                    typeHandle = 'pronto-eliminação';
                }
                if (action.payload.modalidadeFase.valor === 'INTERMEDIÁRIA' && action.payload.classificacao.modalidadeDestinacao.valor === 'RECOLHIMENTO') {
                    typeHandle = 'pronto-recolhimento';
                }
            }
            if (typeHandle !== this.routerState.params['typeHandle']) {
                const newEntitiesId = entitiesId.filter(id => id !== action.payload.id);
                this._store.dispatch(new ChangeProcessos(newEntitiesId));
            }
            this._router.navigate(['apps/arquivista/' + this.routerState.params.unidadeHandle + '/'
            + this.routerState.params['typeHandle']]).then();
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _transicaoService: TransicaoService,
        private _processoService: ProcessoService,
        private _store: Store<State>,
        private _loginService: LoginService,
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
