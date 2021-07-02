import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {relatorio as relatorioSchema} from '@cdk/normalizr';

import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, concatMap, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as RelatoriosActions from '../actions/relatorios.actions';

import {Relatorio} from '@cdk/models/relatorio.model';
import {RelatorioService} from '@cdk/services/relatorio.service';
import {LoginService} from 'app/main/auth/login/login.service';
import {Router} from '@angular/router';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class RelatoriosEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _relatorioService: RelatorioService,
        public _loginService: LoginService,
        private _store: Store<State>,
        private _router: Router
    ) {
        this._store
            .pipe(
                select(getRouterState),
            ).subscribe((routerState) => {
            if (routerState) {
                this.routerState = routerState.state;
            }
        });
    }

    /**
     * Get Relatorios with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getRelatorios: Observable<any> =
        this._actions
            .pipe(
                ofType<RelatoriosActions.GetRelatorios>(RelatoriosActions.GET_RELATORIOS),
                switchMap(action => this._relatorioService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.folderFilter,
                            ...action.payload.listFilter,
                            ...action.payload.etiquetaFilter
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate))),
                concatMap(response => [
                    new AddData<Relatorio>({data: response['entities'], schema: relatorioSchema}),
                    new RelatoriosActions.GetRelatoriosSuccess({
                        entitiesId: response['entities'].map(relatorio => relatorio.id),
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
                    this._store.dispatch(new RelatoriosActions.GetRelatoriosFailed(err));
                    return caught;
                })
            );

    /**
     * Update Relatorio
     *
     * @type {Observable<any>}
     */
    @Effect()
    setCurrentRelatorio: Observable<RelatoriosActions.RelatoriosActionsAll> =
        this._actions
            .pipe(
                ofType<RelatoriosActions.SetCurrentRelatorio>(RelatoriosActions.SET_CURRENT_RELATORIO),
                map((action) => {

                    this._router.navigate([
                        'apps/relatorios/' + this.routerState.params.generoHandle + '/' +
                        this.routerState.params.typeHandle + '/' +
                        this.routerState.params.targetHandle + '/relatorio/' + action.payload.relatorioId + '/visualizar']
                    ).then();

                    return new RelatoriosActions.SetCurrentRelatorioSuccess();
                })
            );

    /**
     * Create Relatorio
     *
     * @type {Observable<any>}
     */
    @Effect()
    createRelatorio: Observable<RelatoriosActions.RelatoriosActionsAll> =
        this._actions
            .pipe(
                ofType<RelatoriosActions.CreateRelatorio>(RelatoriosActions.CREATE_RELATORIO),
                map(() => {
                    this._router.navigate(['apps/relatorios/' + this.routerState.params.generoHandle + '/' +
                    this.routerState.params.typeHandle + '/' +
                    '/' + this.routerState.params.targetHandle + '/criar']).then();
                    return new RelatoriosActions.CreateRelatorioSuccess();
                })
            );

    /**
     * Delete Relatorio
     *
     * @type {Observable<any>}
     */
    @Effect()
    deleteRelatorio: Observable<RelatoriosActions.RelatoriosActionsAll> =
        this._actions
            .pipe(
                ofType<RelatoriosActions.DeleteRelatorio>(RelatoriosActions.DELETE_RELATORIO),
                tap((action) => {
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'relatorio',
                        content: 'Apagando a relatorio id ' + action.payload.relatorioId + '...',
                        status: 0, // carregando
                        lote: action.payload.loteId
                    }));
                }),
                mergeMap((action) => {
                    return this._relatorioService.destroy(action.payload.relatorioId).pipe(
                        map((response) => {
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'relatorio',
                                content: 'Relatorio id ' + action.payload.relatorioId + ' deletada com sucesso.',
                                status: 1, // sucesso
                                lote: action.payload.loteId
                            }));
                            new UpdateData<Relatorio>({
                                id: response.id,
                                schema: relatorioSchema,
                                changes: {apagadoEm: response.apagadoEm}
                            });
                            return new RelatoriosActions.DeleteRelatorioSuccess(response.id);
                        }),
                        catchError((err) => {
                            const payload = {
                                id: action.payload.relatorioId,
                                error: err
                            };
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'relatorio',
                                content: 'Erro ao apagar a relatorio id ' + action.payload.relatorioId + '!',
                                status: 2, // erro
                                lote: action.payload.loteId
                            }));
                            console.log(err);
                            return of(new RelatoriosActions.DeleteRelatorioFailed(payload));
                        })
                    );
                }, 25)
            );

    /**
     * Set Folder on Selected Relatorios
     *
     * @type {Observable<any>}
     */
    @Effect()
    setFolderOnSelectedRelatorios: Observable<any> =
        this._actions
            .pipe(
                ofType<RelatoriosActions.SetFolderOnSelectedRelatorios>(RelatoriosActions.SET_FOLDER_ON_SELECTED_RELATORIOS),
                concatMap(action => this._relatorioService.patch(action.payload.relatorio, {folder: action.payload.folder.id}).pipe(
                        mergeMap((response: any) => [
                                new RelatoriosActions.SetFolderOnSelectedRelatoriosSuccess(response),
                                new OperacoesActions.Resultado({
                                    type: 'relatorio',
                                    content: `Relatorio id ${response.id} editada com sucesso!`,
                                    dateTime: response.criadoEm
                                })
                            ],
                            catchError((err) => {
                                console.log(err);
                                return of(new RelatoriosActions.SetFolderOnSelectedRelatoriosFailed(err));
                            })
                        )))
            );
}
