import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {forkJoin, Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap, withLatestFrom} from 'rxjs/operators';

import {CaixaEmailAppState} from '../reducers';
import * as fromStore from '../index';
import {getRouterState} from 'app/store/reducers';
import {LoginService} from '../../../../auth/login/login.service';
import {ContaEmail, Folder, Usuario} from '@cdk/models';

@Injectable()
export class ResolveGuard implements CanActivate {

    private _profile: Usuario;
    routerState: any;

    constructor(private _store: Store<CaixaEmailAppState>,
                public _loginService: LoginService,
                private _router: Router)
    {
        this._store
            .pipe(select(getRouterState))
            .subscribe((routerState) => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });

        this._profile = _loginService.getUserProfile();
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
            catchError(() => {
                return of(false);
            })
        );
    }

    checkStore(): Observable<any>
    {

        return forkJoin([
            forkJoin([
                this.getContaEmail()
            ]).pipe(
                filter(([contaEmailLoaded]) => !!contaEmailLoaded),
                switchMap(() => this.getFolders()),
                take(1)
            )
        ]).pipe(
            withLatestFrom(
                this._store.pipe(
                    select(fromStore.getFolderIsLoaded)
                )
            ),
            switchMap(() => this.checkData()),
            take(1)
        );

    }

    getContaEmail(): any {
        return this._store.pipe(
            select(fromStore.getContaEmailIsLoaded),
            tap((loaded) => {
                if (!loaded) {
                    this._store.dispatch(new fromStore.GetContaEmail({
                        populate: ['populateAll'],
                        filter: {
                            'setor.id':'in:' + this._profile.colaborador.lotacoes.map(lotacao => lotacao.setor.unidade.id)
                        },
                        limit: 30,
                        offset: 0
                    }));
                }
            }),
            filter((loaded) => loaded),
            take(1)
        );
    }

    getFolders(): any {
        return this._store.pipe(
            select(fromStore.getFolderIsLoaded),
            withLatestFrom(
                this._store.pipe(
                    select(fromStore.getFolderIsLoading)
                ),
                this._store.pipe(
                    select(fromStore.getContaEmailList)
                )
            ),
            tap(([folderLoaded, folderLoading, contaEmailList]) => {
                if (!folderLoaded && !folderLoading) {
                    if (this.routerState.params['contaEmailHandle'] === 'default' && contaEmailList?.length) {
                        this._store.dispatch(new fromStore.GetFolders(contaEmailList[0].id));
                    } else if (contaEmailList?.length && this.routerState.params['contaEmailHandle'] != folderLoaded) {
                        this._store.dispatch(new fromStore.GetFolders(this.routerState.params['contaEmailHandle']));
                    } else if (this.routerState.params['contaEmailHandle'] === 'default' && !contaEmailList?.length) {
                        this._store.dispatch(new fromStore.SetFolder(null));
                    }
                }
            }),
            filter(([folderLoaded]) => folderLoaded !== false),
            take(1)
        );
    }

    checkData(): any {
        return this._store.pipe(
            select(fromStore.getFolderIsLoaded),
            withLatestFrom(
                this._store.pipe(
                    select(fromStore.getContaEmailIsLoaded)
                ),
                this._store.pipe(
                    select(fromStore.getContaEmailList)
                ),
                this._store.pipe(
                    select(fromStore.getFolderList)
                ),
            ),
            tap(([folderLoaded, contaEmailLoaded, contaEmailList, folderList]) => {
                const contaEmailHandle = this.routerState.params['contaEmailHandle'];
                const folderHandle = this.routerState.params['folderHandle'];
                if (contaEmailLoaded && folderLoaded !== false) {
                    if (!this.canPass(folderLoaded, contaEmailList, folderList)) {
                        const contaEmailId = contaEmailHandle !== 'default' ? contaEmailHandle : contaEmailList[0].id;
                        let url = `/apps/caixa-email/${contaEmailId}`;

                        if (folderLoaded !== contaEmailId) {
                            this._store.dispatch(new fromStore.GetFolders(contaEmailId));
                        } else {
                            const inbox = folderList.find(folder => folder.parsedName === 'Caixa de Entrada');
                            if (folderHandle === 'default') {
                                url += `/${inbox.uuid}`;
                            } else {
                                const folder = folderList.find(folder => folder.uuid === folderHandle)  || inbox;

                                url += `/${folder.uuid}`;
                            }

                            this._router.navigate([url]).then();
                        }
                    } else {
                        if (contaEmailHandle !== 'default') {
                            this._store.dispatch(new fromStore.SetContaEmail(contaEmailHandle));
                        }
                        if (folderHandle !== 'default') {
                            this._store.dispatch(new fromStore.SetFolder(folderList.find(folder => folder.uuid === folderHandle) || folderList.find(folder => folder.parsedName === 'Caixa de Entrada')));
                        }
                    }
                }

            }),
            filter(([folderLoaded, , contaEmailList, folderList]) => this.canPass(folderLoaded, contaEmailList, folderList)),
            take(1)
        );
    }

    canPass(folderLoaded: any, contaEmailList: ContaEmail[], folderList: Folder[]): boolean
    {
        if (contaEmailList?.length && (this.routerState.params['contaEmailHandle'] === 'default' || this.routerState.params['contaEmailHandle'] != folderLoaded)) {
            return false;
        }

        if (folderList?.length && (this.routerState.params['contaEmailHandle'] != folderLoaded || this.routerState.params['folderHandle'] === 'default')) {
            return false;
        }

        return true;
    }

}
