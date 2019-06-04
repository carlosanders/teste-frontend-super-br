import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';

@Component({
    selector: 'configuracoes-main-sidebar',
    templateUrl: './main-sidebar.component.html',
    styleUrls: ['./main-sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ConfiguracoesMainSidebarComponent implements OnInit, OnDestroy {

    links: any;

    /**
     * Constructor
     */
    constructor(
    ) {

        this.links = [
            {
                'nome': 'Perfil',
                'icon': 'person',
                'link': 'perfil'
            },
            {
                'nome': 'Segurança',
                'icon': 'security',
                'link': 'seguranca'
            },
            {
                'nome': 'Lotações',
                'icon': 'edit_location',
                'link': 'lotacoes'
            },
            {
                'nome': 'Analistas',
                'icon': 'group',
                'link': 'analistas'
            },
            {
                'nome': 'Modelos',
                'icon': 'file_copy',
                'link': 'modelos'
            },
            {
                'nome': 'Repositórios',
                'icon': 'add_comment',
                'link': 'repositorios'
            },
            {
                'nome': 'Pastas',
                'icon': 'folder',
                'link': 'pastas'
            },
            {
                'nome': 'Etiquetas',
                'icon': 'label',
                'link': 'etiquetas'
            }
        ];
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
    }
}
