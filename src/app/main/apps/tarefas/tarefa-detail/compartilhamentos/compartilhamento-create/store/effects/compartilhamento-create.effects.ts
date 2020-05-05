import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, tap, switchMap} from 'rxjs/operators';

import * as CompartilhamentoCreateActions from '../actions/compartilhamento-create.actions';

import {CompartilhamentoService} from '@cdk/services/compartilhamento.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {compartilhamento as compartilhamentoSchema} from '@cdk/normalizr/compartilhamento.schema';
import {Compartilhamento} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

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
                            new AddData<Compartilhamento>({data: [response], schema: compartilhamentoSchema}),
                            new OperacoesActions.Resultado({
                                type: 'compartilhamento',
                                content: `Compartilhamento id ${response.id} criada com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log (err);
                            return of(new CompartilhamentoCreateActions.SaveCompartilhamentoFailed(err));
                        })
                    );
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
                    this._router.navigate([
                        'apps/tarefas/' + this.routerState.params.generoHandle + '/'
                        + this.routerState.params.typeHandle + '/'
                        + this.routerState.params.targetHandle
                    ]).then();
                })
            );

}
