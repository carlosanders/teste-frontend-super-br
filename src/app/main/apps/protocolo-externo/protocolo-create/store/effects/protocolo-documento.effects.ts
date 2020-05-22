import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap, tap} from 'rxjs/operators';


import {AddData} from '@cdk/ngrx-normalizr';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {Assinatura, Documento} from '@cdk/models';
import {DocumentoService} from '@cdk/services/documento.service';
import {DocumentoAvulsoService} from '@cdk/services/documento-avulso.service';
import {documento as documentoSchema} from '@cdk/normalizr/documento.schema';
import * as ProtocoloDocumentoActions from '../actions';
import {Router} from '@angular/router';
import {getDocumentos} from '../selectors';
import {AssinaturaService} from '@cdk/services/assinatura.service';
import {environment} from '../../../../../../../environments/environment';
import {assinatura as assinaturaSchema} from '@cdk/normalizr/assinatura.schema';
import * as OperacoesActions from '../../../../../../store/actions/operacoes.actions';

@Injectable()
export class ProtocoloDocumentoEffects {
    routerState: any;
    documentos: Documento[];

    constructor(
        private _actions: Actions,
        private _documentoService: DocumentoService,
        private _assinaturaService: AssinaturaService,
        private _documentoAvulsoService: DocumentoAvulsoService,
        private _router: Router,
        private _store: Store<State>
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });

        this._store
            .pipe(select(getDocumentos))
            .subscribe(documentos => {
                this.documentos = documentos;
            });
    }

    /**
     * Get Documentos with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getDocumentos: any =
        this._actions
            .pipe(
                ofType<ProtocoloDocumentoActions.GetDocumentos>(ProtocoloDocumentoActions.GET_DOCUMENTOS),
                switchMap((action) => {
                    return this._documentoService.query(
                        JSON.stringify(action.payload),
                        100,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll'
                        ]));
                }),
                mergeMap(response => [
                    new AddData<Documento>({data: response['entities'], schema: documentoSchema}),
                    new ProtocoloDocumentoActions.GetDocumentosSuccess({
                        loaded: {
                            id: 'documentoAvulsoHandle',
                            value: this.routerState.params.documentoAvulsoHandle
                        },
                        entitiesId: response['entities'].map(documento => documento.id),
                    }),
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new ProtocoloDocumentoActions.GetDocumentosFailed(err));
                    return caught;
                })
            );

    /**
     * Clicked Documento
     * @type {Observable<any>}
     */
    @Effect({dispatch: false})
    clickedDocumento: any =
        this._actions
            .pipe(
                ofType<ProtocoloDocumentoActions.ClickedDocumento>(ProtocoloDocumentoActions.CLICKED_DOCUMENTO),
                tap((action) => {
                    this._router.navigate([this.routerState.url.replace(`detalhe/${this.routerState.params.documentoAvulsoHandle}/reponder/${this.routerState.params.chaveAcessoHandle}`, 'documento/')
                    + action.payload.componentesDigitais[0].id + '/visualizar/' + this.routerState.params.chaveAcessoHandle]);
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
                ofType<ProtocoloDocumentoActions.AssinaDocumento>(ProtocoloDocumentoActions.ASSINA_DOCUMENTO),
                mergeMap((action) => {
                        return this._documentoService.preparaAssinatura(JSON.stringify([action.payload]))
                            .pipe(
                                map((response) => {
                                    return new ProtocoloDocumentoActions.AssinaDocumentoSuccess(response);
                                }),
                                catchError((err, caught) => {
                                    console.log(err);
                                    this._store.dispatch(new ProtocoloDocumentoActions.AssinaDocumentoFailed(err));
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
                ofType<ProtocoloDocumentoActions.AssinaDocumentoSuccess>(ProtocoloDocumentoActions.ASSINA_DOCUMENTO_SUCCESS),
                tap((action) => {

                    const url = environment.jnlp + 'v1/assinatura/' + action.payload.jwt + '/get_jnlp';

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
                ofType<ProtocoloDocumentoActions.AssinaDocumentoEletronicamente>(ProtocoloDocumentoActions.ASSINA_DOCUMENTO_ELETRONICAMENTE),
                switchMap((action) => {
                    return this._assinaturaService.save(action.payload.assinatura, JSON.stringify({password: action.payload.password})).pipe(
                        mergeMap((response: Assinatura) => [
                            new ProtocoloDocumentoActions.AssinaDocumentoEletronicamenteSuccess(response),
                            new AddData<Assinatura>({data: [response], schema: assinaturaSchema}),
                            new OperacoesActions.Resultado({
                                type: 'assinatura',
                                content: `Assinatura id ${response.id} criada com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new ProtocoloDocumentoActions.AssinaDocumentoEletronicamenteFailed(err));
                        })
                    );
                })
            );
}
