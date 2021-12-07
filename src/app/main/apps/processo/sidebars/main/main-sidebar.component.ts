import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, of, Subject} from 'rxjs';
import {Processo} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import * as fromStore from 'app/main/apps/processo/store';
import {filter, switchMap, takeUntil} from 'rxjs/operators';
import {getRouterState} from 'app/store/reducers';
import {Router} from '@angular/router';
import {LoginService} from '../../../../auth/login/login.service';
import {modulesConfig} from '../../../../../../modules/modules-config';
import {CdkSidebarService} from '../../../../../../@cdk/components/sidebar/sidebar.service';

@Component({
    selector: 'processo-main-sidebar',
    templateUrl: './main-sidebar.component.html',
    styleUrls: ['./main-sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ProcessoMainSidebarComponent implements OnInit, OnDestroy {

    links: any;
    routerState: any;

    processo$: Observable<Processo>;
    processo: Processo;

    label = 'Protocolo';
    nup = '';
    generoProcesso = '';
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     * @param _router
     */

    /**
     * Constructor
     */
    constructor(
        private _store: Store<fromStore.ProcessoAppState>,
        private _cdkSidebarService: CdkSidebarService,
        private _router: Router,
        public _loginService: LoginService
    ) {

        this.processo$ = this._store.pipe(select(fromStore.getProcesso));

        this.links = [
            {
                nome: 'Visualizar',
                icon: 'library_books',
                link: 'visualizar',
                processo: true,
                role: 'ROLE_USER'
            },
            {
                nome: 'Editar',
                icon: 'edit',
                link: 'editar',
                processo: true,
                role: 'ROLE_COLABORADOR',
                canShow: (processo$: Observable<Processo>): Observable<boolean> => processo$.pipe(
                        filter(processo => !!processo),
                        switchMap((processo) => {
                            if (processo.somenteLeitura) {
                                return of(false);
                            }
                            return of(true);
                        })
                    )
            },
            {
                nome: 'Download',
                icon: 'cloud_download',
                link: 'download',
                processo: true,
                role: 'ROLE_USER'
            }
        ];

        const path = 'app/main/apps/processo/sidebars/main';

        modulesConfig.forEach((module) => {
            if (module.sidebars.hasOwnProperty(path)) {
                module.sidebars[path].forEach((s => this.links.push(s)));
            }
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.processo$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((processo) => {
            this.processo = processo;
            this.label = 'Protocolo';
            switch (this.processo?.unidadeArquivistica) {
                case 1:
                    this.label = 'Processo';
                    this.nup = this.processo?.NUPFormatado;
                    this.generoProcesso = this.processo?.especieProcesso?.generoProcesso?.nome;
                    break;
                case 2:
                    this.label = 'Documento Avulso';
                    this.nup = this.processo?.NUPFormatado;
                    this.generoProcesso = this.processo?.especieProcesso?.generoProcesso?.nome;
                    break;
                case 3:
                    this.label = 'Pasta';
                    this.nup = this.processo?.outroNumero;
                    this.generoProcesso = this.processo?.especieProcesso?.generoProcesso?.nome;
                    break;
                default:
                    this.label = 'Protocolo';
                    this.nup = '';
                    this.generoProcesso = '';
            }
        });

        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    /**
     * Toggle the sidebar
     */
    fecharSidebar(): void {
        if (!this._cdkSidebarService.getSidebar('processo-main-sidebar').isLockedOpen &&
            this.routerState.url.indexOf('apps/tarefas') > -1) {
            this._cdkSidebarService.getSidebar('processo-main-sidebar').close();
        }
    }
}
