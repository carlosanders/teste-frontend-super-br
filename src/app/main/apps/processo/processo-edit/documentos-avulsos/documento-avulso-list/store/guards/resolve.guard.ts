import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';

import {DocumentoAvulsoListAppState} from '../reducers';
import * as fromStore from '../';
import {getRouterState} from 'app/store/reducers';
import {getDocumentoAvulsoListLoaded} from '../selectors';
import {modulesConfig} from "../../../../../../../../../modules/modules-config";
import {TarefaListComponent} from "../../../../tarefas/tarefa-list/tarefa-list.component";
import {
    TableDefinitionsService
} from "@cdk/components/table-definitions/table-definitions.service";
import {DocumentoAvulsoListComponent} from "../../documento-avulso-list.component";
import {TableDefinitions} from "../../../../../../../../../@cdk/components/table-definitions/table-definitions";

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
        private _store: Store<DocumentoAvulsoListAppState>,
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
                    .generateTableDeinitionIdentifier(DocumentoAvulsoListComponent.GRID_DEFINITIONS_KEYS)
            )
            .pipe(
                switchMap((definitions) => this.getDocumentosAvulsos(definitions))
            )
    }

    /**
     * Get DocumentosAvulsos
     *
     * @returns
     */
    getDocumentosAvulsos(definitions?: TableDefinitions): any {
        return this._store.pipe(
            select(getDocumentoAvulsoListLoaded),
            tap((loaded: any) => {
                if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {

                    let processoId = null;

                    const routeParams = of('processoHandle');
                    routeParams.subscribe((param) => {
                        processoId = `eq:${this.routerState.params[param]}`;
                    });

                    const params = {
                        filter: {
                            'processo.id': processoId,
                            'dataHoraRemessa': 'isNotNull'
                        },
                        gridFilter: {},
                        limit: definitions?.limit || 10,
                        offset: 0,
                        sort: definitions?.sort || {id: 'DESC'},
                        context: {},
                        populate: [
                            'processo',
                            'especieDocumentoAvulso',
                            'modelo',
                            'setorDestino',
                            'setorOrigem',
                            'pessoaDestino',
                            'documentoRemessa',
                            'documentoResposta',
                            'setorResponsavel',
                            'usuarioRemessa',
                            'usuarioResposta',
                            'criadoPor',
                            'apagadoPor'
                        ]
                    };

                    const modulos = [];
                    modulesConfig.forEach((module) => {
                        modulos.push(module.name);
                    });
                    params.context['modulo'] = modulos;

                    this._store.dispatch(new fromStore.GetDocumentosAvulsos(params));
                }
            }),
            filter((loaded: any) => this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value),
            take(1)
        );
    }
}
