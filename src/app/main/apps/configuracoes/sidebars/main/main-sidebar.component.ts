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
                'nome': 'Interface',
                'icon': 'desktop_windows',
                'link': 'interface'
            },
            {
                'nome': 'Lotações',
                'icon': 'edit_location',
                'link': 'lotacoes'
            },
            {
                'nome': 'Modelos',
                'icon': 'file_copy',
                'link': 'modelos'
            },
            {
                'nome': 'Pastas',
                'icon': 'folder',
                'link': 'pastas'
            },
            {
                'nome': 'Etiquetas',
                'icon': 'label',
                'link': 'etiqueta'
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
