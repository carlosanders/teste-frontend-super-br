import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';
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
import {ValidacaoTransicaoWorkflowService} from '@cdk/services/validacao-transicao-workflow.service';

@Injectable()
export class ValidacaoTransicaoWorkflowEditEffect {
    routerState: any;
    /**
     * Save Validacao
     *
     * @type {Observable<any>}
     */
    saveValidacao: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ValidacaoEditActions.SaveValidacao>(ValidacaoEditActions.SAVE_VALIDACAO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'validação',
            content: 'Salvando a validação ...',
            status: 0, // carregando
        }))),
        switchMap((action) => {
            const context = JSON.stringify({isAdmin: true});
            return this._validacaoService.save(action.payload.validacao, context).pipe(
                tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'validacao',
                    content: 'Validação id ' + response.id + ' salva com sucesso.',
                    status: 1, // sucesso
                }))),
                mergeMap((response: ValidacaoTransicaoWorkflow) => [
                    new ValidacaoEditActions.SaveValidacaoSuccess(),
                    new ValidacaoListActions.ReloadValidacoes(),
                    new AddData<ValidacaoTransicaoWorkflow>({data: [response], schema: validacaoSchema})
                ]),
                catchError((err) => {
                    console.log(err);
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'validação',
                        content: 'Erro ao salvar a validação!',
                        status: 2, // erro
                    }));
                    return of(new ValidacaoEditActions.SaveValidacaoFailed(err));
                })
            );
        })
    ));
    /**
     * Save Validacao Success
     */
    saveValidacaoSuccess: any = createEffect(() => this._actions.pipe(
        ofType<ValidacaoEditActions.SaveValidacaoSuccess>(ValidacaoEditActions.SAVE_VALIDACAO_SUCCESS),
        tap(() => {
            this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.validacaoTransicaoWorkflowHandle), 'listar')]).then();
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _validacaoService: ValidacaoTransicaoWorkflowService,
        private _store: Store<State>,
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
