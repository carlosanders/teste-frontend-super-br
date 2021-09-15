import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as VinculacaoDocumentoCreateActions from '../actions';

import {JuntadaService} from '@cdk/services/juntada.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Juntada, VinculacaoDocumento} from '@cdk/models';
import {juntada as juntadaSchema, vinculacaoDocumento as vinculacaoDocumentoSchema} from '@cdk/normalizr';
import {Router} from '@angular/router';
import {VinculacaoDocumentoService} from '@cdk/services/vinculacao-documento.service';
import * as JuntadaListActions from '../../../juntada-list/store/actions/juntada-list.actions';
import * as OperacoesActions from '../../../../../../../../store/actions/operacoes.actions';

@Injectable()
export class JuntadaEffects {
    routerState: any;
    /**
     * Get Juntada with router parameters
     *
     * @type {Observable<any>}
     */
    getJuntada: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<VinculacaoDocumentoCreateActions.GetJuntada>(VinculacaoDocumentoCreateActions.GET_JUNTADA),
        switchMap(action => this._juntadaService.query(
            JSON.stringify(action.payload),
            1,
            0,
            JSON.stringify({}),
            JSON.stringify([
                'populateAll',
                'volume.processo',
                'documento.componentesDigitais',
                'documento.vinculacoesDocumentos',
                'documento.tipoDocumento',
                'documento.vinculacaoDocumentoPrincipal'
            ]))),
        mergeMap(response => [
            new AddData<Juntada>({data: response['entities'], schema: juntadaSchema}),
            new VinculacaoDocumentoCreateActions.GetJuntadaSuccess({
                juntadaId: response['entities'][0].id,
                loaded: {
                    id: 'juntadaHandle',
                    value: this.routerState.params.juntadaHandle
                }
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new VinculacaoDocumentoCreateActions.GetJuntadaFailed(err));
        })
    ));
    /**
     * Save VinculacaoDocumento
     *
     * @type {Observable<any>}
     */
    saveVinculacaoDocumento: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<VinculacaoDocumentoCreateActions.SaveVinculacaoDocumento>(VinculacaoDocumentoCreateActions.SAVE_VINCULACAO_DOCUMENTO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'vinculação do documento',
            content: 'Salvando a vinculação do documento ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._vinculacaoDocumentoService.save(action.payload.vinculacaoDocumento).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'vinculação do documento',
                content: 'Vinculação do documento id ' + response.id + ' salva com sucesso.',
                status: 1, // sucesso
            }))),
            mergeMap((response: VinculacaoDocumento) => [
                new VinculacaoDocumentoCreateActions.SaveVinculacaoDocumentoSuccess(),
                new JuntadaListActions.ReloadJuntadas(),
                new AddData<VinculacaoDocumento>({data: [response], schema: vinculacaoDocumentoSchema}),
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'vinculação do documento',
                    content: 'Erro ao salvar a vinculação do documento!',
                    status: 2, // erro
                }));
                return of(new VinculacaoDocumentoCreateActions.SaveVinculacaoDocumentoFailed(err));
            })
        ))
    ));
    /**
     * Save Assunto Success
     */
    saveVinculacaoDocumentoSuccess: any = createEffect(() => this._actions.pipe(
        ofType<VinculacaoDocumentoCreateActions.SaveVinculacaoDocumentoSuccess>(VinculacaoDocumentoCreateActions.SAVE_VINCULACAO_DOCUMENTO_SUCCESS),
        tap(() => {
            this._router.navigate([this.routerState.url.replace(('vincular/' + this.routerState.params.juntadaHandle), 'listar')]).then();
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
