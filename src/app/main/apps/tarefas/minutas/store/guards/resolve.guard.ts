import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap, withLatestFrom} from 'rxjs/operators';

import {MinutasAppState} from '../reducers';
import * as fromStore from '../../store';
import {getRouterState} from 'app/store/reducers';
import {getDocumentosHasLoaded} from '../selectors';
import {getSelectedTarefas} from '../../../store';

@Injectable()
export class ResolveGuard implements CanActivate {
    routerState: any;

    /**
     * Constructor
     *
     * @param _store
     */
    constructor(
        private _store: Store<MinutasAppState>
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
        return this.getDocumentos().pipe(
            switchMap(() => of(true)),
            catchError((err) => {
                console.log(err);
                return of(false);
            })
        );
    }

    /**
     * Get Documentos
     *
     * @returns
     */
    getDocumentos(): any {
        return this._store.pipe(
            select(getDocumentosHasLoaded),
            withLatestFrom(this._store.pipe(select(getSelectedTarefas)), this._store.pipe(select(fromStore.isLoadingAny))),
            tap(([loaded, tarefas, loadingAny]) => {
                if (!loaded && tarefas?.length && !loadingAny) {
                    this._store.dispatch(new fromStore.UnloadDocumentos());

                    tarefas.sort((a, b) => a.processo.id < b.processo.id ? -1 : a.processo.id > b.processo.id ? 1 : 0);
                    tarefas.forEach((tarefa) => {
                        const tarefaHandle = `eq:${tarefa.id}`;

                        const params = {
                            filter: {
                                'tarefaOrigem.id': tarefaHandle,
                                'documentoAvulsoRemessa.id': 'isNull',
                                'juntadaAtual': 'isNull'
                            },
                            limit: 10,
                            offset: 0,
                            sort: {
                                criadoEm: 'ASC'
                            },
                            populate: [
                                'tipoDocumento',
                                'tarefaOrigem',
                                'tarefaOrigem.vinculacoesEtiquetas',
                                'tarefaOrigem.vinculacoesEtiquetas.etiqueta',
                                'componentesDigitais'
                            ],
                            tarefaId: tarefa.id,
                            processoId: tarefa.processo.id,
                            nupFormatado: tarefa.processo.NUPFormatado
                        };
                        this._store.dispatch(new fromStore.GetDocumentos(params));
                    });
                }
            }),
            filter((loaded: any) => (loaded[0] === true) && loaded[1].length),
            take(1)
        );
    }
}
