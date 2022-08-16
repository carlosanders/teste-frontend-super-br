import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';
import {ProtocoloCreateAppState} from '../reducers';
import * as fromStore from '../';
import {getDocumentosHasLoaded} from '../';
import {getRouterState} from 'app/store/reducers';
import {LoginService} from '../../../../../auth/login/login.service';

@Injectable()
export class ResolveGuard implements CanActivate {
    routerState: any;

    /**
     * @param _store
     * @param _loginService
     */
    constructor(
        private _store: Store<ProtocoloCreateAppState>,
        private _loginService: LoginService
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
            catchError(err => of(false))
        );
    }

    /**
     * Check store
     *
     * @returns
     */
    checkStore(): Observable<any> {
        return this.getDocumentos().pipe(
            take(1)
        );
    }

    /**
     * Get Documentos
     *
     * @returns
     */
    getDocumentos(): any {
        if (this.routerState.params['processoHandle']) {
            return this._store.pipe(
                select(getDocumentosHasLoaded),
                tap((loaded: any) => {
                    if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {
                        this._store.dispatch(new fromStore.UnloadDocumentos());
                        const params = {
                            filter: {
                                'processoOrigem.id': `eq:${this.routerState.params['processoHandle']}`,
                                'criadoPor.id': `eq:${this._loginService.getUserProfile().id}`
                            },
                            limit: 10,
                            offset: 0,
                            sort: {criadoEm: 'ASC'},
                            populate: [
                                'populateAll',
                                'tipoDocumento',
                                'documentoAvulsoRemessa',
                                'documentoAvulsoRemessa.documentoResposta',
                                'componentesDigitais',
                                'juntadaAtual'
                            ],
                            context: {'incluiVinculacaoDocumentoPrincipal': true}
                        };
                        this._store.dispatch(new fromStore.GetDocumentos(params));
                    }
                }),
                filter((loaded: any) => this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value),
                take(1)
            );
        } else {
            return this._store.pipe(
                select(getDocumentosHasLoaded),
                tap((loaded: any) => {
                    if (loaded) {
                        this._store.dispatch(new fromStore.UnloadDocumentos());
                    }
                }),
                filter((loaded: any) => !loaded),
                take(1)
            );
        }
    }
}
