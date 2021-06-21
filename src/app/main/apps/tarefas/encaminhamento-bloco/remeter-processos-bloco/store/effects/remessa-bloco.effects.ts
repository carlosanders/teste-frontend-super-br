import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as RemessaBlocoActions from '../actions/remessa-bloco.actions';

import {TramitacaoService} from '@cdk/services/tramitacao.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {tramitacao as tramitacaoSchema} from '@cdk/normalizr';
import {Tramitacao} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {CdkUtils} from "../../../../../../../../@cdk/utils";
import * as moment from "moment";

@Injectable()
export class RemessaBlocoEffects {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _tramitacaoService: TramitacaoService,
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
     * Save Tramitacao
     *
     * @type {Observable<any>}
     */
    @Effect()
    saveTramitacao: any =
        this._actions
            .pipe(
                ofType<RemessaBlocoActions.SaveTramitacao>(RemessaBlocoActions.SAVE_TRAMITACAO),
                mergeMap(action => this._tramitacaoService.save(action.payload).pipe(
                        mergeMap((response: Tramitacao) => [
                            new RemessaBlocoActions.SaveTramitacaoSuccess(action.payload),
                            new AddData<Tramitacao>({data: [response], schema: tramitacaoSchema}),
                            new OperacoesActions.Resultado({
                                type: 'remessa',
                                content: `Remessa no processo ${action.payload.processo.NUPFormatado} criada com sucesso!`,
                                success: true,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log (err);
                            const payload = {
                                id: action.payload.processo.id,
                                errors: err
                            };
                            const erroString = CdkUtils.errorsToString(err);
                            this._store.dispatch(new OperacoesActions.Resultado({
                                type: 'remessa',
                                content: `Houve erro ao criar remessa no processo ${action.payload.processo.NUPFormatado}! ${erroString}`,
                                success: false,
                                dateTime: moment()
                            }));
                            return of(new RemessaBlocoActions.SaveTramitacaoFailed(payload));
                        })
                    ))
            );
}
