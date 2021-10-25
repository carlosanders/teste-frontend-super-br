import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as ProcessoViewVinculacaoDocumentoActions from '../actions';

import {JuntadaService} from '@cdk/services/juntada.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Juntada, VinculacaoDocumento} from '@cdk/models';
import {juntada as juntadaSchema, vinculacaoDocumento as vinculacaoDocumentoSchema} from '@cdk/normalizr';
import {Router} from '@angular/router';
import {VinculacaoDocumentoService} from '@cdk/services/vinculacao-documento.service';
import * as OperacoesActions from '../../../../../../../store/actions/operacoes.actions';
import {getIndex, GetJuntada, RetiraJuntada} from '../../../store';

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
                'documento.vinculacaoDocumentoPrincipal'
            ])
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
                'documento.juntadaAtual',
                'documento.componentesDigitais',
                'documento.vinculacoesDocumentos',
                'documento.tipoDocumento',
                'documento.vinculacaoDocumentoPrincipal'
            ])
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
        withLatestFrom(this._store.pipe(select(getIndex))),
        tap(([action]) => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'vinculação do documento',
            content: 'Salvando a vinculação do documento ...',
            status: 0, // carregando
        }))),
        switchMap(([action, index]) => this._vinculacaoDocumentoService.save(action.payload.vinculacaoDocumento).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'vinculação do documento',
                content: 'Vinculação do documento id ' + response.id + ' salva com sucesso.',
                status: 1, // sucesso
            }))),
            mergeMap((response: VinculacaoDocumento) => {
                return [
                    new AddData<VinculacaoDocumento>({data: [response], schema: vinculacaoDocumentoSchema}),
                    new ProcessoViewVinculacaoDocumentoActions.SaveVinculacaoDocumentoSuccess(),
                    new GetJuntada(action.payload.juntada.id),
                    new RetiraJuntada(action.payload.juntadaVinculadaId)
                ];
            }),
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
        ))
    ));
    /**
     * Save Assunto Success
     */
    saveVinculacaoDocumentoSuccess: any = createEffect(() => this._actions.pipe(
        ofType<ProcessoViewVinculacaoDocumentoActions.SaveVinculacaoDocumentoSuccess>(ProcessoViewVinculacaoDocumentoActions.SAVE_VINCULACAO_DOCUMENTO_SUCCESS),
        tap(() => {
            this._router.navigate([this.routerState.url.replace(('vincular/' + this.routerState.params.juntadaHandle), '')]).then();
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
