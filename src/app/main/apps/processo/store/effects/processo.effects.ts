import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as ProcessoActions from 'app/main/apps/processo/store/actions/processo.actions';

import {ProcessoService} from '@cdk/services/processo.service';
import {LoginService} from 'app/main/auth/login/login.service';
import {AddChildData, AddData, RemoveChildData, UpdateData} from '@cdk/ngrx-normalizr';
import {Processo} from '@cdk/models/processo.model';
import {processo as processoSchema} from '@cdk/normalizr/processo.schema';
import {VinculacaoEtiquetaService} from '@cdk/services/vinculacao-etiqueta.service';
import {VinculacaoEtiqueta} from '@cdk/models/vinculacao-etiqueta.model';
import {vinculacaoEtiqueta as vinculacaoEtiquetaSchema} from '@cdk/normalizr/vinculacao-etiqueta.schema';
import * as OperacoesActions from '../../../../../store/actions/operacoes.actions';

@Injectable()
export class ProcessoEffect {
    routerState: any;
    private _profile: any;

    constructor(
        private _actions: Actions,
        private _processoService: ProcessoService,
        private _loginService: LoginService,
        private _vinculacaoEtiquetaService: VinculacaoEtiquetaService,
        private _store: Store<State>
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });

        this._profile = _loginService.getUserProfile();
    }

    /**
     * Get Processo with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getProcesso: any =
        this._actions
            .pipe(
                tap((n) => {
                    console.log('entrou GET Effects Processo: '); 
                    console.log(n);
                }),
                ofType<ProcessoActions.GetProcesso>(ProcessoActions.GET_PROCESSO),
                switchMap((action) => {
                    const chaveAcesso = this.routerState.params.chaveAcessoHandle ? {
                        chaveAcesso: this.routerState.params.chaveAcessoHandle
                    } : {};
                    return this._processoService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll',
                            'setorAtual.unidade',
                            'vinculacoesEtiquetas',
                            'vinculacoesEtiquetas.etiqueta'
                        ]),
                        JSON.stringify(chaveAcesso));
                }),
                switchMap(response => [
                    new AddData<Processo>({data: response['entities'], schema: processoSchema}),
                    new ProcessoActions.GetProcessoSuccess({
                        loaded: {
                            id: 'processoHandle',
                            value: this.routerState.params.processoHandle,
                            acessoNegado: response['entities'][0].acessoNegado
                        },
                        processoId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new ProcessoActions.GetProcessoFailed(err));
                    return caught;
                })
            );

    /**
     * Create Vinculacao Etiqueta
     * @type {Observable<any>}
     */
    @Effect()
    createVinculacaoEtiqueta: Observable<any> =
        this._actions
            .pipe(
                ofType<ProcessoActions.CreateVinculacaoEtiqueta>(ProcessoActions.CREATE_VINCULACAO_ETIQUETA),
                mergeMap((action) => {
                    const vinculacaoEtiqueta = new VinculacaoEtiqueta();
                    vinculacaoEtiqueta.processo = action.payload.processo;
                    vinculacaoEtiqueta.etiqueta = action.payload.etiqueta;
                    return this._vinculacaoEtiquetaService.save(vinculacaoEtiqueta).pipe(
                        tap((response) => response.processo = null),
                        mergeMap((response) => [
                            new AddChildData<VinculacaoEtiqueta>({
                                data: [response],
                                childSchema: vinculacaoEtiquetaSchema,
                                parentSchema: processoSchema,
                                parentId: action.payload.processo.id
                            }),
                            new OperacoesActions.Resultado({
                                type: 'processo',
                                content: `Processo id ${response.id} etiquetado com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new ProcessoActions.CreateVinculacaoEtiquetaFailed(err));
                        })
                    );
                })
            );


   /**
     * Save conteúdo vinculação etiqueta no processo
     * @type {Observable<any>}
     */
    @Effect()
    SaveConteudoVinculacaoEtiqueta: any =
        this._actions
            .pipe(
                ofType<ProcessoActions.SaveConteudoVinculacaoEtiqueta>(ProcessoActions.SAVE_CONTEUDO_VINCULACAO_ETIQUETA),
                mergeMap((action) => {
                    return this._vinculacaoEtiquetaService.patch(action.payload.vinculacaoEtiqueta, action.payload.changes).pipe(
                     //@retirar: return this._vinculacaoEtiquetaService.patch(action.payload.vinculacaoEtiqueta,  {conteudo: action.payload.vinculacaoEtiqueta.conteudo}).pipe(
                        mergeMap((response) => [ 
                            new ProcessoActions.SaveConteudoVinculacaoEtiquetaSuccess(response.id),
                            new UpdateData<VinculacaoEtiqueta>({id: response.id, schema: vinculacaoEtiquetaSchema, changes: {conteudo: response.conteudo}})
                        ]),
                        catchError((err) => {
                            console.log(err); 
                            return of(new ProcessoActions.SaveConteudoVinculacaoEtiquetaFailed(err));
                        })
                    );
                })
            );   



    /**
     * Delete Vinculacao Etiqueta
     * @type {Observable<any>}
     */
    @Effect()
    deleteVinculacaoEtiqueta: Observable<any> =
        this._actions
            .pipe(
                ofType<ProcessoActions.DeleteVinculacaoEtiqueta>(ProcessoActions.DELETE_VINCULACAO_ETIQUETA),
                mergeMap((action) => {
                        return this._vinculacaoEtiquetaService.destroy(action.payload.vinculacaoEtiquetaId).pipe(
                            mergeMap(() => [
                                new RemoveChildData({
                                    id: action.payload.vinculacaoEtiquetaId,
                                    childSchema: vinculacaoEtiquetaSchema,
                                    parentSchema: processoSchema,
                                    parentId: action.payload.processoId
                                })
                            ]),
                            catchError((err) => {
                                console.log(err);
                                return of(new ProcessoActions.DeleteVinculacaoEtiquetaFailed(action.payload));
                            })
                        );
                    }
                ));

}
