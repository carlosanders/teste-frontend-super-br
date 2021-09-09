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
import * as RegistrarExtravioActions from '../actions/registrar-extravio.actions';
import * as fromStore from '../../store';
import {ChangeProcessos, getProcessosIds} from '../../../arquivista-list/store';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class RegistrarExtravioEffects {
    routerState: any;
    /**
     * Save RealizarTransicao
     *
     * @type {Observable<any>}
     */
    saveRegistrarExtravio: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<RegistrarExtravioActions.SaveRegistrarExtravio>(RegistrarExtravioActions.SAVE_REGISTRAR_EXTRAVIO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'temporalidade e destinação',
            content: 'Salvando o registro de extravio ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._transicaoService.save(action.payload.transicao).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'temporalidade e destinação',
                content: 'Registro de extravio id ' + response.id + ' salvo com sucesso.',
                status: 1, // sucesso
            }))),
            mergeMap((response: Transicao) => [
                new RegistrarExtravioActions.SaveRegistrarExtravioSuccess(response),
                new AddData<Transicao>({data: [response], schema: transicaoSchema})
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'temporalidade e destinação',
                    content: 'Erro ao salvar o registro de extravio!',
                    status: 2, // erro
                }));
                return of(new RegistrarExtravioActions.SaveRegistrarExtravioFailed(err));
            })
        ))
    ));
    /**
     * Save RegistrarExtravio Success
     */
    saveRegistrarExtravioSuccess: any = createEffect(() => this._actions.pipe(
        ofType<RegistrarExtravioActions.SaveRegistrarExtravioSuccess>(RegistrarExtravioActions.SAVE_REGISTRAR_EXTRAVIO_SUCCESS),
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
        ofType<RegistrarExtravioActions.GetProcesso>(RegistrarExtravioActions.GET_PROCESSO),
        switchMap((action) => {
            const populate = JSON.stringify([
                'classificacao',
                'modalidadeFase',
                'classificacao.modalidadeDestinacao'
            ]);
            return this._processoService.get(action.payload.id, populate);
        }),
        mergeMap(response => [
            new RegistrarExtravioActions.GetProcessoSuccess(response)
        ]),
        catchError((err) => {
            console.log(err);
            return of(new RegistrarExtravioActions.GetProcessoFailed(err));
        })
    ));
    /**
     * Get Processo Success
     */
    getProcessoSuccess: any = createEffect(() => this._actions.pipe(
        ofType<RegistrarExtravioActions.GetProcessoSuccess>(RegistrarExtravioActions.GET_PROCESSO_SUCCESS),
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
