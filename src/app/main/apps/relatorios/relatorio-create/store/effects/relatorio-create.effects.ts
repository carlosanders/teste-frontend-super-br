import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as RelatorioCreateActions from '../actions/relatorio-create.actions';

import {RelatorioService} from '@cdk/services/relatorio.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {relatorio as relatorioSchema} from '@cdk/normalizr';
import {Relatorio} from '@cdk/models/relatorio.model';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import * as fromStoreRelatorio from '../../../store';
import {Usuario} from '@cdk/models';
import {LoginService} from '../../../../../auth/login/login.service';

@Injectable()
export class RelatorioCreateEffect {
    routerState: any;
    /**
     * Save Relatorio Success
     */
    saveRelatorioSuccess: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<RelatorioCreateActions.SaveRelatorioSuccess>(RelatorioCreateActions.SAVE_RELATORIO_SUCCESS),
        tap(() => {
            this._router.navigate([this.routerState.url.replace('/criar', '')]).then();
        })
    ), {dispatch: false});
    /**
     * Save Relatorio
     *
     * @type {Observable<any>}
     */
    saveRelatorio: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<RelatorioCreateActions.SaveRelatorio>(RelatorioCreateActions.SAVE_RELATORIO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'relatório',
            content: 'Salvando o relatório ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._relatorioService.save(action.payload.relatorio).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'relatorio',
                content: 'Relatório id ' + response.id + ' salvo com sucesso.',
                status: 1, // sucesso
            }))),
            mergeMap((response: Relatorio) => [
                new RelatorioCreateActions.SaveRelatorioSuccess(),
                new fromStoreRelatorio.UnloadRelatorios({reset: true}),
                new fromStoreRelatorio.GetRelatorios({
                    filter: {
                        'criadoPor.id': 'eq:' + this._profile.id
                    },
                    etiquetaFilter: {},
                    limit: 10,
                    offset: 0,
                    sort: {id: 'DESC'},
                    populate: [
                        'documento',
                        'tipoRelatorio',
                        'vinculacoesEtiquetas',
                        'vinculacoesEtiquetas.etiqueta'
                    ]
                }),
                new AddData<Relatorio>({data: [response], schema: relatorioSchema}),
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'relatório',
                    content: 'Erro ao salvar o relatório!',
                    status: 2, // erro
                }));
                return of(new RelatorioCreateActions.SaveRelatorioFailed(err));
            })
        ))
    ));

    private _profile: Usuario;
    constructor(
        private _actions: Actions,
        private _relatorioService: RelatorioService,
        private _store: Store<State>,
        private _router: Router,
        public _loginService: LoginService,
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });

        this._profile = _loginService.getUserProfile();
    }
}
