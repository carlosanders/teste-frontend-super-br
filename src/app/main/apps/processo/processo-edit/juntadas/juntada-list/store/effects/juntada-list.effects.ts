import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';
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
import {getPagination} from '../selectors';

@Injectable()
export class JuntadaListEffect {
    routerState: any;
    /**
     * Get Juntadas with router parameters
     *
     * @type {Observable<any>}
     */
    getJuntadas: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<JuntadaListActions.GetJuntadas>(JuntadaListActions.GET_JUNTADAS),
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
            new JuntadaListActions.GetJuntadasSuccess({
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
            return of(new JuntadaListActions.GetJuntadasFailed(err));
        })
    ));
    /**
     * Copiar Documento Juntada
     *
     * @type {Observable<any>}
     */
    copiarDocumentoJuntada: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<JuntadaListActions.CopiarDocumentoJuntada>(JuntadaListActions.COPIA_DOCUMENTO_JUNTADA),
        tap(() => {
            this._router.navigate([this.routerState.url.replace('juntadas/listar', 'juntadas/copiar')]).then();
        })
    ), {dispatch: false});
    /**
     * Assina Documento
     *
     * @type {Observable<any>}
     */
    assinaDocumento: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<JuntadaListActions.AssinaDocumento>(JuntadaListActions.ASSINA_DOCUMENTO_JUNTADA),
        mergeMap(action => this._documentoService.preparaAssinatura(JSON.stringify([action.payload]))
            .pipe(
                map(response => new JuntadaListActions.AssinaDocumentoSuccess(response)),
                catchError((err) => {
                    const payload = {
                        id: action.payload,
                        error: err
                    };
                    console.log(err);
                    return of(new JuntadaListActions.AssinaDocumentoFailed(payload));
                })
            ), 25)
    ));

    /**
     * Save Documento Assinatura Eletronica
     *
     * @type {Observable<any>}
     */
    assinaDocumentoEletronicamente: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<JuntadaListActions.AssinaDocumentoEletronicamente>(JuntadaListActions.ASSINA_DOCUMENTO_ELETRONICAMENTE),
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
                new JuntadaListActions.AssinaDocumentoEletronicamenteSuccess(action.payload.documento.id),
                new JuntadaListActions.ReloadJuntadas(),
                new AddData<Assinatura>({data: [response], schema: assinaturaSchema})
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
                return of(new JuntadaListActions.AssinaDocumentoEletronicamenteFailed(payload));
            })
        ))
    ));
    removeVinculacaoDocumento: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<JuntadaListActions.RemoveVinculacaoDocumento>(JuntadaListActions.REMOVE_VINCULACAO_DOCUMENTO),
        mergeMap(action => this._vinculacaoDocumentoService.destroy(action.payload)
            .pipe(
                mergeMap(() => [
                    new JuntadaListActions.RemoveVinculacaoDocumentoSuccess(action.payload),
                    new JuntadaListActions.ReloadJuntadas()
                ]),
                catchError((err) => {
                    console.log(err);
                    return of(new JuntadaListActions.RemoveVinculacaoDocumentoFailed(action.payload));
                })
            )
        )
    ));
    /**
     * Reload DocumentosAvulso
     */
    reloadJuntadas: any = createEffect(() => this._actions.pipe(
        ofType<JuntadaListActions.ReloadJuntadas>(JuntadaListActions.RELOAD_JUNTADAS),
        withLatestFrom(this._store.pipe(select(getPagination))),
        tap(([action, pagination]) => this._store.dispatch(new JuntadaListActions.GetJuntadas(pagination)))
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _juntadaService: JuntadaService,
        private _documentoService: DocumentoService,
        private _assinaturaService: AssinaturaService,
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
