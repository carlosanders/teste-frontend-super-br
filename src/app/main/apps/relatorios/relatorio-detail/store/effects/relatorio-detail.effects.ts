import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';

import * as RelatorioDetailActions
    from 'app/main/apps/relatorios/relatorio-detail/store/actions/relatorio-detail.actions';

import {RelatorioService} from '@cdk/services/relatorio.service';
import {Router} from '@angular/router';
import {VinculacaoEtiquetaService} from '@cdk/services/vinculacao-etiqueta.service';
import {Documento, VinculacaoEtiqueta} from '@cdk/models';
import {AddChildData, AddData, RemoveChildData, UpdateData} from '@cdk/ngrx-normalizr';
import {
    documento as documentoSchema,
    relatorio as relatorioSchema,
    vinculacaoEtiqueta as vinculacaoEtiquetaSchema
} from '@cdk/normalizr';
import {DocumentoService} from '@cdk/services/documento.service';
import {Relatorio} from '@cdk/models/relatorio.model';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class RelatorioDetailEffect {
    routerState: any;
    /**
     * Get Relatorio with router parameters
     *
     * @type {Observable<any>}
     */
    getRelatorio: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<RelatorioDetailActions.GetRelatorio>(RelatorioDetailActions.GET_RELATORIO),
        switchMap(action => this._relatorioService.get(
            action.payload,
            JSON.stringify([
                'documento',
                'tipoRelatorio',
                'vinculacoesEtiquetas',
                'vinculacoesEtiquetas.etiqueta'
            ]))),
        mergeMap(response => [
            new AddData<Relatorio>({data: [response], schema: relatorioSchema}),
            new RelatorioDetailActions.GetRelatorioSuccess({
                loaded: {
                    id: 'relatorioHandle',
                    value: this.routerState.params.relatorioHandle
                },
                relatorio: response?.id
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new RelatorioDetailActions.GetRelatorioFailed(err));
        })
    ));
    /**
     * Deselect Relatorio Action
     */
    deselectRelatorioAction: any = createEffect(() => this._actions.pipe(
        ofType<RelatorioDetailActions.DeselectRelatorioAction>(RelatorioDetailActions.DESELECT_RELATORIO_ACTION),
        tap(() => {
            this._router.navigate(['apps/relatorios/' + this.routerState.params.generoHandle + '/' +
            this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle]).then();
        })
    ), {dispatch: false});
    /**
     * Update Relatorio
     *
     * @type {Observable<any>}
     */
    createRelatorio: Observable<RelatorioDetailActions.RelatorioDetailActionsAll> = createEffect(() => this._actions.pipe(
        ofType<RelatorioDetailActions.CreateRelatorio>(RelatorioDetailActions.CREATE_RELATORIO),
        map(() => {
            this._router.navigate([this.routerState.url + '/criar']).then();
            return new RelatorioDetailActions.CreateRelatorioSuccess();
        })
    ));
    /**
     * Delete Relatorio
     *
     * @type {Observable<any>}
     */
    deleteRelatorio: Observable<RelatorioDetailActions.RelatorioDetailActionsAll> = createEffect(() => this._actions.pipe(
        ofType<RelatorioDetailActions.DeleteRelatorio>(RelatorioDetailActions.DELETE_RELATORIO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'relatório',
            content: 'Apagando o relatório id ' + action.payload.relatorioId + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._relatorioService.destroy(action.payload.relatorioId).pipe(
            map((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'relatório',
                    content: 'Relatório id ' + action.payload.relatorioId + ' deletado com sucesso.',
                    status: 1, // sucesso
                    lote: action.payload.loteId
                }));
                this._store.dispatch(new UpdateData<Relatorio>({
                    id: response.id,
                    schema: relatorioSchema,
                    changes: {apagadoEm: response.apagadoEm}
                }));
                return new RelatorioDetailActions.DeleteRelatorioSuccess(response.id);
            }),
            catchError((err) => {
                const payload = {
                    id: action.payload.relatorioId,
                    error: err
                };
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'relatório',
                    content: 'Erro ao apagar o relatório id ' + action.payload.relatorioId + '!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                console.log(err);
                return of(new RelatorioDetailActions.DeleteRelatorioFailed(payload));
            })
        ), 25)
    ));
    /**
     * Save Relatorio
     *
     * @type {Observable<any>}
     */
    saveRelatorio: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<RelatorioDetailActions.SaveRelatorio>(RelatorioDetailActions.SAVE_RELATORIO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'relatório',
            content: 'Salvando relatório ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._relatorioService.save(action.payload.relatorio).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'relatório',
                content: 'Relatorio id ' + response.id + ' salvo com sucesso.',
                status: 1, // carregando
                lote: action.payload.loteId
            }))),
            mergeMap((response: Relatorio) => [
                new RelatorioDetailActions.SaveRelatorioSuccess(),
                new AddData<Relatorio>({
                    data: [response],
                    schema: relatorioSchema
                })
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'relatório',
                    content: 'Erro ao salvar o relatório!',
                    status: 2, // erro
                }));
                return of(new RelatorioDetailActions.SaveRelatorioFailed(err));
            })
        ))
    ));
    /**
     * Create Vinculacao Etiqueta
     *
     * @type {Observable<any>}
     */
    createVinculacaoEtiqueta: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<RelatorioDetailActions.CreateVinculacaoEtiqueta>(RelatorioDetailActions.SAVE_RELATORIO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'vinculação etiqueta',
            content: 'Salvando a vinculação etiqueta ...',
            status: 0, // carregando
        }))),
        switchMap((action) => {
            const vinculacaoEtiqueta = new VinculacaoEtiqueta();
            vinculacaoEtiqueta.relatorio = action.payload.relatorio;
            vinculacaoEtiqueta.etiqueta = action.payload.etiqueta;
            return this._vinculacaoEtiquetaService.save(action.payload.vinculacaoEtiqueta).pipe(
                tap(response =>
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'vinculação etiqueta',
                        content: 'Vinculação etiqueta id ' + response.id + ' salva com sucesso.',
                        status: 1, // sucesso
                    }))
                ),
                mergeMap((response: VinculacaoEtiqueta) => [
                    new AddData<VinculacaoEtiqueta>({data: [response], schema: vinculacaoEtiquetaSchema}),
                    new AddChildData<VinculacaoEtiqueta>({
                        data: [response],
                        childSchema: vinculacaoEtiquetaSchema,
                        parentSchema: relatorioSchema,
                        parentId: action.payload.relatorio.id
                    }),
                ]),
                catchError((err) => {
                    console.log(err);
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'vinculação etiqueta',
                        content: 'Erro ao salvar a vinculação etiqueta!',
                        status: 2, // erro
                    }));
                    return of(new RelatorioDetailActions.CreateVinculacaoEtiquetaFailed(err));
                })
            );
        })
    ));
    /**
     * Save conteúdo vinculação etiqueta na relatorio
     *
     * @type {Observable<any>}
     */
    saveConteudoVinculacaoEtiqueta: Observable<any> = createEffect(() => this._actions.pipe(
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
    ));
    /**
     * Delete Vinculacao Etiqueta
     *
     * @type {Observable<any>}
     */
    deleteVinculacaoEtiqueta: Observable<any> = createEffect(() => this._actions.pipe(
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
        ))
    ));
    /**
     * Get Documentos with router parameters
     *
     * @type {Observable<any>}
     */
    getDocumentos: Observable<any> = createEffect(() => this._actions.pipe(
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
        catchError((err) => {
            console.log(err);
            return of(new RelatorioDetailActions.GetDocumentosFailed(err));
        })
    ));

    constructor(
        private _actions: Actions,
        private _relatorioService: RelatorioService,
        private _documentoService: DocumentoService,
        private _vinculacaoEtiquetaService: VinculacaoEtiquetaService,
        private _store: Store<State>,
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
