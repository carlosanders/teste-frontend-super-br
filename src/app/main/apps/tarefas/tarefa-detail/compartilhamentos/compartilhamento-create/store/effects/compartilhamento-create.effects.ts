import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as CompartilhamentoCreateActions from '../actions/compartilhamento-create.actions';

import {CompartilhamentoService} from '@cdk/services/compartilhamento.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {
    compartilhamento as compartilhamentoSchema,
    lotacao as lotacaoSchema
} from '@cdk/normalizr';
import {Compartilhamento, Lotacao} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {LotacaoService} from "../../../../../../../../../@cdk/services/lotacao.service";
import {LoginService} from "../../../../../../../auth/login/login.service";
import {CdkUtils} from "../../../../../../../../../@cdk/utils";


@Injectable()
export class CompartilhamentoCreateEffect {
    routerState: any;
    /**
     * Save Compartilhamento
     *
     * @type {Observable<any>}
     */
    saveCompartilhamento: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<CompartilhamentoCreateActions.SaveCompartilhamento>(CompartilhamentoCreateActions.SAVE_COMPARTILHAMENTO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'compartilhamento',
            content: 'Salvando o compartilhamento ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._compartilhamentoService.save(action.payload.compartilhamento).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'compartilhamento',
                content: 'Compartilhamento id ' + response.id + ' salvo com sucesso.',
                status: 1, // sucesso
            }))),
            mergeMap((response: Compartilhamento) => [
                new CompartilhamentoCreateActions.SaveCompartilhamentoSuccess(),
                new AddData<Compartilhamento>({data: [response], schema: compartilhamentoSchema}),
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'compartilhamento',
                    content: 'Erro ao salvar o compartilhamento!',
                    status: 2, // erro
                }));
                return of(new CompartilhamentoCreateActions.SaveCompartilhamentoFailed(err));
            })
        ))
    ));
    /**
     * Save Compartilhamento Success
     */
    saveCompartilhamentoSuccess: any = createEffect(() => this._actions.pipe(
        ofType<CompartilhamentoCreateActions.SaveCompartilhamentoSuccess>(CompartilhamentoCreateActions.SAVE_COMPARTILHAMENTO_SUCCESS),
        tap(() => {
            this._router.navigate([
                this.routerState.url.replace('/criar', '/listar')
            ]).then();
        })
    ), {dispatch: false});

    /**
     * Save Compartilhamento
     *
     * @type {Observable<any>}
     */
    saveCompartilhamentoSetor: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<CompartilhamentoCreateActions.SaveCompartilhamentoSetor>(CompartilhamentoCreateActions.SAVE_COMPARTILHAMENTO_SETOR),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'compartilhamento',
            content: 'Salvando o compartilhamento ...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._compartilhamentoService.save(action.payload.compartilhamento).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'compartilhamento',
                content: 'Compartilhamento id ' + response.id + ' salvo com sucesso.',
                status: 1, // sucesso
                lote: action.payload.loteId
            }))),
            mergeMap((response: Compartilhamento) => [
                new CompartilhamentoCreateActions.SaveCompartilhamentoSuccess(),
                new AddData<Compartilhamento>({data: [response], schema: compartilhamentoSchema}),
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'compartilhamento',
                    content: 'Erro ao salvar o compartilhamento!',
                    status: 2, // erro
                }));
                return of(new CompartilhamentoCreateActions.SaveCompartilhamentoFailed(err));
            })
        ))
    ));

    /**
     * Get Lotacoes with router parameters
     *
     * @type {Observable<any>}
     */
    getLotacoes: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<CompartilhamentoCreateActions.GetLotacoesCompartilhamento>(CompartilhamentoCreateActions.GET_LOTACOES_COMPARTILHAMENTO),
        switchMap(action => this._lotacaoService.query(
            JSON.stringify(action.payload.params.filter),
            action.payload.params.limit,
            0,
            JSON.stringify({}),
            JSON.stringify([
                'populateAll',
                'colaborador.usuario',
                'setor.unidade',
                'setor.especieSetor',
                'setor.generoSetor',
            ])).pipe(
            mergeMap(response => [
                new CompartilhamentoCreateActions.GetLotacoesCompartilhamentoSuccess({
                    response: response,
                    compartilhamento: action.payload.compartilhamento,
                    operacaoId: action.payload.operacaoId
                }),
                new AddData<Lotacao>({data: response['entities'], schema: lotacaoSchema}),
            ]),
            catchError((err) => {
                console.log(err);
                return of(new CompartilhamentoCreateActions.GetLotacoesCompartilhamentoFailed(err));
            })
        ))
    ));

    /**
     * Get Lotacoes Success
     */
    getLotacoesCompartilhamentoSuccess: any = createEffect(() => this._actions.pipe(
        ofType<CompartilhamentoCreateActions.GetLotacoesCompartilhamentoSuccess>(CompartilhamentoCreateActions.GET_LOTACOES_COMPARTILHAMENTO_SUCCESS),
        tap((action) => {
            action.payload.response.entities.forEach(
                lotacao => {
                    const operacaoIdSetor = CdkUtils.makeId();
                    const compartilhamento = new Compartilhamento();
                    Object.entries(action.payload.compartilhamento).forEach(
                        ([key, value]) => {
                            compartilhamento[key] = value;
                        }
                    );
                    compartilhamento['usuario'] = lotacao.colaborador.usuario;
                    this._store.dispatch(new CompartilhamentoCreateActions.SaveCompartilhamentoSetor({
                        compartilhamento: compartilhamento,
                        operacaoId: operacaoIdSetor
                    }));
                });
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _compartilhamentoService: CompartilhamentoService,
        private _store: Store<State>,
        private _lotacaoService: LotacaoService,
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
