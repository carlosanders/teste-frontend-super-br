import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, tap} from 'rxjs/operators';
import {getRouterState, State} from 'app/store/reducers';
import * as AssinaturaActions from '../actions/assinatura.actions';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {Assinatura, Documento} from '@cdk/models';
import {assinatura as assinaturaSchema, documento as documentoSchema} from '@cdk/normalizr';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {AssinaturaService} from '@cdk/services/assinatura.service';
import {DocumentoService} from '@cdk/services/documento.service';

@Injectable()
export class AssinaturaEffects {
    routerState: any;

    /**
     * Assina Documento
     *
     * @type {Observable<any>}
     */
    assinaDocumento: any = createEffect(() => this._actions.pipe(
        ofType<AssinaturaActions.AssinaDocumento>(AssinaturaActions.ASSINA_DOCUMENTO),
        mergeMap(action => this._documentoService.preparaAssinatura(JSON.stringify(action.payload))
            .pipe(
                map(response => new AssinaturaActions.PreparaAssinaturaSuccess(response)),
                catchError((err) => {
                    const payload = {
                        ids: action.payload,
                        error: err
                    };
                    console.log(err);
                    return of(new AssinaturaActions.PreparaAssinaturaFailed(payload));
                })
            )
        )
    ));

    /**
     * Assina Documento Eletronicamente
     *
     * @type {Observable<any>}
     */
     assinaDocumentoEletronicamente: any = createEffect(() => this._actions.pipe(
        ofType<AssinaturaActions.AssinaDocumentoEletronicamente>(AssinaturaActions.ASSINA_DOCUMENTO_ELETRONICAMENTE),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'assinatura',
            content: 'Assinando documento id ' + action.payload.documento.id + ' ...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._assinaturaService.save(action.payload.assinatura).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'assinatura',
                content: 'Assinatura id ' + response.id + ' criada com sucesso.',
                status: 1, // sucesso
                lote: action.payload.loteId
            }))),
            mergeMap((response: Assinatura) => [
                new AssinaturaActions.AssinaDocumentoEletronicamenteSuccess(action.payload.documento.id),
                new AddData<Assinatura>({data: [response], schema: assinaturaSchema}),
                new UpdateData<Documento>({
                    id: action.payload.documento.id,
                    schema: documentoSchema,
                    changes: {assinado: true}
                })
            ]),
            catchError((err) => {
                const payload = {
                    documentoId: action.payload.documento.id,
                    error: err
                };
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'assinatura',
                    content: 'Ocorreu um erro na assinatura do documento id ' + action.payload.documento.id + '.',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                return of(new AssinaturaActions.AssinaDocumentoEletronicamenteFailed(payload));
            })
        ))
    ));

    revalidaLoginGovBr: any = createEffect(() => this._actions.pipe(
        ofType<AssinaturaActions.RevalidaLoginGovBR>(AssinaturaActions.REVALIDA_LOGIN_GOVBR),
        mergeMap(action => {

            return this._assinaturaService.getTokenRevalidaLoginGovBr(action.payload.code, action.payload.state).pipe(
            map((data: any) => {
                if(window.opener){
                    localStorage.setItem('tokenRevalidaGovBr', data.jwt);
                    window.opener.postMessage('closeRevalidaGovBrSuccess','*');
                    window.close();
                }
                return new AssinaturaActions.AssinaDocumentoEletronicamenteGovBrSuccess(data);
            }),
            catchError((err) => {
                const payload = {
                    error: err
                };
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'assinatura',
                    content: 'Ocorreu um erro na assinatura do documento via govBr id ' + action.payload.documento.id + '.',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                return of(new AssinaturaActions.AssinaDocumentoEletronicamenteFailed(payload));
            })
        )})
    ));

    /**
     * Remover Assinatura Documento
     *
     * @type {Observable<any>}
     */
    removeAssinaturaDocumento: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<AssinaturaActions.RemoveAssinaturaDocumento>(AssinaturaActions.REMOVE_ASSINATURA_DOCUMENTO),
        mergeMap(action => this._documentoService.removeAssinatura(action.payload).pipe(
            mergeMap(() => [
                new AssinaturaActions.RemoveAssinaturaDocumentoSuccess(action.payload),
                new UpdateData<Documento>({
                    id: action.payload,
                    schema: documentoSchema,
                    changes: {assinado: false}
                })
            ]),
            catchError((err) => {
                console.log(err);
                return of(new AssinaturaActions.RemoveAssinaturaDocumentoFailed(action.payload));
            })
        ), 25)
    ));

    constructor(
        private _actions: Actions,
        private _documentoService: DocumentoService,
        private _assinaturaService: AssinaturaService,
        private _store: Store<State>
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }
}
