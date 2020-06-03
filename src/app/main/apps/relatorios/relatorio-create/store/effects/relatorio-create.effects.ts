import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, tap, switchMap} from 'rxjs/operators';

import * as RelatorioCreateActions from '../actions/relatorio-create.actions';

import {RelatorioService} from '@cdk/services/relatorio.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {relatorio as relatorioSchema} from '@cdk/normalizr/relatorio.schema';
import {Relatorio} from '@cdk/models/relatorio.model';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import * as fromStoreRelatorio from '../../../store';
import {Usuario} from '../../../../../../../@cdk/models';
import {LoginService} from '../../../../../auth/login/login.service';

@Injectable()
export class RelatorioCreateEffect {
    routerState: any;
    private _profile: Usuario;

    constructor(
        private _actions: Actions,
        private _relatorioService: RelatorioService,
        private _store: Store<State>,
        private _router: Router,
        public _loginService: LoginService,
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });

        this._profile = _loginService.getUserProfile();
    }

    /**
     * Save Relatorio
     * @type {Observable<any>}
     */
    @Effect()
    saveRelatorio: any =
        this._actions
            .pipe(
                ofType<RelatorioCreateActions.SaveRelatorio>(RelatorioCreateActions.SAVE_RELATORIO),
                switchMap((action) => {
                    const context = JSON.stringify({formato: action.payload.formato});
                    return this._relatorioService.save(action.payload, context).pipe(
                        mergeMap((response: Relatorio) => [
                            new RelatorioCreateActions.SaveRelatorioSuccess(),
                            new fromStoreRelatorio.UnloadRelatorios({reset: true}),
                            new fromStoreRelatorio.GetRelatorios({
                                filter: {
                                    'criadoPor.id': 'eq:' + this._profile.id
                                },
                                etiquetaFilter: {},
                                limit: 10,
                                offset: 0,
                                sort: {criadoEm: 'DESC'},
                                populate: [
                                    'documento',
                                    'tipoRelatorio',
                                    'vinculacoesEtiquetas',
                                    'vinculacoesEtiquetas.etiqueta'
                                ]
                            }),
                            new AddData<Relatorio>({data: [response], schema: relatorioSchema}),
                            new OperacoesActions.Resultado({
                                type: 'relatorio',
                                content: `Relatorio id ${response.id} criada com sucesso!`
                            })
                        ]),
                        catchError((err) => {
                            console.log (err);
                            return of(new RelatorioCreateActions.SaveRelatorioFailed(err));
                        })
                    );
                })
            );

    /**
     * Save Relatorio Success
     */
    @Effect({ dispatch: false })
    saveRelatorioSuccess: any =
        this._actions
            .pipe(
                ofType<RelatorioCreateActions.SaveRelatorioSuccess>(RelatorioCreateActions.SAVE_RELATORIO_SUCCESS),
                tap(() => {
                    this._router.navigate([this.routerState.url.replace('/criar', '')]).then();
                })
            );
}
