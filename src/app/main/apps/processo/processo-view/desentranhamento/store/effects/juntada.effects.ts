import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as ProcessoViewDesentranhamentoActions from '../actions';

import {JuntadaService} from '@cdk/services/juntada.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {Juntada, Desentranhamento} from '@cdk/models';
import {
    juntada as juntadaSchema,
    desentranhamento as desentranhamentoSchema
} from '@cdk/normalizr';
import {Router} from '@angular/router';
import {DesentranhamentoService} from '@cdk/services/desentranhamento.service';

@Injectable()
export class JuntadaEffects {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _juntadaService: JuntadaService,
        private _desentranhamentoService: DesentranhamentoService,
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

    /**
     * Get Juntada with router parameters
     *
     * @type {Observable<any>}
     */
    getJuntada: any = createEffect(() => {
        return this._actions
            .pipe(
                ofType<ProcessoViewDesentranhamentoActions.GetJuntada>(ProcessoViewDesentranhamentoActions.GET_JUNTADA),
                mergeMap(action => this._juntadaService.get(
                    action.payload.id,
                    JSON.stringify([
                        'volume',
                        'volume.processo',
                        'documento',
                        'documento.componentesDigitais',
                        'documento.vinculacoesDocumentos',
                        'documento.tipoDocumento',
                        'documento.vinculacaoDocumentoPrincipal'
                    ])
                ).pipe(
                    mergeMap(response => [
                        new AddData<Juntada>({data: [response], schema: juntadaSchema}),
                        new ProcessoViewDesentranhamentoActions.GetJuntadaSuccess({
                            juntadaId: response.id,
                            loaded: {
                                id: 'juntadaHandle',
                                value: this.routerState.params.juntadaHandle
                            }
                        })
                    ]),
                    catchError((err, caught) => {
                        console.log(err);
                        this._store.dispatch(new ProcessoViewDesentranhamentoActions.GetJuntadaFailed(err));
                        return caught;
                    })
                ))
            );
    });

    /**
     * Save Desentranhamento
     *
     * @type {Observable<any>}
     */
    saveDesentranhamento: any = createEffect(() => {
        return this._actions
            .pipe(
                ofType<ProcessoViewDesentranhamentoActions.SaveDesentranhamento>(ProcessoViewDesentranhamentoActions.SAVE_DESENTRANHAMENTO),
                switchMap(action => {
                    return this._desentranhamentoService.save(action.payload.desentranhamento).pipe(
                        mergeMap((response: Desentranhamento) => [
                            new ProcessoViewDesentranhamentoActions.SaveDesentranhamentoSuccess(),
                            new AddData<Desentranhamento>({data: [response], schema: desentranhamentoSchema}),
                            new UpdateData<Juntada>({
                                id: action.payload.desentranhamento.juntada.id,
                                schema: juntadaSchema,
                                changes: {ativo: false}
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new ProcessoViewDesentranhamentoActions.SaveDesentranhamentoFailed(err));
                        })
                    )
                })
            );
    });

    /**
     * Save Desentranhamento Success
     */
    saveDesentranhamentoSuccess: any = createEffect(() => this._actions
            .pipe(
                ofType<ProcessoViewDesentranhamentoActions.SaveDesentranhamentoSuccess>(ProcessoViewDesentranhamentoActions.SAVE_DESENTRANHAMENTO_SUCCESS),
                tap(() => {
                    this._router.navigate([this.routerState.url.replace(('desentranhar/' + this.routerState.params.juntadaHandle), '')]).then();
                })
            ),
        {dispatch: false}
    );
}
