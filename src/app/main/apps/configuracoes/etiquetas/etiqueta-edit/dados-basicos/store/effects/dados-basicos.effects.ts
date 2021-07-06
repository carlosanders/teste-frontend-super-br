import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as EtiquetaEditActions from '../actions/dados-basicos.actions';
import * as EtiquetaListActions from '../../../../etiqueta-list/store/actions/etiqueta-list.actions';

import {EtiquetaService} from '@cdk/services/etiqueta.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {etiqueta as etiquetaSchema} from '@cdk/normalizr';
import {Etiqueta} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class EtiquetaDadosBasicosEffects {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _etiquetaService: EtiquetaService,
        private _store: Store<State>,
        public _loginService: LoginService,
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
     * Save Etiqueta
     *
     * @type {Observable<any>}
     */
    @Effect()
    saveEtiqueta: any =
        this._actions
            .pipe(
                ofType<EtiquetaEditActions.SaveEtiqueta>(EtiquetaEditActions.SAVE_ETIQUETA),
                tap(() => {
                    this._store.dispatch(new OperacoesActions.Operacao({
                        type: 'etiqueta',
                        content: 'Salvando a etiqueta ...',
                        status: 0, // carregando
                    }));
                }),
                switchMap(action => this._etiquetaService.save(action.payload).pipe(
                    tap(() =>
                        this._store.dispatch(new OperacoesActions.Operacao({
                            type: 'etiqueta',
                            content: 'Etiqueta salva com sucesso.',
                            status: 1, // sucesso
                        }))),
                    mergeMap((response: Etiqueta) => [
                        new EtiquetaEditActions.SaveEtiquetaSuccess(),
                        new EtiquetaListActions.ReloadEtiquetas(),
                        new AddData<Etiqueta>({data: [response], schema: etiquetaSchema})
                    ])
                )),
                catchError((err) => {
                    console.log(err);
                    this._store.dispatch(new OperacoesActions.Operacao({
                        type: 'etiqueta',
                        content: 'Erro ao salvar a etiqueta!',
                        status: 2, // erro
                    }));
                    return of(this._store.dispatch(new EtiquetaEditActions.SaveEtiquetaFailed(err)));
                })
            );

    /**
     * Save Etiqueta Success
     */
    @Effect({dispatch: false})
    saveEtiquetaSuccess: any =
        this._actions
            .pipe(
                ofType<EtiquetaEditActions.SaveEtiquetaSuccess>(EtiquetaEditActions.SAVE_ETIQUETA_SUCCESS),
                tap(() => {
                    this._router.navigate(['apps/configuracoes/etiquetas/listar/']).then();
                })
            );
}
