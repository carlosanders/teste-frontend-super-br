import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable} from 'rxjs';
import {catchError, mergeMap, tap, switchMap} from 'rxjs/operators';

import * as CompartilhamentoCreateActions from '../actions/compartilhamento-create.actions';

import {CompartilhamentoService} from '@cdk/services/compartilhamento.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {compartilhamento as compartilhamentoSchema} from '@cdk/normalizr/compartilhamento.schema';
import {Compartilhamento} from '@cdk/models/compartilhamento.model';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';

@Injectable()
export class CompartilhamentoCreateEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _compartilhamentoService: CompartilhamentoService,
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
     * Save Compartilhamento
     * @type {Observable<any>}
     */
    @Effect()
    saveCompartilhamento: any =
        this._actions
            .pipe(
                ofType<CompartilhamentoCreateActions.SaveCompartilhamento>(CompartilhamentoCreateActions.SAVE_COMPARTILHAMENTO),
                switchMap((action) => {
                    return this._compartilhamentoService.save(action.payload).pipe(
                        mergeMap((response: Compartilhamento) => [
                            new CompartilhamentoCreateActions.SaveCompartilhamentoSuccess(),
                            new AddData<Compartilhamento>({data: [response], schema: compartilhamentoSchema})
                        ])
                    );
                }),
                catchError((err, caught) => {
                    console.log (err);
                    this._store.dispatch(new CompartilhamentoCreateActions.SaveCompartilhamentoFailed(err));
                    return caught;
                })
            );

    /**
     * Save Compartilhamento Success
     */
    @Effect({ dispatch: false })
    saveCompartilhamentoSuccess: any =
        this._actions
            .pipe(
                ofType<CompartilhamentoCreateActions.SaveCompartilhamentoSuccess>(CompartilhamentoCreateActions.SAVE_COMPARTILHAMENTO_SUCCESS),
                tap(() => {
                    this._router.navigate(['apps/tarefas/entrada']).then();
                })
            );

}
