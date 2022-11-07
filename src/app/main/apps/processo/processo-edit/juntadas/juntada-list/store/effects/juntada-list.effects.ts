import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {getRouterState, State} from 'app/store/reducers';
import * as JuntadaListActions from 'app/main/apps/processo/processo-edit/juntadas/juntada-list/store/actions';
import {JuntadaService} from '@cdk/services/juntada.service';
import {AddData, RemoveChildData} from '@cdk/ngrx-normalizr';
import {Documento, Juntada} from '@cdk/models';
import {documento as documentoSchema, juntada as juntadaSchema, vinculacaoDocumento as vinculacaoDocumentoSchema} from '@cdk/normalizr';
import {Router} from '@angular/router';
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
    removeVinculacaoDocumento: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<JuntadaListActions.RemoveVinculacaoDocumento>(JuntadaListActions.REMOVE_VINCULACAO_DOCUMENTO),
        mergeMap(action => this._vinculacaoDocumentoService.destroy(action.payload.id)
            .pipe(
                mergeMap(() => [
                    new RemoveChildData({
                        id: action.payload.id,
                        childSchema: vinculacaoDocumentoSchema,
                        parentSchema: documentoSchema,
                        parentId: action.payload.documento.id,
                    }),
                    new JuntadaListActions.RemoveVinculacaoDocumentoSuccess(action.payload.id),
                    new JuntadaListActions.ReloadJuntadas()
                ]),
                catchError((err) => {
                    console.log(err);
                    return of(new JuntadaListActions.RemoveVinculacaoDocumentoFailed(action.payload));
                })
            )
        )
    ));
    removeRestricoesDocumento: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<JuntadaListActions.RemoveRestricoesDocumento>(JuntadaListActions.REMOVE_RESTRICOES_DOCUMENTO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'juntada',
            content: 'Removendo restrições de juntada ...',
            status: 0, // carregando
        }))),
        mergeMap(action => this._documentoService.deleteVisibilidades(action.payload.documentoId)
            .pipe(
                mergeMap((response: Documento) => [
                    new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'juntada',
                        content: 'Restrições de juntada de documento id ' + action.payload.documentoId + ' removidas com sucesso.',
                        status: 1, // sucesso
                    }),
                    new JuntadaListActions.RemoveRestricoesDocumentoSuccess(action.payload.documentoId)
                ]),
                catchError((err) => {
                    const payload = {
                        documentoId: action.payload.documentoId,
                        error: err
                    };
                    console.log(err);
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'juntada',
                        content: 'Erro ao remover restrições de juntada!',
                        status: 2, // erro
                    }));
                    return of(new JuntadaListActions.RemoveRestricoesDocumentoFailed(payload));
                })
            )
        )
    ));

    /**
     * Reload Juntadas
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
