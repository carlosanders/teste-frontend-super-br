import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, concatMap, filter, switchMap, tap, withLatestFrom} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as JuntadasActions from '../actions/juntadas.actions';
import * as ProcessoViewActions from 'app/main/apps/processo/processo-view/store/actions/processo-view.actions';

import {AddData} from '@cdk/ngrx-normalizr';
import {Juntada} from '@cdk/models';
import {juntada as juntadaSchema} from '@cdk/normalizr';
import {JuntadaService} from '@cdk/services/juntada.service';
import {ActivatedRoute, Router} from '@angular/router';
import {getIndex} from '../../../processo/processo-view/store';

@Injectable()
export class JuntadasEffects {
    routerState: any;
    index: any;
    /**
     * Get Juntada
     *
     * @type {Observable<any>}
     */
    getJuntada: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<JuntadasActions.GetJuntada>(JuntadasActions.GET_JUNTADA),
        withLatestFrom(this._store.pipe(select(getIndex))),
        switchMap(([action, index]) => {
            const chaveAcesso = this.routerState.params.chaveAcessoHandle ? {
                chaveAcesso: this.routerState.params.chaveAcessoHandle
            } : {};
            const populate = [
                'volume',
                'documento',
                'documento.origemDados',
                'documento.juntadaAtual',
                'documento.tipoDocumento',
                'documento.componentesDigitais',
                'documento.vinculacoesDocumentos',
                'documento.vinculacoesDocumentos.documentoVinculado',
                'documento.vinculacoesDocumentos.documentoVinculado.tipoDocumento',
                'documento.vinculacoesDocumentos.documentoVinculado.componentesDigitais',
                'documento.vinculacoesEtiquetas',
                'documento.vinculacoesEtiquetas.etiqueta',
                'documento.criadoPor',
                'documento.setorOrigem',
                'documento.setorOrigem.unidade'
            ];
            return this._juntadaService.get(
                action.payload,
                JSON.stringify(populate),
                JSON.stringify(chaveAcesso)
            ).pipe(
                tap((response) => {
                    this.index = index;
                    const currentJuntadaIndex = index.findIndex(juntadaId => response.id === juntadaId);
                    if (currentJuntadaIndex !== -1) {
                        let novoIndex;
                        if (!response.ativo) {
                            novoIndex = [];
                        }
                        let componentesDigitaisIds = [];
                        if (response.documento.componentesDigitais) {
                            componentesDigitaisIds = response.documento.componentesDigitais.map(
                                cd => cd.id
                            );
                        }
                        if (response.documento.vinculacoesDocumentos) {
                            response.documento.vinculacoesDocumentos.map(
                                (vinculacaoDocumento) => {
                                    vinculacaoDocumento.documentoVinculado.componentesDigitais.map(
                                        cd => componentesDigitaisIds.push(cd.id)
                                    );
                                }
                            );
                        }
                        novoIndex = componentesDigitaisIds;
                        this.index[currentJuntadaIndex] = novoIndex;
                    }
                }),
                concatMap(response => [
                    new AddData<Juntada>({data: [response], schema: juntadaSchema}),
                    new JuntadasActions.GetJuntadaSuccess(response),
                    new ProcessoViewActions.UpdateIndex(this.index)
                ]),
                catchError((err) => {
                    console.log(err);
                    return of(new JuntadasActions.GetJuntadaFailed(err));
                })
            );
        })
    ));

    constructor(
        private _actions: Actions,
        private _juntadaService: JuntadaService,
        private _store: Store<State>,
        private _router: Router,
        private _activatedRoute: ActivatedRoute
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }

}
