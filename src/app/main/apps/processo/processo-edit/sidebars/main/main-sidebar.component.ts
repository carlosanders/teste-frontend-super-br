import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromStore from '../../../store';
import {getRouterState} from 'app/store/reducers';
import {Observable} from 'rxjs';
import {Processo} from '@cdk/models';
import {getProcesso} from '../../dados-basicos/store/selectors';

import {modulesConfig} from 'modules/modules-config';

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

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    constructor(private _store: Store<fromStore.ProcessoAppState>) {
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

        this.processo$.subscribe(
            processo => this.processo = processo
        );

        this.links = [
            {
                nome: 'Dados Básicos',
                link: 'dados-basicos'
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
                link: 'volumes'
            },
            {
                nome: 'Juntadas',
                link: 'juntadas'
            },
            {
                nome: 'Vinculações',
                link: 'vinculacoes-processos'
            },
            {
                nome: 'Relevâncias',
                link: 'relevancias'
            },
            {
                nome: 'Tarefas',
                link: 'tarefas'
            },
            {
                nome: 'Ofícios',
                link: 'oficios'
            },
            {
                nome: 'Garantias',
                link: 'garantias'
            },            
            {
                nome: 'Tramitações',
                link: 'tramitacoes'
            },
            {
                nome: 'Remessas',
                link: 'remessas'
            },
            {
                nome: 'Transições',
                link: 'transicoes'
            },
            {
                nome: 'Sigilos',
                link: 'sigilos'
            },
            {
                nome: 'Restrições de Acessos',
                link: 'acessos'
            }
        ];

        const path = 'app/main/apps/processo/processo-edit/sidebars/main';

        modulesConfig.forEach((module) => {
            if (module.sidebars.hasOwnProperty(path)) {
                module.sidebars[path].forEach((s => this.links.push(s)));
            }
        });

    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
    }

}
