import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as VinculacaoDocumentoCreateActions from '../actions';

import {JuntadaService} from '@cdk/services/juntada.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Juntada, VinculacaoDocumento} from '@cdk/models';
import {vinculacaoDocumento as vinculacaoDocumentoSchema, juntada as juntadaSchema} from '@cdk/normalizr';
import {Router} from '@angular/router';
import {VinculacaoDocumentoService} from '@cdk/services/vinculacao-documento.service';
import * as JuntadaListActions from '../../../juntada-list/store/actions/juntada-list.actions';
import * as OperacoesActions from '../../../../../../../../store/actions/operacoes.actions';

@Injectable()
export class JuntadaEffects {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _juntadaService: JuntadaService,
        private _vinculacaoDocumentoService: VinculacaoDocumentoService,
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
     * Get Juntada with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getJuntada: any =
        this._actions
            .pipe(
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
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new VinculacaoDocumentoCreateActions.GetJuntadaFailed(err));
                    return caught;
                })
            );

    /**
     * Save VinculacaoDocumento
     *
     * @type {Observable<any>}
     */
    @Effect()
    saveVinculacaoDocumento: any =
        this._actions
            .pipe(
                ofType<VinculacaoDocumentoCreateActions.SaveVinculacaoDocumento>(VinculacaoDocumentoCreateActions.SAVE_VINCULACAO_DOCUMENTO),
                switchMap(action => this._vinculacaoDocumentoService.save(action.payload).pipe(
                        mergeMap((response: VinculacaoDocumento) => [
                            new VinculacaoDocumentoCreateActions.SaveVinculacaoDocumentoSuccess(),
                            new JuntadaListActions.ReloadJuntadas(),
                            new AddData<VinculacaoDocumento>({data: [response], schema: vinculacaoDocumentoSchema}),
                            new OperacoesActions.Resultado({
                                type: 'vinculacaoDocumento',
                                content: `Vinculação Documento id ${response.id} criada com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log (err);
                            return of(new VinculacaoDocumentoCreateActions.SaveVinculacaoDocumentoFailed(err));
                        })
                    ))
            );

    /**
     * Save Assunto Success
     */
    @Effect({dispatch: false})
    saveVinculacaoDocumentoSuccess: any =
        this._actions
            .pipe(
                ofType<VinculacaoDocumentoCreateActions.SaveVinculacaoDocumentoSuccess>(VinculacaoDocumentoCreateActions.SAVE_VINCULACAO_DOCUMENTO_SUCCESS),
                tap(() => {
                    this._router.navigate([this.routerState.url.replace(('vincular/' + this.routerState.params.juntadaHandle), 'listar')]).then();
                })
            );

}
