import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';

import * as fromStore from '../';
import * as EspecieDocumentoAvulsoListActions
    from '../../../especie-documento-avulso-list/store/actions/especie-documento-avulso-list.actions';

import {EspecieDocumentoAvulsoService} from '@cdk/services/especie-documento-avulso.service';
import {ColaboradorService} from '@cdk/services/colaborador.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {especieDocumentoAvulso as especieDocumentoAvulsoSchema} from '@cdk/normalizr';
import {EspecieDocumentoAvulso} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class EspecieDocumentoAvulsoEditEffects {
    routerState: any;

    getEspecieDocumentoAvulso: any = createEffect(() => this._actions.pipe(
        ofType<fromStore.GetEspecieDocumentoAvulso>(fromStore.GET_ESPECIE_DOCUMENTO_AVULSO),
        switchMap(action => this._especieDocumentoAvulsoService.query(
            JSON.stringify(action.payload),
            1,
            0,
            JSON.stringify({}),
            JSON.stringify([
                'populateAll'
            ]),
            JSON.stringify({isAdmin: true}))),
        switchMap(response => [
            new AddData<EspecieDocumentoAvulso>({data: response['entities'], schema: especieDocumentoAvulsoSchema}),
            new fromStore.GetEspecieDocumentoAvulsoSuccess({
                loaded: {
                    id: 'especieDocumentoAvulsoHandle',
                    value: this.routerState.params['especieDocumentoAvulsoHandle']
                },
                entityId: response['entities'][0].id
            })
        ]),
        catchError((err) => {
            return of(new fromStore.GetEspecieDocumentoAvulsoFailed(err));
        })
    ));
    
    saveEspecieDocumentoAvulso: any = createEffect(() => this._actions.pipe(
        ofType<fromStore.SaveEspecieDocumentoAvulso>(fromStore.SAVE_ESPECIE_DOCUMENTO_AVULSO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'espécie documento avulso',
            content: 'Salvando a espécie documento avulso ...',
            status: 0, // carregando
        }))),
        withLatestFrom(this._store.pipe(
            select(fromStore.getEspecieDocumentoAvulso)
        )),
        switchMap(([action, especieDocumentoAvulso]) => {
            const context = JSON.stringify({isAdmin: true});
            const populate = JSON.stringify(['populateAll']);
            return this._especieDocumentoAvulsoService.save(action.payload.especieDocumentoAvulso, context, populate).pipe(
                tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'espécie documento avulso',
                    content: 'Espécie documento avulso id ' + response.id + ' salvo com sucesso.',
                    status: 1, // sucesso
                }))),
                mergeMap((response: EspecieDocumentoAvulso) => {
                    if (response.id) {
                        this._store.dispatch(new UpdateData<EspecieDocumentoAvulso>({
                            id: action.payload.especieDocumentoAvulso.id,
                            schema: especieDocumentoAvulsoSchema,
                            changes: {
                                especieProcesso: undefined,
                                especieTarefa: undefined,
                                workflow: undefined,
                            }
                        }));
                    }

                    return [
                        new fromStore.SaveEspecieDocumentoAvulsoSuccess(response),
                        new EspecieDocumentoAvulsoListActions.ReloadEspecieDocumentoAvulso(),
                        new AddData<EspecieDocumentoAvulso>({data: [response], schema: especieDocumentoAvulsoSchema})
                    ];
                }),
                catchError((err) => {
                    console.log(err);
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'espécie documento avulso',
                        content: 'Erro ao salvar a espécie documento avulso!',
                        status: 2, // erro
                    }));
                    return of(new fromStore.SaveEspecieDocumentoAvulsoFailed(err));
                })
            );
        })
    ));

    updateEspecieDocumentoAvulso: any = createEffect(() => this._actions.pipe(
        ofType<fromStore.UpdateEspecieDocumentoAvulso>(fromStore.UPDATE_ESPECIE_DOCUMENTO_AVULSO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'espécie documento avulso',
            content: 'Alterando a espécie documento avulso ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._especieDocumentoAvulsoService.patch(action.payload.especieDocumentoAvulso, action.payload.changes).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'espécie documento avulso',
                content: 'Espécie documento avulso id ' + response.id + ' alterada com sucesso.',
                status: 1, // sucesso
            }))),
            mergeMap((response: EspecieDocumentoAvulso) => [
                new EspecieDocumentoAvulsoListActions.ReloadEspecieDocumentoAvulso(),
                new AddData<EspecieDocumentoAvulso>({data: [response], schema: especieDocumentoAvulsoSchema}),
                new fromStore.UpdateEspecieDocumentoAvulsoSuccess(response)
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'espécie documento avulso',
                    content: 'Erro ao alterar a espécie documento avulso!',
                    status: 2, // erro
                }));
                return of(new fromStore.UpdateEspecieDocumentoAvulsoFailed(err));
            })
        ))
    ));

    saveEspecieDocumentoAvulsoSuccess: any = createEffect(() => this._actions.pipe(
        ofType<fromStore.SaveEspecieDocumentoAvulsoSuccess>(fromStore.SAVE_ESPECIE_DOCUMENTO_AVULSO_SUCCESS),
        tap(() => {
            this._router.navigate(['apps/admin/especie-documento-avulso/listar']).then();
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _especieDocumentoAvulsoService: EspecieDocumentoAvulsoService,
        private _colaboradorService: ColaboradorService,
        private _store: Store<State>,
        private _loginService: LoginService,
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
