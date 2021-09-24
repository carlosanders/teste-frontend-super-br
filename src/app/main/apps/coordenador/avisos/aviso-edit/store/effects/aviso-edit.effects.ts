import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as AvisoEditActions from '../actions/aviso-edit.actions';
import * as AvisoListActions from '../../../aviso-list/store/actions/aviso-list.actions';

import {AvisoService} from '@cdk/services/aviso.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {aviso as avisoSchema} from '@cdk/normalizr';
import {Aviso} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class AvisoEditEffects {
    routerState: any;
    /**
     * Get Aviso with router parameters
     *
     * @type {Observable<any>}
     */
    getAviso: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<AvisoEditActions.GetAviso>(AvisoEditActions.GET_AVISO),
        switchMap(action => this._avisoService.get(
            action.payload.id,
            JSON.stringify([
                'aviso',
                'vinculacoesAvisos',
                'vinculacoesAvisos.setor',
                'vinculacoesAvisos.modalidadeOrgaoCentral',
                'vinculacoesAvisos.unidade',
                'vinculacoesAvisos.setor.unidade'
            ]),
            JSON.stringify({isAdmin: true}))),
        switchMap(response => [
            new AddData<Aviso>({data: [response], schema: avisoSchema}),
            new AvisoEditActions.GetAvisoSuccess({
                loaded: {
                    id: 'avisoHandle',
                    value: this.routerState.params.avisoHandle
                },
                avisoId: this.routerState.params.avisoHandle
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new AvisoEditActions.GetAvisoFailed(err));
        })
    ));
    /**
     * Save Aviso
     *
     * @type {Observable<any>}
     */
    saveAviso: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<AvisoEditActions.SaveAviso>(AvisoEditActions.SAVE_AVISO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'aviso',
            content: 'Salvando o aviso ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._avisoService.save(action.payload.aviso).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'aviso',
                content: 'Aviso id ' + response.id + ' salvo com sucesso.',
                status: 1, // sucesso
            }))),
            mergeMap((response: Aviso) => [
                new AvisoEditActions.SaveAvisoSuccess(),
                new AvisoListActions.ReloadAviso(),
                new AddData<Aviso>({data: [response], schema: avisoSchema})
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'aviso',
                    content: 'Erro ao salvar o aviso!',
                    status: 2, // erro
                }));
                return of(new AvisoEditActions.SaveAvisoFailed(err));
            })
        ))
    ));
    /**
     * Save Aviso Success
     */
    saveAvisoSuccess: any = createEffect(() => this._actions.pipe(
        ofType<AvisoEditActions.SaveAvisoSuccess>(AvisoEditActions.SAVE_AVISO_SUCCESS),
        tap(() => {
            this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.avisoHandle), 'listar')]).then();
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _avisoService: AvisoService,
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
