import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromStore from '../../../store';
import {getRouterState} from 'app/store/reducers';
import {Observable} from 'rxjs';
import {Processo} from '@cdk/models';
import {modulesConfig} from 'modules/modules-config';
import {getProcesso} from '../../../store';
import {filter} from 'rxjs/operators';
import {LoginService} from '../../../../../auth/login/login.service';

@Component({
    selector: 'processo-edit-main-sidebar',
    templateUrl: './main-sidebar.component.html',
    styleUrls: ['./main-sidebar.component.scss']
})
export class ProcessoEditMainSidebarComponent implements OnInit, OnDestroy {

    links: any;
    routerState: any;

    processo$: Observable<Processo>;
    processo: Processo;

    generoProcesso = 'ADMINISTRATIVO';

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    constructor(
        private _store: Store<fromStore.ProcessoAppState>,
        public _loginService: LoginService
    ) {
        this.processo$ = this._store.pipe(select(getProcesso));
    }

    /**
     * On init
     */
    ngOnInit(): void {

        this._store
            .pipe(
                select(getRouterState)
            ).subscribe(routerState => {
            if (routerState) {
                this.routerState = routerState.state;
            }
        });

        this.processo$.pipe(
            filter((processo) => !!processo)
        ).subscribe(
            processo => {
                this.processo = processo;
                this.generoProcesso = processo.especieProcesso.generoProcesso.nome;
            }
        );

        this.links = [];

        const path = 'app/main/apps/processo/processo-edit/sidebars/main';

        modulesConfig.forEach((module) => {
            if (module.sidebars.hasOwnProperty(path)) {
                module.sidebars[path].forEach((s => this.links.push(s)));
            }
        });

        this.links.push(
            {
                nome: 'Dados Básicos',
                link: 'dados-basicos',
            },
            {
                nome: 'Assuntos',
                link: 'assuntos'
            },
            {
                nome: 'Interessados',
                link: 'interessados'
            },
            {
                nome: 'Volumes',
                link: 'volumes',
                role: 'ROLE_COLABORADOR'
            },
            {
                nome: 'Juntadas',
                link: 'juntadas',
                role: 'ROLE_COLABORADOR'
            },
            {
                nome: 'Vinculações',
                link: 'vinculacoes-processos',
                role: 'ROLE_COLABORADOR'
            },
            { 
                nome: 'Relevâncias',
                link: 'relevancias',
                role: 'ROLE_COLABORADOR'
            },
            {
                nome: 'Sigilos',
                link: 'sigilos',
                role: 'ROLE_COLABORADOR'
            },
            {
                nome: 'Restrições de Acesso',
                link: 'acessos',
                role: 'ROLE_COLABORADOR'
            },
            {
                nome: 'Tarefas',
                link: 'tarefas',
                role: 'ROLE_COLABORADOR'
            },
            {
                nome: 'Ofícios',
                link: 'oficios',
                role: 'ROLE_COLABORADOR'
            },
            {
                nome: 'Garantias',
                link: 'garantias',
                role: 'ROLE_COLABORADOR'
            },            
            {
                nome: 'Tramitações',
                link: 'tramitacoes',
                role: 'ROLE_COLABORADOR'
            },
            {
                nome: 'Remessas',
                link: 'remessas',
                role: 'ROLE_COLABORADOR'
            },
            {
                nome: 'Transições',
                link: 'transicoes',
                role: 'ROLE_COLABORADOR'
            }
        );

    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
    }

}
