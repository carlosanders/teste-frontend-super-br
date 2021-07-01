import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';
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
import {CdkUtils} from '@cdk/utils';


@Injectable()
export class JuntadaEffects {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _juntadaService: JuntadaService,
        private _documentoService: DocumentoService,
        private _desentranhamentoService: DesentranhamentoService,
        private _assinaturaService: AssinaturaService,
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
     * Get Juntadas with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getJuntadas: any =
        this._actions
            .pipe(
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
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new JuntadaActions.GetJuntadasFailed(err));
                    return caught;
                })
            );

    /**
     * Assina Documento
     *
     * @type {Observable<any>}
     */
    @Effect()
    assinaDocumento: any =
        this._actions
            .pipe(
                ofType<JuntadaActions.AssinaDocumento>(JuntadaActions.ASSINA_DOCUMENTO_JUNTADA),
                mergeMap(action => this._documentoService.preparaAssinatura(JSON.stringify([action.payload]))
                    .pipe(
                        map(response => new JuntadaActions.AssinaDocumentoSuccess(response)),
                        catchError((err, caught) => {
                            const payload = {
                                id: action.payload,
                                error: err
                            };
                            console.log(err);
                            return of(new JuntadaActions.AssinaDocumentoFailed(payload));
                        })
                    ), 25
                ));

    /**
     * Assina Documento Success
     *
     * @type {Observable<any>}
     */
    @Effect({dispatch: false})
    assinaDocumentoSuccess: any =
        this._actions
            .pipe(
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
                }));

    /**
     * Save Documento Assinatura Eletronica
     *
     * @type {Observable<any>}
     */
    @Effect()
    assinaDocumentoEletronicamente: any =
        this._actions
            .pipe(
                ofType<JuntadaActions.AssinaDocumentoEletronicamente>(JuntadaActions.ASSINA_DOCUMENTO_ELETRONICAMENTE),
                switchMap(action => this._assinaturaService.save(action.payload.assinatura).pipe(
                    mergeMap((response: Assinatura) => [
                        new JuntadaActions.AssinaDocumentoEletronicamenteSuccess(action.payload.documento.id),
                        new AddData<Assinatura>({data: [response], schema: assinaturaSchema}),
                        new OperacoesActions.Resultado({
                            type: 'assinatura',
                            content: `Assinatura id ${response.id} criada com sucesso!`,
                            dateTime: response.criadoEm
                        }),
                        new JuntadaActions.ReloadJuntadas()
                    ]),
                    catchError((err) => {
                        const payload = {
                            documentoId: action.payload.documento.id,
                            error: err
                        };
                        console.log(err);
                        return of(new JuntadaActions.AssinaDocumentoEletronicamenteFailed(payload));
                    })
                ))
            );

    /**
     * Reload DocumentosAvulso
     */
    @Effect({dispatch: false})
    reloadJuntadas: Observable<any> =
        this._actions
            .pipe(
                ofType<JuntadaActions.ReloadJuntadas>(JuntadaActions.RELOAD_JUNTADAS),
                withLatestFrom(this._store.pipe(select(getPagination))),
                tap(([action, pagination]) => this._store.dispatch(new JuntadaActions.GetJuntadas(pagination)))
            );

    /**
     * Save Desentranhamento
     *
     * @type {Observable<any>}
     */
    @Effect()
    saveDesentranhamento: any =
        this._actions
            .pipe(
                ofType<JuntadaActions.SaveDesentranhamento>(JuntadaActions.SAVE_DESENTRANHAMENTO),
                switchMap(action => this._desentranhamentoService.save(action.payload).pipe(
                    mergeMap((response: Desentranhamento) => [
                        new JuntadaActions.SaveDesentranhamentoSuccess(action.payload),
                        new AddData<Desentranhamento>({data: [response], schema: desentranhamentoSchema}),
                        new OperacoesActions.Resultado({
                            type: 'desentranhamento',
                            content: `Juntada id ${action.payload.juntada.id} desentranhada com sucesso!`,
                            dateTime: response.criadoEm
                        })
                    ]),
                    catchError((err) => {
                        const payload = {
                            id: action.payload.juntada.id,
                            error: err
                        };
                        const serializedMessage = CdkUtils.errorsToString(err);
                        this._store.dispatch(new OperacoesActions.Resultado({
                            type: 'desentranhamento',
                            content: 'Erro no desentranhamento da juntada id ' + action.payload.juntada.id + ': ' +
                                serializedMessage
                        }));
                        console.log(err);
                        return of(new JuntadaActions.SaveDesentranhamentoFailed(payload))
                    })
                ))
            );
}