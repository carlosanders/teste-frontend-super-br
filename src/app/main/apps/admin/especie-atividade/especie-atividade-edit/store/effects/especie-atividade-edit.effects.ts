import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as EspecieAtividadeEditActions from '../actions/especie-atividade-edit.actions';
import * as EspecieAtividadeListActions
    from '../../../especie-atividade-list/store/actions/especie-atividade-list.actions';

import {EspecieAtividadeService} from '@cdk/services/especie-atividade.service';
import {ColaboradorService} from '@cdk/services/colaborador.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {especieAtividade as especieAtividadeSchema} from '@cdk/normalizr';
import {EspecieAtividade} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class EspecieAtividadeEditEffects {
    routerState: any;
    /**
     * Get EspecieAtividade with router parameters
     *
     * @type {Observable<any>}
     */
    getEspecieAtividade: any = createEffect(() => this._actions.pipe(
        ofType<EspecieAtividadeEditActions.GetEspecieAtividade>(EspecieAtividadeEditActions.GET_ESPECIE_ATIVIDADE),
        switchMap(action => this._especieAtividadeService.query(
            JSON.stringify(action.payload),
            1,
            0,
            JSON.stringify({}),
            JSON.stringify([
                'populateAll'
            ]),
            JSON.stringify({isAdmin: true}))),
        switchMap(response => [
            new AddData<EspecieAtividade>({data: response['entities'], schema: especieAtividadeSchema}),
            new EspecieAtividadeEditActions.GetEspecieAtividadeSuccess({
                loaded: {
                    id: 'especieAtividadeHandle',
                    value: this.routerState.params.especieAtividadeHandle
                },
                entityId: response['entities'][0].id
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new EspecieAtividadeEditActions.GetEspecieAtividadeFailed(err));
        })
    ));
    /**
     * Save EspecieAtividade
     *
     * @type {Observable<any>}
     */
    saveEspecieAtividade: any = createEffect(() => this._actions.pipe(
        ofType<EspecieAtividadeEditActions.SaveEspecieAtividade>(EspecieAtividadeEditActions.SAVE_ESPECIE_ATIVIDADE),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'espécie atividade',
            content: 'Salvando a espécie atividade ...',
            status: 0, // carregando
        }))),
        switchMap((action) => {
            const context = JSON.stringify({isAdmin: true});
            return this._especieAtividadeService.save(action.payload.especieAtividade, context).pipe(
                tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'espécie atividade',
                    content: 'Espécie atividade id ' + response.id + ' salva com sucesso.',
                    status: 1, // sucesso
                }))),
                mergeMap((response: EspecieAtividade) => [
                    new EspecieAtividadeEditActions.SaveEspecieAtividadeSuccess(response),
                    new EspecieAtividadeListActions.ReloadEspecieAtividade(),
                    new AddData<EspecieAtividade>({data: [response], schema: especieAtividadeSchema})
                ]),
                catchError((err) => {
                    console.log(err);
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'espécie atividade',
                        content: 'Erro ao salvar a espécie atividade!',
                        status: 2, // erro
                    }));
                    return of(new EspecieAtividadeEditActions.SaveEspecieAtividadeFailed(err));
                })
            );
        })
    ));
    /**
     * Update EspecieAtividade
     *
     * @type {Observable<any>}
     */
    updateEspecieAtividade: any = createEffect(() => this._actions.pipe(
        ofType<EspecieAtividadeEditActions.UpdateEspecieAtividade>(EspecieAtividadeEditActions.UPDATE_ESPECIE_ATIVIDADE),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'espécie atividade',
            content: 'Alterando a espécie atividade ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._especieAtividadeService.patch(action.payload.especieAtividade, action.payload.changes).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'espécie atividade',
                content: 'Espécie atividade id ' + response.id + ' alterada com sucesso.',
                status: 1, // sucesso
            }))),
            mergeMap((response: EspecieAtividade) => [
                new EspecieAtividadeListActions.ReloadEspecieAtividade(),
                new AddData<EspecieAtividade>({data: [response], schema: especieAtividadeSchema}),
                new EspecieAtividadeEditActions.UpdateEspecieAtividadeSuccess(response)
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'espécie atividade',
                    content: 'Erro ao alterar a espécie atividade!',
                    status: 2, // erro
                }));
                return of(new EspecieAtividadeEditActions.UpdateEspecieAtividadeFailed(err));
            })
        ))
    ));
    /**
     * Save EspecieAtividade Success
     */
    saveEspecieAtividadeSuccess: any = createEffect(() => this._actions.pipe(
        ofType<EspecieAtividadeEditActions.SaveEspecieAtividadeSuccess>(EspecieAtividadeEditActions.SAVE_ESPECIE_ATIVIDADE_SUCCESS),
        tap(() => {
            this._router.navigate(['apps/admin/especie-atividades/listar']).then();
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _especieAtividadeService: EspecieAtividadeService,
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
