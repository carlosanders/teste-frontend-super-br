import { AddData, UpdateData } from '@cdk/ngrx-normalizr';

import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import { catchError, map, concatMap, mergeMap, switchMap, tap } from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as ProcessosActions from '../actions/protocolos-externos.actions';

import {Processo} from '@cdk/models';
import {LoginService} from 'app/main/auth/login/login.service';
import {Router} from '@angular/router';
import {processo as processoSchema} from '@cdk/normalizr/processo.schema';
import {ProcessoService} from '@cdk/services/processo.service';

@Injectable()
export class TarefasEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _processoService: ProcessoService,
        public _loginService: LoginService,
        private _store: Store<State>,
        private _router: Router
    ) {
        this._store
            .pipe(
                select(getRouterState),
            ).subscribe(routerState => {
            if (routerState) {
                this.routerState = routerState.state;
            }
        });
    }

    /**
     * Get Tarefas with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getProcessos: Observable<any> =
        this._actions
            .pipe(
                ofType<ProcessosActions.GetProcessos>(ProcessosActions.GET_PROCESSOS),
                switchMap((action) => {
                    return this._processoService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.folderFilter,
                            ...action.payload.listFilter,
                            ...action.payload.etiquetaFilter
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate));
                }),
                mergeMap((response) => [
                    new AddData<Processo>({data: response['entities'], schema: processoSchema}),
                    new ProcessosActions.GetProcessosSuccess({
                        entitiesId: response['entities'].map(processo => processo.id),
                        loaded: {
                            id: 'generoHandle_typeHandle_targetHandle',
                            value: this.routerState.params.generoHandle + '_' +
                                this.routerState.params.typeHandle + '_' + this.routerState.params.targetHandle
                        },
                        total: response['total']
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new ProcessosActions.GetProcessosFailed(err));
                    return caught;
                })
            );

    /**
     * Update Tarefa
     * @type {Observable<any>}
     */
    // @Effect()
    // setCurrentTarefa: Observable<TarefasActions.TarefasActionsAll> =
    //     this._actions
    //         .pipe(
    //             ofType<TarefasActions.SetCurrentTarefa>(TarefasActions.SET_CURRENT_TAREFA),
    //             map((action) => {
    //                 if (action.payload.acessoNegado) {
    //                     this._router.navigate([
    //                         'apps/tarefas/' + this.routerState.params.generoHandle + '/'
    //                         + this.routerState.params.typeHandle + '/'
    //                         + this.routerState.params.targetHandle + '/tarefa/' + action.payload.tarefaId +
    //                         '/processo/' + action.payload.processoId + '/acesso-negado']
    //                     ).then();
    //                 } else {
    //                     this._router.navigate([
    //                         'apps/tarefas/' + this.routerState.params.generoHandle + '/' +
    //                         this.routerState.params.typeHandle + '/' +
    //                         this.routerState.params.targetHandle + '/tarefa/' + action.payload.tarefaId +
    //                         '/processo/' + action.payload.processoId + '/visualizar']
    //                     ).then();
    //                 }
    //
    //                 return new TarefasActions.SetCurrentTarefaSuccess();
    //             })
    //         );
    //
    // /**
    //  * Update Tarefa
    //  * @type {Observable<any>}
    //  */
    // @Effect()
    // createTarefa: Observable<TarefasActions.TarefasActionsAll> =
    //     this._actions
    //         .pipe(
    //             ofType<TarefasActions.CreateTarefa>(TarefasActions.CREATE_TAREFA),
    //             map(() => {
    //                 this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' +
    //                 this.routerState.params.typeHandle + '/' +
    //                 '/' + this.routerState.params.targetHandle + '/criar']).then();
    //                 return new TarefasActions.CreateTarefaSuccess();
    //             })
    //         );
    //
    // /**
    //  * Delete Tarefa
    //  * @type {Observable<any>}
    //  */
    // @Effect()
    // deleteTarefa: Observable<TarefasActions.TarefasActionsAll> =
    //     this._actions
    //         .pipe(
    //             ofType<TarefasActions.DeleteTarefa>(TarefasActions.DELETE_TAREFA),
    //             mergeMap((action) => {
    //                 return this._tarefaService.destroy(action.payload).pipe(
    //                     map((response) => new TarefasActions.DeleteTarefaSuccess(response.id)),
    //                     catchError((err) => {
    //                         console.log(err);
    //                         return of(new TarefasActions.DeleteTarefaFailed(action.payload));
    //                     })
    //                 );
    //             })
    //         );
    //
    // /**
    //  * Toggle Lida Tarefa
    //  * @type {Observable<any>}
    //  */
    // @Effect()
    // toggleLidaTarefa: any =
    //     this._actions
    //         .pipe(
    //             ofType<TarefasActions.ToggleLidaTarefa>(TarefasActions.TOGGLE_LIDA_TAREFA),
    //             mergeMap((action) => {
    //                 return this._tarefaService.toggleLida(action.payload).pipe(
    //                     mergeMap((response) => [
    //                         new TarefasActions.ToggleLidaTarefaSuccess(response.id),
    //                         new UpdateData<Tarefa>({id: response.id, schema: tarefaSchema, changes: {dataHoraLeitura: response.dataHoraLeitura}})
    //                     ]),
    //                     catchError((err) => {
    //                         console.log(err);
    //                         return of(new TarefasActions.ToggleLidaTarefaFailed(action.payload));
    //                     })
    //                 );
    //             })
    //         );
    //
    // /**
    //  * Toggle Urgente Tarefa
    //  * @type {Observable<any>}
    //  */
    // @Effect()
    // toggleUrgenteTarefa: any =
    //     this._actions
    //         .pipe(
    //             ofType<TarefasActions.ToggleUrgenteTarefa>(TarefasActions.TOGGLE_URGENTE_TAREFA),
    //             mergeMap((action) => {
    //                 return this._tarefaService.patch(action.payload, {
    //                     urgente: !action.payload.urgente
    //                 }).pipe(
    //                     mergeMap((response) => [
    //                         new TarefasActions.ToggleUrgenteTarefaSuccess(response.id),
    //                         new UpdateData<Tarefa>({id: response.id, schema: tarefaSchema, changes: {urgente: response.urgente}})
    //                     ]),
    //                     catchError((err) => {
    //                         console.log(err);
    //                         return of(new TarefasActions.ToggleUrgenteTarefaFailed(action.payload));
    //                     })
    //                 );
    //             })
    //         );
    //
    // /**
    //  * Set Folder on Selected Tarefas
    //  * @type {Observable<any>}
    //  */
    // @Effect()
    // setFolderOnSelectedTarefas: Observable<any> =
    //     this._actions
    //         .pipe(
    //             ofType<TarefasActions.SetFolderOnSelectedTarefas>(TarefasActions.SET_FOLDER_ON_SELECTED_TAREFAS),
    //             concatMap((action) => {
    //                 return this._tarefaService.patch(action.payload.tarefa, {folder: action.payload.folder.id}).pipe(
    //                     mergeMap((response: any) => [
    //                         new TarefasActions.SetFolderOnSelectedTarefasSuccess(response),
    //                         new OperacoesActions.Resultado({
    //                             type: 'tarefa',
    //                             content: `Tarefa id ${response.id} editada com sucesso!`,
    //                             dateTime: response.criadoEm
    //                         })
    //                     ],
    //                     catchError((err) => {
    //                         console.log(err);
    //                         return of(new TarefasActions.SetFolderOnSelectedTarefasFailed(err));
    //                     })
    //                 ));
    //             })
    //         );
    //
    // /**
    //  * ISSUE-107
    //  * Get Assuntos Processo tarefa from input parameters
    //  * @type {Observable<any>}
    //  */
    // @Effect()
    // getAssuntosProcessoTarefa: Observable<any> =
    //     this._actions
    //         .pipe(
    //             ofType<TarefasActions.GetAssuntosProcessoTarefa>(TarefasActions.GET_ASSUNTOS_PROCESSO_TAREFA),
    //             mergeMap((action) => {
    //                 return this._assuntoService.query(
    //                     JSON.stringify({
    //                         ...action.payload.srv.filter
    //                     }),
    //                     action.payload.srv.limit,
    //                     action.payload.srv.offset,
    //                     JSON.stringify(action.payload.srv.sort),
    //                     JSON.stringify(action.payload.srv.populate)).pipe(
    //                         mergeMap((response) => [
    //                             new AddData<Assunto>({data: response['entities'], schema: assuntoSchema}),
    //                             new TarefasActions.GetAssuntosProcessoTarefaSuccess({
    //                                 assuntosId: response['entities'].map(assunto => assunto.id),
    //                                 idTarefaToLoadAssuntos: action.payload.tarefa,
    //                                 totalAssuntos: response['total']
    //                             })
    //
    //                         ]),
    //                         catchError((err, caught) => {
    //                             console.log(err);
    //                             this._store.dispatch(new TarefasActions.GetAssuntosProcessoTarefaFailed(err));
    //                             return caught;
    //                         })
    //                     );
    //
    //             }),
    //
    //         );
}
