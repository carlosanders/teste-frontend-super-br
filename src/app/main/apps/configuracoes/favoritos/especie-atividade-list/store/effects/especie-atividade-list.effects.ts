import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as EspecieAtividadeListActions from '../actions';

import {EspecieAtividadeService} from '@cdk/services/especie-atividade.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {EspecieAtividade} from '@cdk/models/especie-atividade.model';
import {especieAtividade as especieAtividadeSchema} from '@cdk/normalizr/especie-atividade.schema';
import {LoginService} from 'app/main/auth/login/login.service';
import * as OperacoesActions from '../../../../../../../store/actions/operacoes.actions';
import {Router} from '@angular/router';

@Injectable()
export class EspecieAtividadeListEffect {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _especieAtividadeService: EspecieAtividadeService,
        private _loginService: LoginService,
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
     * Get EspeciesAtividades with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getEspeciesAtividades: any =
        this._actions
            .pipe(
                ofType<EspecieAtividadeListActions.GetEspeciesAtividades>(EspecieAtividadeListActions.GET_ESPECIES_ATIVIDADES),
                switchMap((action) => {
                    return this._especieAtividadeService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.gridFilter,
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate));
                }),
                mergeMap((response) => [
                    new AddData<EspecieAtividade>({data: response['entities'], schema: especieAtividadeSchema}),
                    new EspecieAtividadeListActions.GetEspeciesAtividadesSuccess({
                        entitiesId: response['entities'].map(especieAtividade => especieAtividade.id),
                        loaded: {
                            id: 'usuarioHandle',
                            value: this._loginService.getUserProfile().usuario.id
                        },
                        total: response['total']
                    })
                ]),
                catchError((err, caught) => {
                    console.log (err);
                    this._store.dispatch(new EspecieAtividadeListActions.GetEspeciesAtividadesFailed(err));
                    return caught;
                })

            );

    /**
     * Delete EspecieAtividade
     * @type {Observable<any>}
     */
    @Effect()
    deleteEspecieAtividade: any =
        this._actions
            .pipe(
                ofType<EspecieAtividadeListActions.DeleteEspecieAtividade>(EspecieAtividadeListActions.DELETE_ESPECIE_ATIVIDADE),
                mergeMap((action) => {
                    return this._especieAtividadeService.destroy(action.payload).pipe(
                        map((response) => new EspecieAtividadeListActions.DeleteEspecieAtividadeSuccess(response.id)),
                        catchError((err) => {
                            console.log(err);
                            return of(new EspecieAtividadeListActions.DeleteEspecieAtividadeFailed(action.payload));
                        })
                    );
                })
            );

    /**
     * Save Especie Atividade
     * @type {Observable<any>}
     */
    @Effect()
    saveEspecieAtividade: any =
        this._actions
            .pipe(
                ofType<EspecieAtividadeListActions.SaveEspecieAtividade>(EspecieAtividadeListActions.SAVE_ESPECIE_ATIVIDADE),
                switchMap((action) => {
                    return this._especieAtividadeService.save(action.payload).pipe(
                        mergeMap((response: EspecieAtividade) => [
                            new EspecieAtividadeListActions.SaveEspecieAtividade(response),
                            new AddData<EspecieAtividade>({data: [response], schema: especieAtividadeSchema}),
                            new OperacoesActions.Resultado({
                                type: 'especieAtividade',
                                content: `Espécie Atividade id ${response.id} salva com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log (err);
                            return of(new EspecieAtividadeListActions.SaveEspecieAtividadeFailed(err));
                        })
                    );
                })
            );


    /**
     * Save Especie Atividade Success
     */
    @Effect({ dispatch: false })
    saveEspecieAtividadeSuccess: any =
        this._actions
            .pipe(
                ofType<EspecieAtividadeListActions.SaveEspecieAtividadeSuccess>(EspecieAtividadeListActions.SAVE_ESPECIE_ATIVIDADE_SUCCESS),
                tap((action) => {
                    this._router.navigate([this.routerState.url.replace('favoritos', 'especieAtividade/listar').replace('criar', action.payload.id)]).then();
                })
            );
}
