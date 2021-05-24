import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, tap, switchMap} from 'rxjs/operators';

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

    constructor(
        private _actions: Actions,
        private _sigiloService: SigiloService,
        private _store: Store<State>,
        private _router: Router
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe((routerState) => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    /**
     * Get Sigilo with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getSigilo: any =
        this._actions
            .pipe(
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
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new SigiloEditActions.GetSigiloFailed(err));
                    return caught;
                })
            );

    /**
     * Save Sigilo
     *
     * @type {Observable<any>}
     */
    @Effect()
    saveSigilo: any =
        this._actions
            .pipe(
                ofType<SigiloEditActions.SaveSigilo>(SigiloEditActions.SAVE_SIGILO),
                switchMap(action => this._sigiloService.save(action.payload).pipe(
                        mergeMap((response: Sigilo) => [
                            new SigiloEditActions.SaveSigiloSuccess(),
                            new SigiloListActions.ReloadSigilos(),
                            new AddData<Sigilo>({data: [response], schema: sigiloSchema}),
                            new OperacoesActions.Resultado({
                                type: 'sigilo',
                                content: `Sigilo id ${response.id} criada com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log (err);
                            return of(new SigiloEditActions.SaveSigiloFailed(err));
                        })
                    ))
            );

    /**
     * Save Sigilo Success
     */
    @Effect({dispatch: false})
    saveSigiloSuccess: any =
        this._actions
            .pipe(
                ofType<SigiloEditActions.SaveSigiloSuccess>(SigiloEditActions.SAVE_SIGILO_SUCCESS),
                tap(() => {
                    this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.sigiloHandle), 'listar')]).then();
                })
            );
}
