import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, tap, switchMap} from 'rxjs/operators';

import * as RegraEditActions from '../actions/regra-edit.actions';
import * as RegraListActions from '../../../regra-list/store/actions/regra-list.actions';

import {AddData} from '@cdk/ngrx-normalizr';
import {regra as regraSchema} from '@cdk/normalizr';
import {Regra} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import * as moment from 'moment';
import {RegraService} from '@cdk/services/regra.service';

@Injectable()
export class RegraEditEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _regraService: RegraService,
        private _store: Store<State>,
        private _router: Router
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    /**
     * Save Regra
     * @type {Observable<any>}
     */
    @Effect()
    saveRegra: any =
        this._actions
            .pipe(
                ofType<RegraEditActions.SaveRegra>(RegraEditActions.SAVE_REGRA),
                switchMap((action) => {
                    return this._regraService.save(action.payload).pipe(
                        mergeMap((response: Regra) => [
                            new RegraEditActions.SaveRegraSuccess(),
                            new RegraListActions.ReloadRegras(),
                            new AddData<Regra>({data: [response], schema: regraSchema}),
                            new OperacoesActions.Resultado({
                                type: 'regra',
                                content: `Regra id ${response.id} criada com sucesso!`,
                                dateTime: moment()
                            })
                        ]),
                        catchError((err) => {
                            console.log (err);
                            return of(new RegraEditActions.SaveRegraFailed(err));
                        })
                    );
                })
            );
    /**
     * Save Regra Success
     */
    @Effect({dispatch: false})
    saveRegraSuccess: any =
        this._actions
            .pipe(
                ofType<RegraEditActions.SaveRegraSuccess>(RegraEditActions.SAVE_REGRA_SUCCESS),
                tap(() => {
                    this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.regraHandle), 'listar')]).then();
                })
            );
}
