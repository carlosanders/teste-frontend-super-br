import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as ProcessoViewVinculacaoDocumentoActions from '../actions';

import {JuntadaService} from '@cdk/services/juntada.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Juntada, VinculacaoDocumento} from '@cdk/models';
import {juntada as juntadaSchema, vinculacaoDocumento as vinculacaoDocumentoSchema} from '@cdk/normalizr';
import {Router} from '@angular/router';
import {VinculacaoDocumentoService} from '@cdk/services/vinculacao-documento.service';
import * as OperacoesActions from '../../../../../../../store/actions/operacoes.actions';
import {ReloadJuntadas} from "../../../store";

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
                ofType<ProcessoViewVinculacaoDocumentoActions.GetJuntada>(ProcessoViewVinculacaoDocumentoActions.GET_JUNTADA),
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
                    new ProcessoViewVinculacaoDocumentoActions.GetJuntadaSuccess({
                        juntadaId: response['entities'][0].id,
                        loaded: {
                            id: 'juntadaHandle',
                            value: this.routerState.params.juntadaHandle
                        }
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new ProcessoViewVinculacaoDocumentoActions.GetJuntadaFailed(err));
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
                ofType<ProcessoViewVinculacaoDocumentoActions.SaveVinculacaoDocumento>(ProcessoViewVinculacaoDocumentoActions.SAVE_VINCULACAO_DOCUMENTO),
                switchMap(action => this._vinculacaoDocumentoService.save(action.payload).pipe(
                        mergeMap((response: VinculacaoDocumento) => [
                            new ProcessoViewVinculacaoDocumentoActions.SaveVinculacaoDocumentoSuccess(),
                            new AddData<VinculacaoDocumento>({data: [response], schema: vinculacaoDocumentoSchema}),
                            new ReloadJuntadas(),
                            new OperacoesActions.Resultado({
                                type: 'vinculacaoDocumento',
                                content: `Vinculação Documento id ${response.id} criada com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log (err);
                            return of(new ProcessoViewVinculacaoDocumentoActions.SaveVinculacaoDocumentoFailed(err));
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
                ofType<ProcessoViewVinculacaoDocumentoActions.SaveVinculacaoDocumentoSuccess>(ProcessoViewVinculacaoDocumentoActions.SAVE_VINCULACAO_DOCUMENTO_SUCCESS),
                tap(() => {
                    this._router.navigate([this.routerState.url.replace(('vincular/' + this.routerState.params.juntadaHandle), '')]).then();
                })
            );

}