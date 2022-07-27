import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, of, Subject} from 'rxjs';
import {Processo} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import * as fromStore from 'app/main/apps/processo/store';
import {filter, switchMap, takeUntil} from 'rxjs/operators';
import {getRouterState} from 'app/store/reducers';
import {NavigationEnd, Router} from '@angular/router';
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
    linksEdit: any;
    routerState: any;

    processo$: Observable<Processo>;
    processo: Processo;

    label = 'Protocolo';
    nup = '';
    generoProcesso = '';
    isOpenEditar = false;
    itemEditar;
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     * Constructor
     */
    constructor(
        private _store: Store<fromStore.ProcessoAppState>,
        private _cdkSidebarService: CdkSidebarService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        public _loginService: LoginService
    ) {
        this.processo$ = this._store.pipe(select(fromStore.getProcesso));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Listen for router events
        this._router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            takeUntil(this._unsubscribeAll)
        ).subscribe((event: NavigationEnd) => {
            // Check if the url can be found in
            // one of the children of this item
            if (this.isUrlInChildren(this.itemEditar, event.urlAfterRedirects)) {
                this.expand();
            } else {
                this.collapse();
            }
        });

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
            this._changeDetectorRef.markForCheck();
        });

        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
            this.linksEdit = [];

            if (!this.routerState.url.includes('dados-basicos-steps')) {
                const pathEdit = 'app/main/apps/processo/processo-edit/sidebars/main';

                modulesConfig.forEach((module) => {
                    if (module.sidebars.hasOwnProperty(pathEdit)) {
                        module.sidebars[pathEdit].forEach((s => this.linksEdit.push(s)));
                    }
                });

                this.linksEdit.push(
                    {
                        index: 10,
                        nome: 'Dados Básicos',
                        link: 'editar/dados-basicos',
                    },
                    {
                        index: 20,
                        nome: 'Assuntos',
                        link: 'editar/assuntos'
                    },
                    {
                        index: 30,
                        nome: 'Interessados',
                        link: 'editar/interessados'
                    },
                    {
                        index: 40,
                        nome: 'Volumes',
                        link: 'editar/volumes',
                        role: 'ROLE_COLABORADOR'
                    },
                    {
                        index: 50,
                        nome: 'Juntadas',
                        link: 'editar/juntadas',
                        role: 'ROLE_COLABORADOR'
                    },
                    {
                        index: 60,
                        nome: 'Vinculações',
                        link: 'editar/vinculacoes-processos',
                        role: 'ROLE_COLABORADOR'
                    },
                    {
                        index: 70,
                        nome: 'Relevâncias',
                        link: 'editar/relevancias',
                        role: 'ROLE_COLABORADOR'
                    },
                    {
                        index: 80,
                        nome: 'Sigilos',
                        link: 'editar/sigilos',
                        role: 'ROLE_COLABORADOR'
                    },
                    {
                        index: 90,
                        nome: 'Restrições de Acesso',
                        link: 'editar/acessos',
                        role: 'ROLE_COLABORADOR'
                    },
                    {
                        index: 110,
                        nome: 'Tarefas',
                        link: 'editar/tarefas',
                        role: 'ROLE_COLABORADOR'
                    },
                    {
                        index: 120,
                        nome: 'Ofícios',
                        link: 'editar/oficios',
                        role: 'ROLE_COLABORADOR'
                    },
                    {
                        index: 130,
                        nome: 'Remessas',
                        link: 'editar/remessas',
                        role: 'ROLE_COLABORADOR'
                    },
                    {
                        index: 140,
                        nome: 'Temporalidades e Destinações',
                        link: 'editar/transicoes',
                        role: 'ROLE_COLABORADOR'
                    },
                    {
                        index: 150,
                        nome: 'Tramitações',
                        link: 'editar/tramitacoes',
                        role: 'ROLE_COLABORADOR',
                        canShow: (processo$: Observable<Processo>): Observable<boolean> => processo$.pipe(
                            filter(processo => !!processo),
                            switchMap((processo) => {
                                if (processo.acessoNegado || processo.modalidadeMeio?.valor === 'ELETRÔNICO') {
                                    return of(false);
                                }
                                return of(true);
                            })
                        )
                    },
                    {
                        index: 160,
                        nome: 'Histórico',
                        link: 'editar/historico',
                        role: 'ROLE_COLABORADOR'
                    }
                );
                this.linksEdit = this.linksEdit.sort((a, b) => a.index - b.index);
            } else {
                this.linksEdit.push(
                    {
                        index: 10,
                        nome: 'Dados Básicos',
                        link: 'editar/dados-basicos-steps/' + this.routerState.params['generoHandle'],
                    }
                );
            }

            this.links = [
                {
                    nome: 'Visualizar',
                    icon: 'library_books',
                    link: 'visualizar',
                    type: 'item',
                    processo: true,
                    role: 'ROLE_USER'
                },
                {
                    nome: 'Editar',
                    icon: 'edit',
                    type: 'collapsable',
                    link: undefined,
                    processo: true,
                    role: 'ROLE_COLABORADOR',
                    children: this.linksEdit,
                    canShow: (processo$: Observable<Processo>): Observable<boolean> => processo$.pipe(
                        filter(processo => !!processo),
                        switchMap((processo) => {
                            if (processo.acessoNegado || processo.somenteLeitura) {
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
                    type: 'item',
                    processo: true,
                    role: 'ROLE_USER'
                },
                {
                    nome: 'Fluxo de Trabalho',
                    icon: 'timeline',
                    type: 'item',
                    link: 'timeline',
                    processo: true,
                    role: 'ROLE_COLABORADOR',
                    canShow: (processo$: Observable<Processo>): Observable<boolean> => processo$.pipe(
                        filter(processo => !!processo),
                        switchMap((processo) => {
                            if (processo.acessoNegado || processo.somenteLeitura) {
                                return of(false);
                            }
                            return of(true);
                        })
                    )
                },
            ];

            const path = 'app/main/apps/processo/sidebars/main';

            modulesConfig.forEach((module) => {
                if (module.sidebars.hasOwnProperty(path)) {
                    module.sidebars[path].forEach((s => this.links.push(s)));
                }
            });

            this.itemEditar = this.links[1];

            // Check if the url can be found in
            // one of the children of this item
            if (this.isUrlInChildren(this.itemEditar, this._router.url)) {
                this.expand();
            } else {
                this.collapse();
            }
            this._changeDetectorRef.markForCheck();
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

    /**
     * Toggle collapse
     *
     * @param ev
     */
    toggleOpenEditar(ev): void {
        ev.preventDefault();

        this.isOpenEditar = !this.isOpenEditar;
    }

    /**
     * Expand the collapsable navigation
     */
    expand(): void {
        if (this.isOpenEditar) {
            return;
        }

        this.isOpenEditar = true;

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Collapse the collapsable navigation
     */
    collapse(): void {
        if (!this.isOpenEditar) {
            return;
        }

        this.isOpenEditar = false;

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Check if the given parent has the
     * given item in one of its children
     *
     * @param parent
     * @param item
     * @returns
     */
    isChildrenOf(parent, item): boolean {
        const children = parent.children;

        if (!children) {
            return false;
        }

        if (children.indexOf(item) > -1) {
            return true;
        }

        for (const child of children) {
            if (child.children) {
                if (this.isChildrenOf(child, item)) {
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * Check if the given url can be found
     * in one of the given parent's children
     *
     * @param parent
     * @param url
     * @returns
     */
    isUrlInChildren(parent, url): boolean {
        const children = parent?.children;

        if (!children) {
            return false;
        }

        for (const child of children) {
            if (child.children) {
                if (this.isUrlInChildren(child, url)) {
                    return true;
                }
            }

            if (child.link === url || url.includes(child.link)) {
                return true;
            }
        }

        return false;
    }
}
