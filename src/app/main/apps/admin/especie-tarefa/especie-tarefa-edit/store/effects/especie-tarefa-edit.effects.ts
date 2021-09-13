import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as EspecieTarefaEditActions from '../actions/especie-tarefa-edit.actions';
import * as EspecieTarefaListActions from '../../../especie-tarefa-list/store/actions/especie-tarefa-list.actions';

import {EspecieTarefaService} from '@cdk/services/especie-tarefa.service';
import {ColaboradorService} from '@cdk/services/colaborador.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {especieTarefa as especieTarefaSchema} from '@cdk/normalizr';
import {EspecieTarefa} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class EspecieTarefaEditEffects {
    routerState: any;
    /**
     * Get EspecieTarefa with router parameters
     *
     * @type {Observable<any>}
     */
    getEspecieTarefa: any = createEffect(() => this._actions.pipe(
        ofType<EspecieTarefaEditActions.GetEspecieTarefa>(EspecieTarefaEditActions.GET_ESPECIE_TAREFA),
        switchMap(action => this._especieTarefaService.query(
            JSON.stringify(action.payload),
            1,
            0,
            JSON.stringify({}),
            JSON.stringify([
                'populateAll'
            ]),
            JSON.stringify({isAdmin: true}))),
        switchMap(response => [
            new AddData<EspecieTarefa>({data: response['entities'], schema: especieTarefaSchema}),
            new EspecieTarefaEditActions.GetEspecieTarefaSuccess({
                loaded: {
                    id: 'especieTarefaHandle',
                    value: this.routerState.params.especieTarefaHandle
                },
                entityId: response['entities'][0].id
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new EspecieTarefaEditActions.GetEspecieTarefaFailed(err));
        })
    ));
    /**
     * Save EspecieTarefa
     *
     * @type {Observable<any>}
     */
    saveEspecieTarefa: any = createEffect(() => this._actions.pipe(
        ofType<EspecieTarefaEditActions.SaveEspecieTarefa>(EspecieTarefaEditActions.SAVE_ESPECIE_TAREFA),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'espécie tarefa',
            content: 'Salvando a espécie tarefa ...',
            status: 0, // carregando
        }))),
        switchMap((action) => {
            const context = JSON.stringify({isAdmin: true});
            return this._especieTarefaService.save(action.payload.especieTarefa, context).pipe(
                tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'espécie tarefa',
                    content: 'Espécie tarefa id ' + response.id + ' salva com sucesso.',
                    status: 1, // sucesso
                }))),
                mergeMap((response: EspecieTarefa) => [
                    new EspecieTarefaEditActions.SaveEspecieTarefaSuccess(response),
                    new EspecieTarefaListActions.ReloadEspecieTarefa(),
                    new AddData<EspecieTarefa>({data: [response], schema: especieTarefaSchema})
                ]),
                catchError((err) => {
                    console.log(err);
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'espécie tarefa',
                        content: 'Erro ao salvar a espécie tarefa!',
                        status: 2, // erro
                    }));
                    return of(new EspecieTarefaEditActions.SaveEspecieTarefaFailed(err));
                })
            );
        })
    ));
    /**
     * Update EspecieTarefa
     *
     * @type {Observable<any>}
     */
    updateEspecieTarefa: any = createEffect(() => this._actions.pipe(
        ofType<EspecieTarefaEditActions.UpdateEspecieTarefa>(EspecieTarefaEditActions.UPDATE_ESPECIE_TAREFA),
        switchMap(action => this._especieTarefaService.patch(action.payload.especieTarefa, action.payload.changes).pipe(
            mergeMap((response: EspecieTarefa) => [
                new EspecieTarefaListActions.ReloadEspecieTarefa(),
                new AddData<EspecieTarefa>({data: [response], schema: especieTarefaSchema}),
                new EspecieTarefaEditActions.UpdateEspecieTarefaSuccess(response)
            ])
        )),
        catchError((err) => {
            console.log(err);
            return of(new EspecieTarefaEditActions.UpdateEspecieTarefaFailed(err));
        })
    ));
    /**
     * Save EspecieTarefa Success
     */
    saveEspecieTarefaSuccess: any = createEffect(() => this._actions.pipe(
            ofType<EspecieTarefaEditActions.SaveEspecieTarefaSuccess>(EspecieTarefaEditActions.SAVE_ESPECIE_TAREFA_SUCCESS),
            tap(() => {
                this._router.navigate(['apps/admin/especie-tarefas/listar']).then();
            })
        ),
        {dispatch: false});

    constructor(
        private _actions: Actions,
        private _especieTarefaService: EspecieTarefaService,
        private _colaboradorService: ColaboradorService,
        private _store: Store<State>,
        private _loginService: LoginService,
        private _router: Router
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }


}
