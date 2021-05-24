import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, tap, switchMap} from 'rxjs/operators';

import * as RegraEtiquetaEditActions from '../actions/regra-etiqueta-edit.actions';
import * as RegraEtiquetaListActions from '../../../regra-etiqueta-list/store/actions/regra-etiqueta-list.actions';

import {AddData} from '@cdk/ngrx-normalizr';
import {regraEtiqueta as regraEtiquetaSchema} from '@cdk/normalizr';
import {RegraEtiqueta} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import * as moment from 'moment';
import {RegraEtiquetaService} from '@cdk/services/regra-etiqueta.service';

@Injectable()
export class RegraEtiquetaEditEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _regraEtiquetaService: RegraEtiquetaService,
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
     * Save RegraEtiqueta
     *
     * @type {Observable<any>}
     */
    @Effect()
    saveRegra: any =
        this._actions
            .pipe(
                ofType<RegraEtiquetaEditActions.SaveRegraEtiqueta>(RegraEtiquetaEditActions.SAVE_REGRA_ETIQUETA),
                switchMap(action => this._regraEtiquetaService.save(action.payload).pipe(
                        mergeMap((response: RegraEtiqueta) => [
                            new RegraEtiquetaEditActions.SaveRegraEtiquetaSuccess(),
                            new RegraEtiquetaListActions.ReloadRegrasEtiqueta(),
                            new AddData<RegraEtiqueta>({data: [response], schema: regraEtiquetaSchema}),
                            new OperacoesActions.Resultado({
                                type: 'regraEtiqueta',
                                content: `Regra id ${response.id} criada com sucesso!`,
                                dateTime: moment()
                            })
                        ]),
                        catchError((err) => {
                            console.log (err);
                            return of(new RegraEtiquetaEditActions.SaveRegraEtiquetaFailed(err));
                        })
                    ))
            );
    /**
     * Save RegraEtiqueta Success
     */
    @Effect({dispatch: false})
    saveRegraEtiquetaSuccess: any =
        this._actions
            .pipe(
                ofType<RegraEtiquetaEditActions.SaveRegraEtiquetaSuccess>(RegraEtiquetaEditActions.SAVE_REGRA_ETIQUETA_SUCCESS),
                tap(() => {
                    this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.regraEtiquetaHandle), 'listar')]).then();
                })
            );
}
