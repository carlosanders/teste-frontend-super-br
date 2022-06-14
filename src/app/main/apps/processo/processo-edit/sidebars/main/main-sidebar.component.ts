import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromStore from '../../../store';
import {getProcesso} from '../../../store';
import {getRouterState} from 'app/store/reducers';
import {Observable, of, Subject} from 'rxjs';
import {Processo} from '@cdk/models';
import {modulesConfig} from 'modules/modules-config';
import {filter, switchMap, takeUntil} from 'rxjs/operators';
import {LoginService} from '../../../../../auth/login/login.service';
import {cdkAnimations} from '@cdk/animations';
import {CdkSidebarService} from '../../../../../../../@cdk/components/sidebar/sidebar.service';

@Component({
    selector: 'processo-edit-main-sidebar',
    templateUrl: './main-sidebar.component.html',
    styleUrls: ['./main-sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ProcessoEditMainSidebarComponent implements OnInit, OnDestroy {

    links: any;
    routerState: any;

    processo$: Observable<Processo>;
    processo: Processo;
    private _unsubscribeAll: Subject<any> = new Subject();

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    constructor(
        private _store: Store<fromStore.ProcessoAppState>,
        public _loginService: LoginService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _cdkSidebarService: CdkSidebarService,
    ) {
        this.processo$ = this._store.pipe(select(getProcesso));
    }

    /**
     * On init
     */
    ngOnInit(): void {

        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });


        this.processo$.pipe(
            filter(processo => !!processo),
            takeUntil(this._unsubscribeAll)
        ).subscribe((processo) => {
            this.processo = processo;
            this._changeDetectorRef.markForCheck();
        });

        this.links = [];

        const path = 'app/main/apps/processo/processo-edit/sidebars/main';

        modulesConfig.forEach((module) => {
            if (module.sidebars.hasOwnProperty(path)) {
                module.sidebars[path].forEach((s => this.links.push(s)));
            }
        });

        this.links.push(
            {
                index: 10,
                nome: 'Dados Básicos',
                link: 'dados-basicos',
            },
            {
                index: 20,
                nome: 'Assuntos',
                link: 'assuntos'
            },
            {
                index: 30,
                nome: 'Interessados',
                link: 'interessados'
            },
            {
                index: 40,
                nome: 'Volumes',
                link: 'volumes',
                role: 'ROLE_COLABORADOR'
            },
            {
                index: 50,
                nome: 'Juntadas',
                link: 'juntadas',
                role: 'ROLE_COLABORADOR'
            },
            {
                index: 60,
                nome: 'Vinculações',
                link: 'vinculacoes-processos',
                role: 'ROLE_COLABORADOR'
            },
            {
                index: 70,
                nome: 'Relevâncias',
                link: 'relevancias',
                role: 'ROLE_COLABORADOR'
            },
            {
                index: 80,
                nome: 'Sigilos',
                link: 'sigilos',
                role: 'ROLE_COLABORADOR'
            },
            {
                index: 90,
                nome: 'Restrições de Acesso',
                link: 'acessos',
                role: 'ROLE_COLABORADOR'
            },
            {
                index: 110,
                nome: 'Tarefas',
                link: 'tarefas',
                role: 'ROLE_COLABORADOR'
            },
            {
                index: 120,
                nome: 'Ofícios',
                link: 'oficios',
                role: 'ROLE_COLABORADOR'
            },
            {
                index: 130,
                nome: 'Remessas',
                link: 'remessas',
                role: 'ROLE_COLABORADOR'
            },
            {
                index: 140,
                nome: 'Temporalidades e Destinações',
                link: 'transicoes',
                role: 'ROLE_COLABORADOR'
            },
            {
                index: 150,
                nome: 'Tramitações',
                link: 'tramitacoes',
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
                link: 'historico',
                role: 'ROLE_COLABORADOR'
            }
        );

        this.links = this.links.sort((a, b) => a.index - b.index);
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    fecharSidebar(): void {
        if (!this._cdkSidebarService.getSidebar('processo-edit-main-sidebar').isLockedOpen) {
            this._cdkSidebarService.getSidebar('processo-edit-main-sidebar').close();
        }
    }
}
