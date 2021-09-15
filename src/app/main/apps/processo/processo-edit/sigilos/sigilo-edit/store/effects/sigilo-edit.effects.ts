import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as SigiloEditActions from '../actions/sigilo-edit.actions';
import * as SigiloListActions from '../../../sigilo-list/store/actions/sigilo-list.actions';

import {SigiloService} from '@cdk/services/sigilo.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {sigilo as sigiloSchema} from '@cdk/normalizr';
import {Sigilo} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class SigiloEditEffect {
    routerState: any;
    /**
     * Get Sigilo with router parameters
     *
     * @type {Observable<any>}
     */
    getSigilo: any = createEffect(() => this._actions.pipe(
        ofType<SigiloEditActions.GetSigilo>(SigiloEditActions.GET_SIGILO),
        switchMap(action => this._sigiloService.query(
            JSON.stringify(action.payload),
            1,
            0,
            JSON.stringify({}),
            JSON.stringify([
                'populateAll'
            ]))),
        switchMap(response => [
            new AddData<Sigilo>({data: response['entities'], schema: sigiloSchema}),
            new SigiloEditActions.GetSigiloSuccess({
                loaded: {
                    id: 'sigiloHandle',
                    value: this.routerState.params.sigiloHandle
                },
                sigiloId: response['entities'][0].id
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new SigiloEditActions.GetSigiloFailed(err));
        })
    ));
    /**
     * Save Sigilo
     *
     * @type {Observable<any>}
     */
    saveSigilo: any = createEffect(() => this._actions.pipe(
        ofType<SigiloEditActions.SaveSigilo>(SigiloEditActions.SAVE_SIGILO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'sigilo',
            content: 'Salvando o sigilo ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._sigiloService.save(action.payload.sigilo).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'sigilo',
                content: 'Sigilo id ' + response.id + ' salvo com sucesso.',
                status: 1, // sucesso
            }))),
            mergeMap((response: Sigilo) => [
                new SigiloEditActions.SaveSigiloSuccess(),
                new SigiloListActions.ReloadSigilos(),
                new AddData<Sigilo>({data: [response], schema: sigiloSchema})
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'sigilo',
                    content: 'Erro ao salvar o sigilo!',
                    status: 2, // erro
                }));
                return of(new SigiloEditActions.SaveSigiloFailed(err));
            })
        ))
    ));
    /**
     * Save Sigilo Success
     */
    saveSigiloSuccess: any = createEffect(() => this._actions.pipe(
        ofType<SigiloEditActions.SaveSigiloSuccess>(SigiloEditActions.SAVE_SIGILO_SUCCESS),
        tap(() => {
            this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.sigiloHandle), 'listar')]).then();
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _sigiloService: SigiloService,
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
