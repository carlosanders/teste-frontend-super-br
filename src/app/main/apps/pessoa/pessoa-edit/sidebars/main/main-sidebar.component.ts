import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
    selector: 'pessoa-edit-main-sidebar',
    templateUrl: './main-sidebar.component.html',
    styleUrls: ['./main-sidebar.component.scss']
})
export class PessoaEditMainSidebarComponent implements OnInit, OnDestroy {

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
                'link': 'dados-pessoa'
            },
            {
                'nome': 'Documentos',
                'link': 'documentos'
            },
            {
                'nome': 'Endereços',
                'link': 'enderecos'
            },
            {
                'nome': 'Relacionamentos',
                'link': 'relacionamentos'
            },
            {
                'nome': 'Outros Nomes',
                'link': 'nomes'
            }
        ];
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
    }

}
