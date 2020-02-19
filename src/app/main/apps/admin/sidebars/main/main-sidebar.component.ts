import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';

@Component({
    selector: 'admin-main-sidebar',
    templateUrl: './main-sidebar.component.html',
    styleUrls: ['./main-sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AdminMainSidebarComponent implements OnInit, OnDestroy {

    links: any;

    /**
     * Constructor
     */
    constructor(
    ) {

        this.links = [
            {
                nome: 'Setor',
                icon: 'group',
                link: 'setor'
            },
            {
                nome: 'Lotações',
                icon: 'edit_location',
                link: 'lotacoes'
            },
            {
                nome: 'Localizador',
                icon: 'edit_location',
                link: 'localizador'
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

