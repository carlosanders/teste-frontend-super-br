import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {getRouterState, State} from '../../../../../../../store';
import * as AvisoListActions from '../actions';
import {LoginService} from '../../../../../../auth/login/login.service';
import {AvisoService} from '@cdk/services/aviso.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {Aviso} from '@cdk/models';
import {aviso as avisoSchema} from '@cdk/normalizr';
import * as OperacoesActions from '../../../../../../../store/actions/operacoes.actions';

@Injectable()
export class AvisoListEffects {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _avisoService: AvisoService,
        private _loginService: LoginService,
        private _store: Store<State>
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
     * Get Aviso with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getAviso: any =
        this._actions
            .pipe(
                ofType<AvisoListActions.GetAviso>(AvisoListActions.GET_AVISO),
                switchMap(action => this._avisoService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.gridFilter,
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate),
                        JSON.stringify(action.payload.context)).pipe(
                        mergeMap(response => [

                            new AddData<Aviso>({data: response['entities'], schema: avisoSchema}),
                            new AvisoListActions.GetAvisoSuccess({

                                entitiesId: response['entities'].map(aviso => aviso.id),
                                loaded: {
                                    id: 'avisoHandle',
                                    value: this.routerState.params.avisoHandle
                                },
                                total: response['total']
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new AvisoListActions.GetAvisoFailed(err));
                        })
                    ))
            );

    /**
     * Delete Aviso
     *
     * @type {Observable<any>}
     */
    @Effect()
    deleteAviso: Observable<AvisoListActions.AvisoListActionsAll> =
        this._actions
            .pipe(
                ofType<AvisoListActions.DeleteAviso>(AvisoListActions.DELETE_AVISO),
                tap((action) => {
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'aviso',
                        content: 'Apagando a aviso id ' + action.payload.avisoId + '...',
                        status: 0, // carregando
                        lote: action.payload.loteId
                    }));
                }),
                mergeMap((action) => {
                    return this._avisoService.destroy(action.payload.avisoId).pipe(
                        map((response) => {
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'aviso',
                                content: 'Aviso id ' + action.payload.avisoId + ' deletada com sucesso.',
                                status: 1, // sucesso
                                lote: action.payload.loteId
                            }));
                            new UpdateData<Aviso>({
                                id: response.id,
                                schema: avisoSchema,
                                changes: {apagadoEm: response.apagadoEm}
                            });
                            return new AvisoListActions.DeleteAvisoSuccess(response.id);
                        }),
                        catchError((err) => {
                            const payload = {
                                id: action.payload.avisoId,
                                error: err
                            };
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'aviso',
                                content: 'Erro ao apagar a aviso id ' + action.payload.avisoId + '!',
                                status: 2, // erro
                                lote: action.payload.loteId
                            }));
                            console.log(err);
                            return of(new AvisoListActions.DeleteAvisoFailed(payload));
                        })
                    );
                }, 25)
            );
}
