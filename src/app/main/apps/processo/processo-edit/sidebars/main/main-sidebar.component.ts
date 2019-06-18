import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
    selector: 'processo-edit-main-sidebar',
    templateUrl: './main-sidebar.component.html',
    styleUrls: ['./main-sidebar.component.scss']
})
export class ProcessoEditMainSidebarComponent implements OnInit, OnDestroy {

    links: any;

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this.links = [
            {
                'nome': 'Dados Básicos',
                'link': 'dados-basicos'
            },
            {
                'nome': 'Assuntos',
                'link': 'assuntos'
            },
            {
                'nome': 'Interessados',
                'link': 'interessados'
            },
            {
                'nome': 'Juntadas',
                'link': 'juntadas'
            },
            {
                'nome': 'Vinculações',
                'link': 'vinculacoes-processos'
            },
            {
                'nome': 'Sigilos',
                'link': 'sigilos'
            },
            {
                'nome': 'Tarefas',
                'link': 'tarefas'
            },
            {
                'nome': 'Ofícios',
                'link': 'oficios'
            },
            {
                'nome': 'Tramitações',
                'link': 'tramitacoes'
            },
            {
                'nome': 'Remessas',
                'link': 'remessas'
            },
            {
                'nome': 'Transições',
                'link': 'transicoes'
            }
        ];
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
    }

}
