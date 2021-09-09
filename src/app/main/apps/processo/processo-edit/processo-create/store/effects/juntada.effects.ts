import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {getRouterState, State} from 'app/store/reducers';
import {JuntadaService} from '@cdk/services/juntada.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Assinatura, Desentranhamento, Juntada} from '@cdk/models';
import {
    assinatura as assinaturaSchema,
    desentranhamento as desentranhamentoSchema,
    juntada as juntadaSchema
} from '@cdk/normalizr';
import {Router} from '@angular/router';
import {DocumentoService} from '@cdk/services/documento.service';
import {DesentranhamentoService} from '@cdk/services/desentranhamento.service';
import {AssinaturaService} from '@cdk/services/assinatura.service';
import {environment} from '../../../../../../../../environments/environment';
import * as OperacoesActions from '../../../../../../../store/actions/operacoes.actions';
import {getPagination} from '../selectors';
import * as JuntadaActions from 'app/main/apps/processo/processo-edit/processo-create/store/actions';

@Injectable()
export class JuntadaEffects {
    routerState: any;
    /**
     * Get Juntadas with router parameters
     *
     * @type {Observable<any>}
     */
    getJuntadas: any = createEffect(() => this._actions.pipe(
        ofType<JuntadaActions.GetJuntadas>(JuntadaActions.GET_JUNTADAS),
        switchMap(action => this._juntadaService.query(
            JSON.stringify({
                ...action.payload.filter,
                ...action.payload.gridFilter,
            }),
            action.payload.limit,
            action.payload.offset,
            JSON.stringify(action.payload.sort),
            JSON.stringify(action.payload.populate),
            JSON.stringify(action.payload.context))),
        mergeMap(response => [
            new AddData<Juntada>({data: response['entities'], schema: juntadaSchema}),
            new JuntadaActions.GetJuntadasSuccess({
                entitiesId: response['entities'].map(juntada => juntada.id),
                loaded: {
                    id: 'processoHandle',
                    value: this.routerState.params.processoHandle
                },
                total: response['total']
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new JuntadaActions.GetJuntadasFailed(err));
        })
    ));
    /**
     * Assina Documento
     *
     * @type {Observable<any>}
     */
    assinaDocumento: any = createEffect(() => this._actions.pipe(
        ofType<JuntadaActions.AssinaDocumento>(JuntadaActions.ASSINA_DOCUMENTO_JUNTADA),
        mergeMap(action => this._documentoService.preparaAssinatura(JSON.stringify([action.payload]))
            .pipe(
                map(response => new JuntadaActions.AssinaDocumentoSuccess(response)),
                catchError((err) => {
                    const payload = {
                        id: action.payload,
                        error: err
                    };
                    console.log(err);
                    return of(new JuntadaActions.AssinaDocumentoFailed(payload));
                })
            ), 25)
    ));
    /**
     * Assina Documento Success
     *
     * @type {Observable<any>}
     */
    assinaDocumentoSuccess: any = createEffect(() => this._actions.pipe(
        ofType<JuntadaActions.AssinaDocumentoSuccess>(JuntadaActions.ASSINA_DOCUMENTO_JUNTADA_SUCCESS),
        tap((action) => {
            if (action.payload.secret) {
                const url = environment.jnlp + 'v1/administrativo/assinatura/' + action.payload.secret + '/get_jnlp';

                const ifrm = document.createElement('iframe');
                ifrm.setAttribute('src', url);
                ifrm.style.width = '0';
                ifrm.style.height = '0';
                ifrm.style.border = '0';
                document.body.appendChild(ifrm);
                setTimeout(() => document.body.removeChild(ifrm), 20000);
            }
        })
    ), {dispatch: false});
    /**
     * Assina Documento Eletronicamente
     *
     * @type {Observable<any>}
     */
    assinaDocumentoEletronicamente: any = createEffect(() => this._actions.pipe(
        ofType<JuntadaActions.AssinaDocumentoEletronicamente>(JuntadaActions.ASSINA_DOCUMENTO_ELETRONICAMENTE),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'assinatura',
            content: 'Salvando a assinatura ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._assinaturaService.save(action.payload.assinatura).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'assinatura',
                content: 'Assinatura id ' + response.id + ' salva com sucesso.',
                status: 1, // sucesso
            }))),
            mergeMap((response: Assinatura) => [
                new JuntadaActions.AssinaDocumentoEletronicamenteSuccess(action.payload.documento.id),
                new AddData<Assinatura>({data: [response], schema: assinaturaSchema}),
                new JuntadaActions.ReloadJuntadas()
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
                    content: 'Erro ao salvar a assinatura!',
                    status: 2, // erro
                }));
                return of(new JuntadaActions.AssinaDocumentoEletronicamenteFailed(payload));
            })
        ))
    ));
    /**
     * Reload DocumentosAvulso
     */
    reloadJuntadas: any = createEffect(() => this._actions.pipe(
        ofType<JuntadaActions.ReloadJuntadas>(JuntadaActions.RELOAD_JUNTADAS),
        withLatestFrom(this._store.pipe(select(getPagination))),
        tap(([action, pagination]) => this._store.dispatch(new JuntadaActions.GetJuntadas(pagination)))
    ), {dispatch: false});
    /**
     * Save Desentranhamento
     *
     * @type {Observable<any>}
     */
    saveDesentranhamento: any = createEffect(() => this._actions.pipe(
        ofType<JuntadaActions.SaveDesentranhamento>(JuntadaActions.SAVE_DESENTRANHAMENTO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'desentranhamento',
            content: 'Salvando o desentranhamento ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._desentranhamentoService.save(action.payload.desentranhamento).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'desentranhamento',
                content: 'Desentranhamento id ' + response.id + ' salvo com sucesso.',
                status: 1, // sucesso
            }))),
            mergeMap((response: Desentranhamento) => [
                new JuntadaActions.SaveDesentranhamentoSuccess(action.payload),
                new AddData<Desentranhamento>({data: [response], schema: desentranhamentoSchema}),
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'desentranhamento',
                    content: 'Erro ao salvar o desentranhamento!',
                    status: 2, // erro
                }));
                return of(new JuntadaActions.SaveDesentranhamentoFailed(action.payload));
            })
        ))
    ));

    constructor(
        private _actions: Actions,
        private _juntadaService: JuntadaService,
        private _documentoService: DocumentoService,
        private _desentranhamentoService: DesentranhamentoService,
        private _assinaturaService: AssinaturaService,
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
