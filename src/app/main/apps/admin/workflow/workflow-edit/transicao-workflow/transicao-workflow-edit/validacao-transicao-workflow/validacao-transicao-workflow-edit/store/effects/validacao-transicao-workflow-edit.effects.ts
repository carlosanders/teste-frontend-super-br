import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';
import * as ValidacaoEditActions from '../actions/validacao-transicao-workflow-edit.actions';
import * as ValidacaoListActions
    from '../../../validacao-transicao-workflow-list/store/actions/validacao-transicao-workflow-list.actions';
import {AddData} from '@cdk/ngrx-normalizr';
import {validacaoTransicaoWorkflow as validacaoSchema} from '@cdk/normalizr';
import {ValidacaoTransicaoWorkflow} from '@cdk/models/validacao-transicao-workflow.model';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import * as moment from 'moment';
import {ValidacaoTransicaoWorkflowService} from '@cdk/services/validacao-transicao-workflow.service';

@Injectable()
export class ValidacaoTransicaoWorkflowEditEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _validacaoService: ValidacaoTransicaoWorkflowService,
        private _store: Store<State>,
        private _router: Router
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe((routerState) => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    /**
     * Save Validacao
     *
     * @type {Observable<any>}
     */
    @Effect()
    saveValidacao: any =
        this._actions
            .pipe(
                ofType<ValidacaoEditActions.SaveValidacao>(ValidacaoEditActions.SAVE_VALIDACAO),
                switchMap(action => this._validacaoService.save(action.payload).pipe(
                        mergeMap((response: ValidacaoTransicaoWorkflow) => [
                            new ValidacaoEditActions.SaveValidacaoSuccess(),
                            new ValidacaoListActions.ReloadValidacoes(),
                            new AddData<ValidacaoTransicaoWorkflow>({data: [response], schema: validacaoSchema}),
                            new OperacoesActions.Resultado({
                                type: 'validacaoTransicaoWorkflow',
                                content: `Validacao id ${response.id} criada com sucesso!`,
                                dateTime: moment()
                            })
                        ]),
                        catchError(err => of(new ValidacaoEditActions.SaveValidacaoFailed(err)))
                    ))
            );
    /**
     * Save Validacao Success
     */
    @Effect({dispatch: false})
    saveValidacaoSuccess: any =
    this._actions
    .pipe(
        ofType<ValidacaoEditActions.SaveValidacaoSuccess>(ValidacaoEditActions.SAVE_VALIDACAO_SUCCESS),
        tap(() => {
                    this._router.navigate(
                        [
                            this.routerState.url.replace(
                                ('editar/' + this.routerState.params.validacaoTransicaoWorkflowHandle),
                                'listar')
                        ]
                    ).then();
                })
            );
}
