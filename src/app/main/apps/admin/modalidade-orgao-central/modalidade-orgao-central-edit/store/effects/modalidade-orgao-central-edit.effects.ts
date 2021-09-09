import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as ModalidadeOrgaoCentralEditActions from '../actions/modalidade-orgao-central-edit.actions';
import * as ModalidadeOrgaoCentralListActions
    from '../../../modalidade-orgao-central-list/store/actions/modalidade-orgao-central-list.actions';

import {ModalidadeOrgaoCentralService} from '@cdk/services/modalidade-orgao-central.service';
import {ColaboradorService} from '@cdk/services/colaborador.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {modalidadeOrgaoCentral as modalidadeOrgaoCentralSchema} from '@cdk/normalizr';
import {ModalidadeOrgaoCentral} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class ModalidadeOrgaoCentralEditEffects {
    routerState: any;

    /**
     * Get ModalidadeOrgaoCentral with router parameters
     *
     * @type {Observable<any>}
     */
    getModalidadeOrgaoCentral: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ModalidadeOrgaoCentralEditActions.GetModalidadeOrgaoCentral>(ModalidadeOrgaoCentralEditActions.GET_MODALIDADE_ORGAO_CENTRAL),
        switchMap(action => this._modalidadeOrgaoCentralService.query(
            JSON.stringify(action.payload),
            1,
            0,
            JSON.stringify({}),
            JSON.stringify([
                'populateAll'
            ]),
            JSON.stringify({isAdmin: true}))),
        switchMap(response => [
            new AddData<ModalidadeOrgaoCentral>({
                data: response['entities'],
                schema: modalidadeOrgaoCentralSchema
            }),
            new ModalidadeOrgaoCentralEditActions.GetModalidadeOrgaoCentralSuccess({
                loaded: {
                    id: 'modalidadeOrgaoCentralHandle',
                    value: this.routerState.params.modalidadeOrgaoCentralHandle
                },
                entityId: response['entities'][0].id
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new ModalidadeOrgaoCentralEditActions.GetModalidadeOrgaoCentralFailed(err));
        })
    ));

    /**
     * Save ModalidadeOrgaoCentral
     *
     * @type {Observable<any>}
     */
    saveModalidadeOrgaoCentral: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ModalidadeOrgaoCentralEditActions.SaveModalidadeOrgaoCentral>(ModalidadeOrgaoCentralEditActions.SAVE_MODALIDADE_ORGAO_CENTRAL),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'modalidade órgão central',
            content: 'Salvando a modalidade órgão central ...',
            status: 0, // carregando
        }))),
        switchMap((action) => {
            const context = JSON.stringify({isAdmin: true});
            return this._modalidadeOrgaoCentralService.save(action.payload.modalidadeOrgaoCentral, context).pipe(
                tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'modalidade órgão central',
                    content: 'Modalidade órgão central id ' + response.id + ' salva com sucesso.',
                    status: 1, // sucesso
                }))),
                mergeMap((response: ModalidadeOrgaoCentral) => [
                    new ModalidadeOrgaoCentralEditActions.SaveModalidadeOrgaoCentralSuccess(response),
                    new ModalidadeOrgaoCentralListActions.ReloadModalidadeOrgaoCentral(),
                    new AddData<ModalidadeOrgaoCentral>({
                        data: [response],
                        schema: modalidadeOrgaoCentralSchema
                    })
                ]),
                catchError((err) => {
                    console.log(err);
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'modalidade órgão central',
                        content: 'Erro ao salvar a modalidade órgão central!',
                        status: 2, // erro
                    }));
                    return of(new ModalidadeOrgaoCentralEditActions.SaveModalidadeOrgaoCentralFailed(err));
                })
            );
        })
    ));

    /**
     * Update ModalidadeOrgaoCentral
     *
     * @type {Observable<any>}
     */
    updateModalidadeOrgaoCentral: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ModalidadeOrgaoCentralEditActions.UpdateModalidadeOrgaoCentral>(ModalidadeOrgaoCentralEditActions.UPDATE_MODALIDADE_ORGAO_CENTRAL),
        switchMap(action => this._modalidadeOrgaoCentralService.patch(action.payload.modalidadeOrgaoCentral, action.payload.changes).pipe(
            mergeMap((response: ModalidadeOrgaoCentral) => [
                new ModalidadeOrgaoCentralListActions.ReloadModalidadeOrgaoCentral(),
                new AddData<ModalidadeOrgaoCentral>({data: [response], schema: modalidadeOrgaoCentralSchema}),
                new ModalidadeOrgaoCentralEditActions.UpdateModalidadeOrgaoCentralSuccess(response)
            ])
        )),
        catchError((err) => {
            console.log(err);
            return of(new ModalidadeOrgaoCentralEditActions.UpdateModalidadeOrgaoCentralFailed(err));
        })
    ));

    /**
     * Save ModalidadeOrgaoCentral Success
     */
    saveModalidadeOrgaoCentralSuccess: any = createEffect(() => this._actions.pipe(
        ofType<ModalidadeOrgaoCentralEditActions.SaveModalidadeOrgaoCentralSuccess>(ModalidadeOrgaoCentralEditActions.SAVE_MODALIDADE_ORGAO_CENTRAL_SUCCESS),
        tap(() => {
            this._router.navigate(['apps/admin/modalidade-orgao-central/listar']).then();
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _modalidadeOrgaoCentralService: ModalidadeOrgaoCentralService,
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
