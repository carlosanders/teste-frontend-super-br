import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as ProcessoViewVinculacaoDocumentoActions from '../actions';

import {JuntadaService} from '@cdk/services/juntada.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Juntada, VinculacaoDocumento} from '@cdk/models';
import {juntada as juntadaSchema, vinculacaoDocumento as vinculacaoDocumentoSchema} from '@cdk/normalizr';
import {Router} from '@angular/router';
import {VinculacaoDocumentoService} from '@cdk/services/vinculacao-documento.service';
import * as OperacoesActions from '../../../../../../../store/actions/operacoes.actions';
import {GetJuntada, RetiraJuntada} from '../../../store';
import * as ProcessoViewActions from '../../../store/actions';

@Injectable()
export class JuntadaEffects {
    routerState: any;
    /**
     * Get Juntada with router parameters
     *
     * @type {Observable<any>}
     */
    getJuntada: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ProcessoViewVinculacaoDocumentoActions.GetJuntada>(ProcessoViewVinculacaoDocumentoActions.GET_JUNTADA),
        mergeMap(action => this._juntadaService.get(
            action.payload.juntadaId,
            JSON.stringify([
                'volume',
                'documento',
                'documento.componentesDigitais',
                'documento.vinculacoesDocumentos',
                'documento.tipoDocumento',
            ]),
            JSON.stringify({'incluiVinculacaoDocumentoPrincipal': true})
        ).pipe(
            mergeMap(response => [
                new AddData<Juntada>({data: [response], schema: juntadaSchema}),
                new ProcessoViewVinculacaoDocumentoActions.GetJuntadaSuccess({
                    juntadaId: response.id,
                    loaded: {
                        id: 'juntadaHandle',
                        value: this.routerState.params.juntadaHandle
                    }
                })
            ]),
            catchError((err) => {
                console.log(err);
                return of(new ProcessoViewVinculacaoDocumentoActions.GetJuntadaFailed(err));
            })
        ))
    ));
    /**
     * Get Juntada Vinculada with router parameters
     *
     * @type {Observable<any>}
     */
    getJuntadaVinculada: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ProcessoViewVinculacaoDocumentoActions.GetJuntadaVinculada>(ProcessoViewVinculacaoDocumentoActions.GET_JUNTADA_VINCULADA),
        mergeMap(action => this._juntadaService.get(
            action.payload.juntadaVinculadaId,
            JSON.stringify([
                'volume',
                'documento',
                'documento.componentesDigitais',
                'documento.vinculacoesDocumentos',
                'documento.tipoDocumento'
            ]),
            JSON.stringify({'incluiVinculacaoDocumentoPrincipal': true})
        ).pipe(
            mergeMap(response => [
                new AddData<Juntada>({data: [response], schema: juntadaSchema}),
                new ProcessoViewVinculacaoDocumentoActions.GetJuntadaVinculadaSuccess({
                    juntadaVinculadaId: response.id,
                    loadedVinculada: {
                        id: 'juntadaVinculadaHandle',
                        value: this.routerState.params.juntadaVinculadaHandle
                    }
                })
            ]),
            catchError((err) => {
                console.log(err);
                return of(new ProcessoViewVinculacaoDocumentoActions.GetJuntadaVinculadaFailed(err));
            })
        ))
    ));
    /**
     * Save VinculacaoDocumento
     *
     * @type {Observable<any>}
     */
    saveVinculacaoDocumento: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ProcessoViewVinculacaoDocumentoActions.SaveVinculacaoDocumento>(ProcessoViewVinculacaoDocumentoActions.SAVE_VINCULACAO_DOCUMENTO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'vinculação do documento',
            content: 'Salvando a vinculação do documento ...',
            status: 0, // carregando
        }))),
        switchMap((action) => {
            const populate = [
                'documento',
                'documento.origemDados',
                'documento.tipoDocumento',
                'documento.componentesDigitais',
                'documento.criadoPor',
                'documento.setorOrigem',
                'documento.setorOrigem.unidade'
            ];
            return this._vinculacaoDocumentoService.save(action.payload.vinculacaoDocumento, '{}', JSON.stringify(populate)).pipe(
                tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'vinculação do documento',
                    content: 'Vinculação do documento id ' + response.id + ' salva com sucesso.',
                    status: 1, // sucesso
                }))),
                mergeMap((response: VinculacaoDocumento) => [
                    new AddData<VinculacaoDocumento>({data: [response], schema: vinculacaoDocumentoSchema}),
                    new GetJuntada(action.payload.juntada.id),
                    new RetiraJuntada(action.payload.juntadaVinculadaId),
                    new ProcessoViewVinculacaoDocumentoActions.SaveVinculacaoDocumentoSuccess(action.payload),
                ]),
                catchError((err) => {
                    console.log(err);
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'vinculação do documento',
                        content: 'Erro ao salvar a vinculação do documento!',
                        status: 2, // erro
                    }));
                    return of(new ProcessoViewVinculacaoDocumentoActions.SaveVinculacaoDocumentoFailed(err));
                })
            );
        })
    ));
    /**
     * Save Assunto Success
     */
    saveVinculacaoDocumentoSuccess: any = createEffect(() => this._actions.pipe(
        ofType<ProcessoViewVinculacaoDocumentoActions.SaveVinculacaoDocumentoSuccess>(ProcessoViewVinculacaoDocumentoActions.SAVE_VINCULACAO_DOCUMENTO_SUCCESS),
        tap((action) => {
            let url = this.routerState.url.split(('vincular/' + this.routerState.params.juntadaHandle))[0];
            let currentStep;
            if (this.routerState.params['stepHandle'] !== 'latest' && this.routerState.params['stepHandle'] !== 'capa') {
                const steps = this.routerState.params['stepHandle'].split('-');
                currentStep = {
                    step: parseInt(steps[0], 10),
                    subStep: parseInt(steps[1], 10)
                };
                if (currentStep.step === action.payload.juntadaVinculadaId) {
                    currentStep.step = action.payload.juntada.id;
                    url = url.replace(this.routerState.params['stepHandle'], currentStep.step + '-' + currentStep.subStep);
                }
            }
            this._router.navigate([url]).then(() => {
                if (this.routerState.params['stepHandle'] !== 'latest' && this.routerState.params['stepHandle'] !== 'capa') {
                    this._store.dispatch(new ProcessoViewActions.SetCurrentStep(currentStep));
                } else if (this.routerState.params['stepHandle'] === 'capa') {
                    this._store.dispatch(new ProcessoViewActions.GetCapaProcesso());
                } else {
                    let processoId = null;

                    const routeParams = of('processoHandle');
                    routeParams.subscribe((param) => {
                        processoId = parseInt(this.routerState.params[param], 10);
                    });
                    this._store.dispatch(new ProcessoViewActions.DownloadLatestBinary(processoId));
                }
            });
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _juntadaService: JuntadaService,
        private _vinculacaoDocumentoService: VinculacaoDocumentoService,
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
