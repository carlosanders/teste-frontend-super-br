import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable} from 'rxjs';
import {catchError, mergeMap, tap, switchMap} from 'rxjs/operators';

import * as CompetenciaEditActions from '../actions/competencia-edit.actions';
import * as CompetenciasListActions from '../../../competencias-list/store/actions/competencias-list.actions';

import {VinculacaoSetorMunicipioService} from '@cdk/services/vinculacao-setor-municipio.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {vinculacaoSetorMunicipio as vinculacaoSetorMunicipioSchema} from '@cdk/normalizr/vinculacao-setor-municipio.schema';
import {VinculacaoSetorMunicipio} from '@cdk/models/vinculacao-setor-municipio.model';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';

@Injectable()
export class CompetenciaEditEffects {
    routerState: any;

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
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    /**
     * Get VinculacaoSetorMunicipio with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getCompetencia: any =
        this._actions
            .pipe(
                ofType<CompetenciaEditActions.GetCompetencia>(CompetenciaEditActions.GET_COMPETENCIA),
                switchMap((action) => {
                    return this._vinculacaoSetorMunicipioService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll'
                        ]),
                        JSON.stringify({isAdmin: true}));
                }),
                switchMap(response => [
                    new AddData<VinculacaoSetorMunicipio>({data: response['entities'], schema: vinculacaoSetorMunicipioSchema}),
                    new CompetenciaEditActions.GetCompetenciaSuccess({
                        loaded: {
                            id: 'competenciaHandle',
                            value: this.routerState.params.competenciaHandle
                        },
                        competenciaId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new CompetenciaEditActions.GetCompetenciaFailed(err));
                    return caught;
                })
            );

    /**
     * Save VinculacaoSetorMunicipio
     * @type {Observable<any>}
     */
    @Effect()
    saveCompetencia: any =
        this._actions
            .pipe(
                ofType<CompetenciaEditActions.SaveCompetencia>(CompetenciaEditActions.SAVE_COMPETENCIA),
                switchMap((action) => {
                    const context = JSON.stringify({isAdmin: true});
                    return this._vinculacaoSetorMunicipioService.save(action.payload, context).pipe(
                        mergeMap((response: VinculacaoSetorMunicipio) => [
                            new CompetenciaEditActions.SaveCompetenciaSuccess(),
                            new CompetenciasListActions.ReloadCompetencias(),
                            new AddData<VinculacaoSetorMunicipio>({data: [response], schema: vinculacaoSetorMunicipioSchema})
                        ])
                    );
                }),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new CompetenciaEditActions.SaveCompetenciaFailed(err));
                    return caught;
                })
            );

    /**
     * Save VinculacaoSetorMunicipio Success
     */
    @Effect({dispatch: false})
    saveCompetenciaSuccess: any =
        this._actions
            .pipe(
                ofType<CompetenciaEditActions.SaveCompetenciaSuccess>(CompetenciaEditActions.SAVE_COMPETENCIA_SUCCESS),
                tap(() => {
                    this._router.navigate([
                        this.routerState.url.replace(
                            ('editar/' + this.routerState.params.competenciaHandle),
                            'listar'
                        )
                    ]).then();
                })
            );
}
