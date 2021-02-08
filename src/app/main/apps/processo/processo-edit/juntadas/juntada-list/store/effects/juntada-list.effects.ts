import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as JuntadaListActions from 'app/main/apps/processo/processo-edit/juntadas/juntada-list/store/actions';

import {JuntadaService} from '@cdk/services/juntada.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Assinatura, Juntada} from '@cdk/models';
import {assinatura as assinaturaSchema, juntada as juntadaSchema} from '@cdk/normalizr';
import {Router} from '@angular/router';
import {environment} from '../../../../../../../../../environments/environment';
import {DocumentoService} from '@cdk/services/documento.service';
import {AssinaturaService} from '@cdk/services/assinatura.service';
import {VinculacaoDocumentoService} from '@cdk/services/vinculacao-documento.service';
import * as OperacoesActions from '../../../../../../../../store/actions/operacoes.actions';

@Injectable()
export class JuntadaListEffect {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _juntadaService: JuntadaService,
        private _documentoService: DocumentoService,
        private _assinaturaService: AssinaturaService,
        private _vinculacaoDocumentoService: VinculacaoDocumentoService,
        private _store: Store<State>,
        private _router: Router
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    /**
     * Get Juntadas with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getJuntadas: any =
        this._actions
            .pipe(
                ofType<JuntadaListActions.GetJuntadas>(JuntadaListActions.GET_JUNTADAS),
                switchMap((action) => {
                    return this._juntadaService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.gridFilter,
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate),
                        JSON.stringify(action.payload.context));
                }),
                mergeMap((response) => [
                    new AddData<Juntada>({data: response['entities'], schema: juntadaSchema}),
                    new JuntadaListActions.GetJuntadasSuccess({
                        entitiesId: response['entities'].map(juntada => juntada.id),
                        loaded: {
                            id: 'processoHandle',
                            value: this.routerState.params.processoHandle
                        },
                        total: response['total']
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new JuntadaListActions.GetJuntadasFailed(err));
                    return caught;
                })
            );

    /**
     * Desentranhar Juntada
     * @type {Observable<any>}
     */
    @Effect({dispatch: false})
    desentranharJuntada: any =
        this._actions
            .pipe(
                ofType<JuntadaListActions.DesentranharJuntada>(JuntadaListActions.DESENTRANHAMENTO_JUNTADA),
                tap(() => {
                    this._router.navigate([this.routerState.url.replace('juntadas/listar', 'juntadas/desentranhar')]).then();
                })
            );

    /**
     * Desentranhar Juntada
     * @type {Observable<any>}
     */
    @Effect({dispatch: false})
    copiarDocumentoJuntada: any =
        this._actions
            .pipe(
                ofType<JuntadaListActions.CopiarDocumentoJuntada>(JuntadaListActions.COPIA_DOCUMENTO_JUNTADA),
                tap(() => {
                    this._router.navigate([this.routerState.url.replace('juntadas/listar', 'juntadas/copiar')]).then();
                })
            );


    /**
     * Assina Documento
     * @type {Observable<any>}
     */
    @Effect()
    assinaDocumento: any =
        this._actions
            .pipe(
                ofType<JuntadaListActions.AssinaDocumento>(JuntadaListActions.ASSINA_DOCUMENTO_JUNTADA),
                mergeMap((action) => {
                        return this._documentoService.preparaAssinatura(JSON.stringify([action.payload]))
                            .pipe(
                                map((response) => {
                                    return new JuntadaListActions.AssinaDocumentoSuccess(response);
                                }),
                                catchError((err, caught) => {
                                    console.log(err);
                                    this._store.dispatch(new JuntadaListActions.AssinaDocumentoFailed(err));
                                    return caught;
                                })
                            );
                    }
                ));

    /**
     * Assina Documento Success
     * @type {Observable<any>}
     */
    @Effect({dispatch: false})
    assinaDocumentoSuccess: any =
        this._actions
            .pipe(
                ofType<JuntadaListActions.AssinaDocumentoSuccess>(JuntadaListActions.ASSINA_DOCUMENTO_JUNTADA_SUCCESS),
                tap((action) => {

                    const url = environment.jnlp + 'v1/administrativo/assinatura/' + action.payload.secret + '/get_jnlp';

                    const ifrm = document.createElement('iframe');
                    ifrm.setAttribute('src', url);
                    ifrm.style.width = '0';
                    ifrm.style.height = '0';
                    ifrm.style.border = '0';
                    document.body.appendChild(ifrm);
                    setTimeout(() => document.body.removeChild(ifrm), 20000);
                }));

    /**
     * Save Documento Assinatura Eletronica
     * @type {Observable<any>}
     */
    @Effect()
    assinaDocumentoEletronicamente: any =
        this._actions
            .pipe(
                ofType<JuntadaListActions.AssinaDocumentoEletronicamente>(JuntadaListActions.ASSINA_DOCUMENTO_ELETRONICAMENTE),
                switchMap((action) => {
                    return this._assinaturaService.save(action.payload.assinatura, JSON.stringify({plainPassword: action.payload.plainPassword})).pipe(
                        mergeMap((response: Assinatura) => [
                            new JuntadaListActions.AssinaDocumentoEletronicamenteSuccess(response),
                            new AddData<Assinatura>({data: [response], schema: assinaturaSchema}),
                            new OperacoesActions.Resultado({
                                type: 'assinatura',
                                content: `Assinatura id ${response.id} criada com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new JuntadaListActions.AssinaDocumentoEletronicamenteFailed(err));
                        })
                    );
                })
            );

    @Effect()
    removeAssinaturaDocumento: any =
        this._actions
            .pipe(
                ofType<JuntadaListActions.RemoveAssinaturaDocumento>(JuntadaListActions.REMOVE_ASSINATURA_DOCUMENTO),
                mergeMap((action) => {
                        return this._documentoService.removeAssinatura(action.payload)
                            .pipe(
                                mergeMap((response) => [
                                    new JuntadaListActions.RemoveAssinaturaDocumentoSuccess(action.payload),
                                ]),
                                catchError((err, caught) => {
                                    console.log(err);
                                    return of(new JuntadaListActions.RemoveAssinaturaDocumentoFailed(action.payload));
                                })
                            );
                    }
                ));

    @Effect()
    removeVinculacaoDocumento: any =
        this._actions
            .pipe(
                ofType<JuntadaListActions.RemoveVinculacaoDocumento>(JuntadaListActions.REMOVE_VINCULACAO_DOCUMENTO),
                mergeMap((action) => {
                        return this._vinculacaoDocumentoService.destroy(action.payload)
                            .pipe(
                                mergeMap((response) => [
                                    new JuntadaListActions.RemoveVinculacaoDocumentoSuccess(action.payload),
                                ]),
                                catchError((err, caught) => {
                                    console.log(err);
                                    return of(new JuntadaListActions.RemoveVinculacaoDocumentoFailed(action.payload));
                                })
                            );
                    }
                ));
}
