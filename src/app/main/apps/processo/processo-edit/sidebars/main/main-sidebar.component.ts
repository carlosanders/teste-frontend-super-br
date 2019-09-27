import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromStore from '../../../store';
import {getRouterState} from 'app/store/reducers';

@Component({
    selector: 'processo-edit-main-sidebar',
    templateUrl: './main-sidebar.component.html',
    styleUrls: ['./main-sidebar.component.scss']
})
export class ProcessoEditMainSidebarComponent implements OnInit, OnDestroy {

    links: any;
    routerState: any;

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    constructor(private _store: Store<fromStore.ProcessoAppState>) {

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
                nome: 'Juntadas',
                link: 'juntadas'
            },
            {
                nome: 'Vinculações',
                link: 'vinculacoes-processos'
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
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
    }

}
