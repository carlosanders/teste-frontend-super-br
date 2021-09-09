import {Actions, createEffect, ofType} from '@ngrx/effects';
import {select, Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import * as moment from 'moment';
import {Injectable} from '@angular/core';
import {AddData} from '@cdk/ngrx-normalizr';

import {Lembrete} from '@cdk/models';
import {lembrete as lembreteSchema} from '@cdk/normalizr';
import {LoginService} from '../../../../../auth/login/login.service';
import {LembreteService} from '@cdk/services/lembrete.service';

import {getRouterState, State} from '../../../../../../store';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import * as LembreteActions from '../actions/lembrete.actions';
import {GetProcessos} from '../../../arquivista-list/store';

@Injectable()
export class LembreteEffects {
    routerState: any;
    setorAtual: number;
    /**
     * Get Lembrete with router parameters
     *
     * @type {Observable<any>}
     */
    getLembrete: any = createEffect(() => this._actions.pipe(
        ofType<LembreteActions.GetLembrete>(LembreteActions.GET_LEMBRETE),
        switchMap(action => this._lembreteService.query(
            JSON.stringify({
                ...action.payload.filter,
                ...action.payload.listFilter,
                ...action.payload.etiquetaFilter,
                ...action.payload.gridFilter,
            }),
            action.payload.limit,
            action.payload.offset,
            JSON.stringify(action.payload.sort),
            JSON.stringify(action.payload.populate))),
        switchMap(response => [
            new AddData<Lembrete>({data: response['entities'], schema: lembreteSchema}),
            new LembreteActions.GetLembreteSuccess({
                loaded: {
                    id: 'processoHandle',
                    value: this.routerState.params.processoHandle
                },
                total: response['total']
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new LembreteActions.GetLembreteFailed(err));
        })
    ));
    /**
     * Save Lembrete
     *
     * @type {Observable<any>}
     */
    saveLembrete: any = createEffect(() => this._actions.pipe(
        ofType<LembreteActions.SaveLembrete>(LembreteActions.SAVE_LEMBRETE),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'lembrete',
            content: 'Salvando o lembrete ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._lembreteService.save(action.payload.lembrete).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'lembrete',
                content: 'Lembrete id ' + response.id + ' salvo com sucesso.',
                status: 1, // sucesso
            }))),
            mergeMap((response: Lembrete) => [
                new LembreteActions.SaveLembreteSuccess(),
                new AddData<Lembrete>({data: [response], schema: lembreteSchema})
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'lembrete',
                    content: 'Erro ao salvar o lembrete!',
                    status: 2, // erro
                }));
                return of(new LembreteActions.SaveLembreteFailed(err));
            })
        ))
    ));
    /**
     * Save Lembrete Success
     */
    saveLembreteSuccess: any = createEffect(() => this._actions.pipe(
        ofType<LembreteActions.SaveLembreteSuccess>(LembreteActions.SAVE_LEMBRETE_SUCCESS),
        tap(() => {

            const params = {
                listFilter: {},
                etiquetaFilter: {},
                limit: 10,
                offset: 0,
                sort: {dataHoraProximaTransicao: 'ASC', dataHoraAbertura: 'ASC'},
                populate: [
                    'especieProcesso',
                    'especieProcesso.generoProcesso',
                    'modalidadeMeio',
                    'modalidadeFase',
                    'documentoAvulsoOrigem',
                    'especieProcesso',
                    'especieProcesso.generoProcesso',
                    'classificacao',
                    'classificacao.modalidadeDestinacao',
                    'setorInicial',
                    'setorAtual',
                    'lembretes',
                    'vinculacoesEtiquetas',
                    'vinculacoesEtiquetas.etiqueta'
                ]
            };

            const routeTypeParam = of('typeHandle');
            routeTypeParam.subscribe((typeParam) => {
                let processoFilter = {};

                this.currentDate = moment().format('YYYY-MM-DD[T]H:mm:ss');

                if (this.routerState.params[typeParam] === 'pronto-transicao') {
                    processoFilter = {
                        'dataHoraProximaTransicao': 'lt:' + this.currentDate,
                        'modalidadeFase.valor': 'in:CORRENTE,INTERMEDIÁRIA',
                        'setorAtual.id': 'eq:' + this.setorAtual

                    };
                }

                if (this.routerState.params[typeParam] === 'aguardando-decurso') {
                    processoFilter = {
                        'dataHoraProximaTransicao': 'gte:' + this.currentDate,
                        'modalidadeFase.valor': 'in:CORRENTE,INTERMEDIÁRIA',
                        'setorAtual.id': 'eq:' + this.setorAtual
                    };
                }

                if (this.routerState.params[typeParam] === 'pendencia-analise') {
                    processoFilter = {
                        'dataHoraProximaTransicao': 'isNull',
                        'modalidadeFase.valor': 'in:CORRENTE,INTERMEDIÁRIA',
                        'setorAtual.id': 'eq:' + this.setorAtual
                    };

                }

                params['filter'] = processoFilter;
            });

            this._store.dispatch(new GetProcessos(params));
            this._router.navigate(['apps/arquivista/' + this.routerState.params.unidadeHandle + '/' +
            this.routerState.params.typeHandle + '/detalhe/processo/' + this.routerState.params.processoHandle + '/visualizar']).then();
        })
    ), {dispatch: false});

    private currentDate: any;
    /**
     *
     * @param _actions
     * @param _lembreteService
     * @param _store
     * @param _loginService
     * @param _router
     */
    constructor(
        private _actions: Actions,
        private _lembreteService: LembreteService,
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
        this.setorAtual = this._loginService.getUserProfile().colaborador.lotacoes[0].setor.id;
    }
}
