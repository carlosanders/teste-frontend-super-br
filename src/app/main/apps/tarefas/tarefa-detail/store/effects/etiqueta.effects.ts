import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as EtiquetaActions from '../actions/etiqueta.actions';

import {EtiquetaService} from '@cdk/services/etiqueta.service';
import {LoginService} from 'app/main/auth/login/login.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Acao, Etiqueta, Tarefa} from '@cdk/models';
import {etiqueta as etiquetaSchema, acao as acaoSchema} from '@cdk/normalizr';
import {Router} from '@angular/router';
import * as TarefaDetailActions from '../actions/tarefa-detail.actions';
import {AcaoService} from '@cdk/services/acao.service';

@Injectable()
export class EtiquetaEffect {
    routerState: any;
    /**
     * Get Etiqueta with router parameters
     *
     * @type {Observable<any>}
     */
    getEtiqueta: any = createEffect(() => this._actions.pipe(
        ofType<EtiquetaActions.GetEtiqueta>(EtiquetaActions.GET_ETIQUETA),
        switchMap(action => this._etiquetaService.query(
            JSON.stringify(action.payload),
            1,
            0,
            JSON.stringify({}),
            JSON.stringify([
                'populateAll'
            ]))),
        switchMap(response => [
            new AddData<Etiqueta>({data: response['entities'], schema: etiquetaSchema}),
            new EtiquetaActions.GetEtiquetaSuccess({
                loaded: {
                    id: 'etiquetaHandle',
                    value: this.routerState.params.etiquetaHandle
                },
                etiquetaId: response['entities'][0].id
            })
        ]),
        catchError(err => of(new EtiquetaActions.GetEtiquetaFailed(err)))
    ));
    tarefa: Tarefa = null;
    /**
     * Save Etiqueta
     *
     * @type {Observable<any>}
     */
    saveEtiqueta: any = createEffect(() => this._actions.pipe(
        ofType<EtiquetaActions.SaveEtiqueta>(EtiquetaActions.SAVE_ETIQUETA),
        switchMap((action) => {
            const tarefa = action.payload.tarefa;
            return this._etiquetaService.save(action.payload.etiqueta).pipe(
                mergeMap((response: Etiqueta) => [
                    new AddData<Etiqueta>({data: [response], schema: etiquetaSchema}),
                    new TarefaDetailActions.CreateVinculacaoEtiqueta({
                        operacaoId: action.payload.operacaoId,
                        tarefa: tarefa,
                        etiqueta: response
                    })
                ]),
                catchError(err => of(new EtiquetaActions.SaveEtiquetaFailed(err)))
            );
        })
    ));
    /**
     * Save Etiqueta Success
     */
    saveEtiquetaSuccess: any = createEffect(() => this._actions.pipe(
        ofType<EtiquetaActions.SaveEtiquetaSuccess>(EtiquetaActions.SAVE_ETIQUETA_SUCCESS),
        tap(() => {
            this._router.navigate(['apps/configuracoes/etiquetas/listar/']).then();
        })
    ), {dispatch: false});

    getAcoesEtiqueta: any = createEffect(() => this._actions.pipe(
        ofType<EtiquetaActions.GetAcoesEtiqueta>(EtiquetaActions.GET_ACOES_ETIQUETA),
        switchMap(action => this._acaoService.query(
            JSON.stringify({'etiqueta.id': `eq:${action.payload}`}),
            1000,
            0,
            JSON.stringify({}),
            JSON.stringify([
                'populateAll'
            ])).pipe(
                mergeMap(response => [
                    new AddData<Acao>({data: response['entities'], schema: acaoSchema}),
                    new EtiquetaActions.GetAcoesEtiquetaSuccess(
                        response['entities'].map((acao) => acao.id)
                    )
                ]),
                catchError(err => of(new EtiquetaActions.GetAcoesEtiquetaFailed(err)))
            ))
    ));

    private _profile: any;
    constructor(
        private _actions: Actions,
        private _etiquetaService: EtiquetaService,
        private _acaoService: AcaoService,
        public _loginService: LoginService,
        private _store: Store<State>,
        private _router: Router
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });

        this._profile = _loginService.getUserProfile();
    }
}
