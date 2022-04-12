import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, withLatestFrom} from 'rxjs/operators';
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
        switchMap(([, documento]) => {
            const tarefaId = this.routerState.params['tarefaHandle'] ?? documento.tarefaOrigem.id;
            const params = {
                filter: {
                    'tarefaOrigem.id': 'eq:' + tarefaId,
                    'documentoAvulsoRemessa.id': 'isNull',
                    'juntadaAtual': 'isNull'
                },
                limit: 10,
                offset: 0,
                sort: {
                    criadoEm: 'DESC'
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
                JSON.stringify(params.populate));
        }),
        mergeMap(response => [
            new AddData<Documento>({data: response['entities'], schema: documentoSchema}),
            new DocumentosActionsAll.GetDocumentosSuccess({
                loaded: {
                    id: this.routerState.params['tarefaHandle'] ? 'tarefaHandle' : 'documentoHandle',
                    value: this.routerState.params['tarefaHandle'] ?? this.routerState.params['documentoHandle']
                },
                entitiesId: response['entities'].map(documento => documento.id),
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new DocumentosActionsAll.GetDocumentosFailed(err));
        })
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
