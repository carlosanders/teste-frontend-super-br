import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, tap, switchMap} from 'rxjs/operators';

import * as RelacionamentoEditActions from '../actions/relacionamento-edit.actions';
import * as RelacionamentoListActions from '../../../relacionamento-list/store/actions/relacionamento-list.actions';

import {RelacionamentoPessoalService} from '@cdk/services/relacionamento-pessoal.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {relacionamentoPessoal as relacionamentoSchema} from '@cdk/normalizr/relacionamento-pessoal.schema';
import {RelacionamentoPessoal} from '@cdk/models/relacionamento-pessoal.model';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class RelacionamentoEditEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _relacionamentoPessoalService: RelacionamentoPessoalService,
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
     * Get Relacionamento with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getRelacionamento: any =
        this._actions
            .pipe(
                ofType<RelacionamentoEditActions.GetRelacionamento>(RelacionamentoEditActions.GET_RELACIONAMENTO),
                switchMap((action) => {
                    return this._relacionamentoPessoalService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll'
                        ]));
                }),
                switchMap(response => [
                    new AddData<RelacionamentoPessoal>({data: response['entities'], schema: relacionamentoSchema}),
                    new RelacionamentoEditActions.GetRelacionamentoSuccess({
                        loaded: {
                            id: 'relacionamentoHandle',
                            value: this.routerState.params.relacionamentoHandle
                        },
                        relacionamentoId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new RelacionamentoEditActions.GetRelacionamentoFailed(err));
                    return caught;
                })
            );

    /**
     * Save Relacionamento
     * @type {Observable<any>}
     */
    @Effect()
    saveRelacionamento: any =
        this._actions
            .pipe(
                ofType<RelacionamentoEditActions.SaveRelacionamento>(RelacionamentoEditActions.SAVE_RELACIONAMENTO),
                switchMap((action) => {
                    return this._relacionamentoPessoalService.save(action.payload).pipe(
                        mergeMap((response: RelacionamentoPessoal) => [
                            new RelacionamentoEditActions.SaveRelacionamentoSuccess(),
                            new RelacionamentoListActions.ReloadRelacionamentos(),
                            new AddData<RelacionamentoPessoal>({data: [response], schema: relacionamentoSchema}),
                            new OperacoesActions.Resultado({
                                type: 'relacionamento',
                                content: `Relacionamento id ${response.id} criada com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log (err);
                            return of(new RelacionamentoEditActions.SaveRelacionamentoFailed(err));
                        })
                    );
                })
            );
    /**
     * Save Relacionamento Success
     */
    @Effect({dispatch: false})
    saveRelacionamentoSuccess: any =
        this._actions
            .pipe(
                ofType<RelacionamentoEditActions.SaveRelacionamentoSuccess>(RelacionamentoEditActions.SAVE_RELACIONAMENTO_SUCCESS),
                tap(() => {
                    this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.relacionamentoHandle), 'listar')]).then();
                })
            );
}