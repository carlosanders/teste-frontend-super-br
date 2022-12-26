 import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';

import {TarefaListAppState} from '../reducers';
import * as fromStore from '../';
import {getRouterState} from 'app/store/reducers';
import {getTarefaListLoaded} from '../selectors';
 import {
     TableDefinitionsService
 } from '../../../../../../../../../@cdk/components/table-definitions/table-definitions.service';
 import {TarefaListComponent} from '../../tarefa-list.component';
 import {TableDefinitions} from '../../../../../../../../../@cdk/components/table-definitions/table-definitions';

@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;

    /**
     * Constructor
     *
     * @param _store
     * @param _tableDefinitionsService
     */
    constructor(
        private _store: Store<TarefaListAppState>,
        private _tableDefinitionsService: TableDefinitionsService
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });

    }

    /**
     * Can activate
     *
     * @param route
     * @param state
     * @returns
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.checkStore().pipe(
            switchMap(() => of(true)),
            catchError((err) => {
                console.log(err);
                return of(false);
            })
        );
    }

    checkStore(): Observable<any> {
        return this._tableDefinitionsService
            .getTableDefinitions(
                this._tableDefinitionsService
                    .generateTableDeinitionIdentifier(TarefaListComponent.GRID_DEFINITIONS_KEYS)
            )
            .pipe(
                switchMap((definitions) => this.getTarefas(definitions))
            )
    }

    /**
     * Get Tarefas
     *
     * @returns
     */
    getTarefas(definitions?: TableDefinitions): any {
        return this._store.pipe(
            select(getTarefaListLoaded),
            tap((loaded: any) => {
                if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {

                    let processoId = null;

                    const routeParams = of('processoHandle');
                    routeParams.subscribe((param) => {
                        processoId = `eq:${this.routerState.params[param]}`;
                    });

                    const params = {
                        filter: {
                            'processo.id': processoId
                        },
                        gridFilter: {},
                        limit: definitions?.limit || 10,
                        offset: 0,
                        sort: definitions?.sort || {id: 'DESC'},
                        populate: [
                            'processo',
                            'colaborador.usuario',
                            'setor.especieSetor',
                            'setor.generoSetor',
                            'setor.parent',
                            'setor.unidade',
                            'processo.especieProcesso',
                            'processo.especieProcesso.generoProcesso',
                            'processo.modalidadeMeio',
                            'processo.documentoAvulsoOrigem',
                            'especieTarefa',
                            'usuarioResponsavel',
                            'usuarioResponsavel.colaborador',
                            'setorResponsavel',
                            'setorResponsavel.unidade',
                            'setorOrigem',
                            'setorOrigem.unidade',
                            'especieTarefa.generoTarefa',
                            'criadoPor',
                            'atualizadoPor',
                            'apagadoPor',
                            'usuarioConclusaoPrazo',
                            'vinculacaoWorkflow',
                            'vinculacaoWorkflow.workflow',
                            'criadoPor',
                            'atualizadoPor',
                            'apagadoPor'
                        ]
                    };

                    this._store.dispatch(new fromStore.GetTarefas(params));
                }
            }),
            filter((loaded: any) => this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value),
            take(1)
        );
    }
}
