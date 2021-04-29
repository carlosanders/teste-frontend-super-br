import {Actions, Effect, ofType} from '@ngrx/effects';
import { Store} from '@ngrx/store';
import {State} from '../../../../../../store';
import {Router} from '@angular/router';
import * as LembreteActions from '../actions/lembrete.actions';
import {catchError, mergeMap, switchMap} from 'rxjs/operators';
import {AddData} from '@cdk/ngrx-normalizr';
import {Processo} from '@cdk/models';
import {processo as processoSchema} from '@cdk/normalizr';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {of} from 'rxjs';
import {Injectable} from '@angular/core';
import {ProcessoService} from "@cdk/services/processo.service";

@Injectable()
export class LembreteEffects {
    routerState: any;
    private currentDate: any;
    setorAtual: number;

    constructor(
        private _actions: Actions,
        private _processoService: ProcessoService,
        private _store: Store<State>,
        private _router: Router
    ) {
    }

    /**
     * Save Lembrete
     * @type {any}
     */
    @Effect()
    saveLembrete: any =
        this._actions
            .pipe(
                ofType<LembreteActions.SaveLembrete>(LembreteActions.SAVE_LEMBRETE),
                switchMap((action) => {
                    return this._processoService.patch(action.payload.processo, {lembreteArquivista: action.payload.conteudo}).pipe(
                        mergeMap((response: Processo) => [
                            new LembreteActions.SaveLembreteSuccess(),
                            new AddData<Processo>({data: [response], schema: processoSchema}),
                            new OperacoesActions.Resultado({
                                type: 'lembrete',
                                content: `Lembrete no processo ${response.id} atualizado com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            return of(new LembreteActions.SaveLembreteFailed(err));
                        })
                    );
                })
            );
}
