import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as CoordenadorEditActions from '../actions/coordenador-edit.actions';
import * as CoordenadoresListActions from '../../../coordenadores-list/store/actions';

import {CoordenadorService} from '@cdk/services/coordenador.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {coordenador as coordenadorSchema} from '@cdk/normalizr';
import {Coordenador} from '@cdk/models/coordenador.model';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class CoordenadorEditEffects {
    routerState: any;
    /**
     * Get Coordenador with router parameters
     *
     * @type {Observable<any>}
     */
    getCoordenador: any = createEffect(() => this._actions.pipe(
        ofType<CoordenadorEditActions.GetCoordenador>(CoordenadorEditActions.GET_COORDENADOR),
        switchMap(action => this._coordenadorService.query(
            JSON.stringify(action.payload),
            1,
            0,
            JSON.stringify({}),
            JSON.stringify([
                'populateAll',
                'colaborador.usuario',
            ]))),
        switchMap(response => [
            new AddData<Coordenador>({data: response['entities'], schema: coordenadorSchema}),
            new CoordenadorEditActions.GetCoordenadorSuccess({
                loaded: {
                    id: 'coordenadorHandle',
                    value: this.routerState.params.coordenadorHandle
                },
                coordenadorId: response['entities'][0].id
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new CoordenadorEditActions.GetCoordenadorFailed(err));
        })
    ));
    /**
     * Save Coordenador
     *
     * @type {Observable<any>}
     */
    saveCoordenador: any = createEffect(() => this._actions.pipe(
        ofType<CoordenadorEditActions.SaveCoordenador>(CoordenadorEditActions.SAVE_COORDENADOR),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'coordenador',
            content: 'Salvando o coordenador ...',
            status: 0, // carregando
        }))),
        switchMap((action) => {
            const context = JSON.stringify({isAdmin: true});
            return this._coordenadorService.save(action.payload.coordenador, context).pipe(
                tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'coordenador',
                    content: 'Coordenador id ' + response.id + ' salvo com sucesso.',
                    status: 1, // sucesso
                }))),
                mergeMap((response: Coordenador) => [
                    new CoordenadorEditActions.SaveCoordenadorSuccess(),
                    new CoordenadoresListActions.ReloadCoordenadores(),
                    new AddData<Coordenador>({data: [response], schema: coordenadorSchema})
                ]),
                catchError((err) => {
                    console.log(err);
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'coordenador',
                        content: 'Erro ao salvar o coordenador!',
                        status: 2, // erro
                    }));
                    return of(new CoordenadorEditActions.SaveCoordenadorFailed(err));
                })
            );
        })
    ));
    /**
     * Save Coordenador Success
     */
    saveCoordenadorSuccess: any = createEffect(() => this._actions.pipe(
        ofType<CoordenadorEditActions.SaveCoordenadorSuccess>(CoordenadorEditActions.SAVE_COORDENADOR_SUCCESS),
        tap(() => {
            this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.coordenadorHandle), 'listar')]).then();
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _coordenadorService: CoordenadorService,
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
