import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as CompetenciaEditActions from '../actions/competencia-edit.actions';
import * as CompetenciasListActions from '../../../competencias-list/store/actions/competencias-list.actions';

import {VinculacaoSetorMunicipioService} from '@cdk/services/vinculacao-setor-municipio.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {vinculacaoSetorMunicipio as vinculacaoSetorMunicipioSchema} from '@cdk/normalizr';
import {VinculacaoSetorMunicipio} from '@cdk/models/vinculacao-setor-municipio.model';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class CompetenciaEditEffects {
    routerState: any;
    /**
     * Get VinculacaoSetorMunicipio with router parameters
     *
     * @type {Observable<any>}
     */
    getCompetencia: any = createEffect(() => this._actions.pipe(
        ofType<CompetenciaEditActions.GetCompetencia>(CompetenciaEditActions.GET_COMPETENCIA),
        switchMap(action => this._vinculacaoSetorMunicipioService.query(
            JSON.stringify(action.payload),
            1,
            0,
            JSON.stringify({}),
            JSON.stringify([
                'populateAll'
            ]),
            JSON.stringify({isAdmin: true}))),
        switchMap(response => [
            new AddData<VinculacaoSetorMunicipio>({
                data: response['entities'],
                schema: vinculacaoSetorMunicipioSchema
            }),
            new CompetenciaEditActions.GetCompetenciaSuccess({
                loaded: {
                    id: 'competenciaHandle',
                    value: this.routerState.params.competenciaHandle
                },
                competenciaId: response['entities'][0].id
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new CompetenciaEditActions.GetCompetenciaFailed(err));
        })
    ));
    /**
     * Save VinculacaoSetorMunicipio
     *
     * @type {Observable<any>}
     */
    saveCompetencia: any = createEffect(() => this._actions.pipe(
        ofType<CompetenciaEditActions.SaveCompetencia>(CompetenciaEditActions.SAVE_COMPETENCIA),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'competência',
            content: 'Salvando a competência ...',
            status: 0, // carregando
        }))),
        switchMap((action) => {
            const context = JSON.stringify({isAdmin: true});
            return this._vinculacaoSetorMunicipioService.save(action.payload.vinculacaoSetorMunicipio, context).pipe(
                tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'competência',
                    content: 'Competência id ' + response.id + ' salva com sucesso.',
                    status: 1, // sucesso
                }))),
                mergeMap((response: VinculacaoSetorMunicipio) => [
                    new CompetenciaEditActions.SaveCompetenciaSuccess(),
                    new CompetenciasListActions.ReloadCompetencias(),
                    new AddData<VinculacaoSetorMunicipio>({
                        data: [response],
                        schema: vinculacaoSetorMunicipioSchema
                    })
                ]),
                catchError((err) => {
                    console.log(err);
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'competência',
                        content: 'Erro ao salvar a competência!',
                        status: 2, // erro
                    }));
                    return of(new CompetenciaEditActions.SaveCompetenciaFailed(err));
                })
            );
        })
    ));
    /**
     * Save VinculacaoSetorMunicipio Success
     */
    saveCompetenciaSuccess: any = createEffect(() => this._actions.pipe(
        ofType<CompetenciaEditActions.SaveCompetenciaSuccess>(CompetenciaEditActions.SAVE_COMPETENCIA_SUCCESS),
        tap(() => {
            this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.competenciaHandle), 'listar')]).then();
        })
    ), {dispatch: false});

    /**
     *
     * @param _actions
     * @param _vinculacaoSetorMunicipioService
     * @param _store
     * @param _loginService
     * @param _router
     */
    constructor(
        private _actions: Actions,
        private _vinculacaoSetorMunicipioService: VinculacaoSetorMunicipioService,
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
