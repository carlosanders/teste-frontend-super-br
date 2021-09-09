import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as ContatoEditActions from '../actions/contato-edit.actions';
import * as ContatoListActions from '../../../contato-list/store/actions/contato-list.actions';

import {ContatoService} from '@cdk/services/contato.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {contato as contatoSchema} from '@cdk/normalizr';
import {Contato} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class ContatoEditEffect {
    routerState: any;
    /**
     * Get Contato with router parameters
     *
     * @type {Observable<any>}
     */
    getContato: any = createEffect(() => this._actions.pipe(
        ofType<ContatoEditActions.GetContato>(ContatoEditActions.GET_CONTATO),
        switchMap(action => this._contatoService.query(
            JSON.stringify(action.payload),
            1,
            0,
            JSON.stringify({}),
            JSON.stringify([
                'populateAll'
            ]))),
        switchMap(response => [
            new AddData<Contato>({data: response['entities'], schema: contatoSchema}),
            new ContatoEditActions.GetContatoSuccess({
                loaded: {
                    id: 'contatoHandle',
                    value: this.routerState.params.contatoHandle
                },
                contatoId: response['entities'][0].id
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new ContatoEditActions.GetContatoFailed(err));
        })
    ));
    /**
     * Save Contato
     *
     * @type {Observable<any>}
     */
    saveContato: any = createEffect(() => this._actions.pipe(
        ofType<ContatoEditActions.SaveContato>(ContatoEditActions.SAVE_CONTATO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'contato',
            content: 'Salvando o contato ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._contatoService.save(action.payload.contato).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'contato',
                content: 'Contato id ' + response.id + ' salvo com sucesso.',
                status: 1, // sucesso
            }))),
            mergeMap((response: Contato) => [
                new ContatoEditActions.SaveContatoSuccess(),
                new ContatoListActions.ReloadContato(),
                new AddData<Contato>({data: [response], schema: contatoSchema})
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'contato',
                    content: 'Erro ao salvar o contato!',
                    status: 2, // erro
                }));
                return of(new ContatoEditActions.SaveContatoFailed(err));
            })
        ))
    ));
    /**
     * Save Contato Success
     */
    saveContatoSuccess: any = createEffect(() => this._actions.pipe(
        ofType<ContatoEditActions.SaveContatoSuccess>(ContatoEditActions.SAVE_CONTATO_SUCCESS),
        tap(() => {
            this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.contatoHandle), 'listar')]).then();
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _contatoService: ContatoService,
        private _store: Store<State>,
        public _loginService: LoginService,
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
