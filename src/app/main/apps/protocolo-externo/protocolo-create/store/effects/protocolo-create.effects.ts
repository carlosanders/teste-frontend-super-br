import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, tap} from 'rxjs/operators';

import * as ProtocoloCreateActions from '../actions/protocolo-create.actions';

import {ProcessoService} from '@cdk/services/processo.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {processo as processoSchema} from '@cdk/normalizr/processo.schema';
import {Processo} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class ProtocoloCreateEffects {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _processoService: ProcessoService,
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
     * Save Processo
     * @type {Observable<any>}
     */
    @Effect()
    saveProcesso: any =
        this._actions
            .pipe(
                ofType<ProtocoloCreateActions.SaveProcesso>(ProtocoloCreateActions.SAVE_PROCESSO),
                mergeMap((action) => {
                    return this._processoService.save(action.payload).pipe(
                        mergeMap((response: Processo) => [
                            new ProtocoloCreateActions.SaveProcessoSuccess(),
                            new AddData<Processo>({data: [response], schema: processoSchema}),
                            new OperacoesActions.Resultado({
                                type: 'processo',
                                content: `Processo id ${response.id} criada com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log (err);
                            return of(new ProtocoloCreateActions.SaveProcessoFailed(err));
                        })
                    );
                })
            );

    /**
     * Save Processo Success
     */
    @Effect({ dispatch: false })
    saveProcessoSuccess: any =
        this._actions
            .pipe(
                ofType<ProtocoloCreateActions.SaveProcessoSuccess>(ProtocoloCreateActions.SAVE_PROCESSO_SUCCESS),
                tap(() => {
                    if (this.routerState.params.processoHandle) {
                        this._router.navigate([this.routerState.url.replace('/criar/' + this.routerState.params.processoHandle, '')]).then();
                    } else {
                        this._router.navigate([this.routerState.url.replace('/criar', '')]).then();
                    }
                })
            );
}
