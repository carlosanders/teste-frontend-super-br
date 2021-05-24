import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, tap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';

import * as RelatorioDetailActions from 'app/main/apps/relatorios/relatorio-detail/store/actions/relatorio-detail.actions';

import {RelatorioService} from '@cdk/services/relatorio.service';
import {Router} from '@angular/router';
import {VinculacaoEtiquetaService} from '@cdk/services/vinculacao-etiqueta.service';
import {VinculacaoEtiqueta} from '@cdk/models';
import {AddChildData, AddData, RemoveChildData, UpdateData} from '@cdk/ngrx-normalizr';
import {vinculacaoEtiqueta as vinculacaoEtiquetaSchema} from '@cdk/normalizr';
import {relatorio as relatorioSchema} from '@cdk/normalizr';
import {documento as documentoSchema} from '@cdk/normalizr';
import {DocumentoService} from '@cdk/services/documento.service';
import {Relatorio} from '@cdk/models/relatorio.model';
import {Documento} from '@cdk/models';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class RelatorioDetailEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _relatorioService: RelatorioService,
        private _documentoService: DocumentoService,
        private _vinculacaoEtiquetaService: VinculacaoEtiquetaService,
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
     * Get Relatorio with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getRelatorio: any =
        this._actions
            .pipe(
                ofType<RelatorioDetailActions.GetRelatorio>(RelatorioDetailActions.GET_RELATORIO),
                switchMap(action => this._relatorioService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'documento',
                            'tipoRelatorio',
                            'vinculacoesEtiquetas',
                            'vinculacoesEtiquetas.etiqueta'
                        ]))),
                mergeMap(response => [
                    new AddData<Relatorio>({data: response['entities'], schema: relatorioSchema}),
                    new RelatorioDetailActions.GetRelatorioSuccess({
                        loaded: {
                            id: 'relatorioHandle',
                            value: this.routerState.params.relatorioHandle
                        },
                        relatorio: response['entities'][0]
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new RelatorioDetailActions.GetRelatorioFailed(err));
                    return caught;
                })
            );

    /**
     * Deselect Relatorio Action
     */
    @Effect({dispatch: false})
    deselectRelatorioAction =
        this._actions
            .pipe(
                ofType<RelatorioDetailActions.DeselectRelatorioAction>(RelatorioDetailActions.DESELECT_RELATORIO_ACTION),
                tap(() => {
                    this._router.navigate(['apps/relatorios/' + this.routerState.params.generoHandle + '/' +
                    this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle]).then();
                })
            );

    /**
     * Update Relatorio
     *
     * @type {Observable<any>}
     */
    @Effect()
    createRelatorio: Observable<RelatorioDetailActions.RelatorioDetailActionsAll> =
        this._actions
            .pipe(
                ofType<RelatorioDetailActions.CreateRelatorio>(RelatorioDetailActions.CREATE_RELATORIO),
                map(() => {
                    this._router.navigate([this.routerState.url + '/criar']).then();
                    return new RelatorioDetailActions.CreateRelatorioSuccess();
                })
            );


    /**
     * Delete Relatorio
     *
     * @type {Observable<any>}
     */
    @Effect()
    deleteRelatorio: Observable<RelatorioDetailActions.RelatorioDetailActionsAll> =
        this._actions
            .pipe(
                ofType<RelatorioDetailActions.DeleteRelatorio>(RelatorioDetailActions.DELETE_RELATORIO),
                mergeMap(action => this._relatorioService.destroy(action.payload).pipe(
                            map(response => new RelatorioDetailActions.DeleteRelatorioSuccess(response.id)),
                            catchError((err) => {
                                console.log(err);
                                return of(new RelatorioDetailActions.DeleteRelatorioFailed(action.payload));
                            })
                        )
                ));

    /**
     * Save Relatorio
     *
     * @type {Observable<any>}
     */
    @Effect()
    saveRelatorio: any =
        this._actions
            .pipe(
                ofType<RelatorioDetailActions.SaveRelatorio>(RelatorioDetailActions.SAVE_RELATORIO),
                switchMap(action => this._relatorioService.save(action.payload).pipe(
                        mergeMap((response: Relatorio) => [
                            new RelatorioDetailActions.SaveRelatorioSuccess(),
                            new AddData<Relatorio>({
                                data: [response],
                                schema: relatorioSchema
                            }), new OperacoesActions.Resultado({
                                type: 'relatorio',
                                content: `Relatorio id ${response.id} criada com sucesso!`
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new RelatorioDetailActions.SaveRelatorioFailed(err));
                        })
                    ))
            );

    /**
     * Create Vinculacao Etiqueta
     *
     * @type {Observable<any>}
     */
    @Effect()
    createVinculacaoEtiqueta: Observable<any> =
        this._actions
            .pipe(
                ofType<RelatorioDetailActions.CreateVinculacaoEtiqueta>(RelatorioDetailActions.CREATE_VINCULACAO_ETIQUETA),
                mergeMap((action) => {
                    const vinculacaoEtiqueta = new VinculacaoEtiqueta();
                    vinculacaoEtiqueta.relatorio = action.payload.relatorio;
                    vinculacaoEtiqueta.etiqueta = action.payload.etiqueta;
                    return this._vinculacaoEtiquetaService.save(vinculacaoEtiqueta).pipe(
                        tap(response => response.relatorio = null),
                        mergeMap(response => [
                            new AddChildData<VinculacaoEtiqueta>({
                                data: [response],
                                childSchema: vinculacaoEtiquetaSchema,
                                parentSchema: relatorioSchema,
                                parentId: action.payload.relatorio.id
                            }),
                            new OperacoesActions.Resultado({
                                type: 'relatorio',
                                content: `Relatorio id ${response.id} etiquetada com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new RelatorioDetailActions.CreateVinculacaoEtiquetaFailed(err));
                        })
                    );
                })
            );


    /**
     * Save conteúdo vinculação etiqueta na relatorio
     *
     * @type {Observable<any>}
     */
    @Effect()
    SaveConteudoVinculacaoEtiqueta: any =
        this._actions
            .pipe(
                ofType<RelatorioDetailActions.SaveConteudoVinculacaoEtiqueta>(RelatorioDetailActions.SAVE_CONTEUDO_VINCULACAO_ETIQUETA),
                mergeMap(action => this._vinculacaoEtiquetaService.patch(action.payload.vinculacaoEtiqueta, action.payload.changes).pipe(
                        mergeMap(response => [
                            new RelatorioDetailActions.SaveConteudoVinculacaoEtiquetaSuccess(response.id),
                            new UpdateData<VinculacaoEtiqueta>({
                                id: response.id,
                                schema: vinculacaoEtiquetaSchema,
                                changes: {conteudo: response.conteudo, privada: response.privada}
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new RelatorioDetailActions.SaveConteudoVinculacaoEtiquetaFailed(err));
                        })
                    ))
            );


    /**
     * Delete Vinculacao Etiqueta
     *
     * @type {Observable<any>}
     */
    @Effect()
    deleteVinculacaoEtiqueta: Observable<any> =
        this._actions
            .pipe(
                ofType<RelatorioDetailActions.DeleteVinculacaoEtiqueta>(RelatorioDetailActions.DELETE_VINCULACAO_ETIQUETA),
                mergeMap(action => this._vinculacaoEtiquetaService.destroy(action.payload.vinculacaoEtiquetaId).pipe(
                            mergeMap(() => [
                                new RemoveChildData({
                                    id: action.payload.vinculacaoEtiquetaId,
                                    childSchema: vinculacaoEtiquetaSchema,
                                    parentSchema: relatorioSchema,
                                    parentId: action.payload.relatorioId
                                })
                            ]),
                            catchError((err) => {
                                console.log(err);
                                return of(new RelatorioDetailActions.DeleteVinculacaoEtiquetaFailed(action.payload));
                            })
                        )
                ));

    /**
     * Get Documentos with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getDocumentos: any =
        this._actions
            .pipe(
                ofType<RelatorioDetailActions.GetDocumentos>(RelatorioDetailActions.GET_DOCUMENTOS),
                switchMap(action => this._documentoService.query(
                        JSON.stringify(action.payload),
                        25,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'tipoDocumento',
                            'tipoDocumento.especieDocumento',
                            'componentesDigitais']))),
                mergeMap(response => [
                    new AddData<Documento>({data: response['entities'], schema: documentoSchema}),
                    new RelatorioDetailActions.GetDocumentosSuccess({
                        loaded: {
                            id: 'relatorioHandle',
                            value: this.routerState.params.relatorioHandle
                        },
                        entitiesId: response['entities'].map(documento => documento.id),
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new RelatorioDetailActions.GetDocumentosFailed(err));
                    return caught;
                })
            );
}
