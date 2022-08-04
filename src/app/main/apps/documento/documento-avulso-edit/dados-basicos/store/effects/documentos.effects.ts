import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, tap, withLatestFrom} from 'rxjs/operators';
import {AddData} from '@cdk/ngrx-normalizr';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {Documento} from '@cdk/models';
import {DocumentoService} from '@cdk/services/documento.service';
import {
    documento as documentoSchema
} from '@cdk/normalizr';
import {Router} from '@angular/router';
import * as DocumentosActionsAll from '../actions/documentos.actions';
import {getDocumento} from '../../../../store';
import * as fromStore from '../../store';

@Injectable()
export class DocumentosEffects {
    routerState: any;
    /**
     * Get Documentos with router parameters
     *
     * @type {Observable<any>}
     */
    getDocumentos: any = createEffect(() => this._actions.pipe(
        ofType<DocumentosActionsAll.GetDocumentos>(DocumentosActionsAll.GET_DOCUMENTOS),
        withLatestFrom(this._store.pipe(select(getDocumento))),
        mergeMap(([action, documento]) => {
            const params = {
                filter: {
                    'documentoAvulsoRemessa.id': 'eq:' + documento.documentoAvulsoRemessa.id,
                    'juntadaAtual': 'isNull'
                },
                limit: action.payload.limit,
                offset: action.payload.offset,
                sort: {
                    criadoEm: 'ASC'
                },
                populate: [
                    'tipoDocumento',
                ]
            };

            return this._documentoService.query(
                JSON.stringify({
                    ...params.filter
                }),
                params.limit,
                params.offset,
                JSON.stringify(params.sort),
                JSON.stringify(params.populate)
            ).pipe(
                mergeMap(response => [
                    new AddData<Documento>({data: response['entities'], schema: documentoSchema}),
                    new DocumentosActionsAll.GetDocumentosSuccess({
                        loaded: {
                            id: this.routerState.params['tarefaHandle'] ? 'tarefaHandle' : 'documentoHandle',
                            value: this.routerState.params['tarefaHandle'] ?? this.routerState.params['documentoHandle']
                        },
                        entitiesId: response['entities'].map(documento => documento.id),
                        total: response['total']
                    })
                ]),
                catchError((err) => {
                    console.log(err);
                    return of(new DocumentosActionsAll.GetDocumentosFailed(err));
                })
            );
        }),
    ));
    getDocumentosSuccess: any = createEffect(() => this._actions.pipe(
        ofType<DocumentosActionsAll.GetDocumentosSuccess>(DocumentosActionsAll.GET_DOCUMENTOS_SUCCESS),
        withLatestFrom(this._store.select(fromStore.getDocumentosPagination), this._store.select(fromStore.getDocumentosIds)),
        tap(([action, pagination, documentosIds]) => {
            if (action.payload.total > documentosIds.length) {
                this._store.dispatch(new DocumentosActionsAll.GetDocumentos({
                    limit: pagination.limit,
                    offset: pagination.offset + pagination.limit
                }));
            }
        })
    ), {dispatch: false});
    /**
     * Update Documento
     *
     * @type {Observable<any>}
     */
    updateDocumento: any = createEffect(() => this._actions.pipe(
        ofType<DocumentosActionsAll.UpdateDocumento>(DocumentosActionsAll.UPDATE_DOCUMENTO),
        mergeMap((action) => {
            const populate = JSON.stringify([
                'tipoDocumento',
                'atualizadoPor'
            ]);
            return this._documentoService.patch(action.payload.documento, {tipoDocumento: action.payload.tipoDocumento.id}, populate).pipe(
                mergeMap((response: Documento) => [
                    new DocumentosActionsAll.UpdateDocumentoSuccess(response.id),
                    new AddData<Documento>({data: [response], schema: documentoSchema}),
                ]),
                catchError((err) => {
                    console.log(err);
                    return of(new DocumentosActionsAll.UpdateDocumentoFailed(err));
                })
            );
        }, 25)
    ));

    constructor(
        private _actions: Actions,
        private _documentoService: DocumentoService,
        private _router: Router,
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
