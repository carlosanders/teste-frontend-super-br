import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

import { fuseAnimations } from '@fuse/animations';

@Component({
    selector       : 'pesquisa-main-sidebar',
    templateUrl    : './main-sidebar.component.html',
    styleUrls      : ['./main-sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation  : ViewEncapsulation.None,
    animations: fuseAnimations
})
export class PesquisaMainSidebarComponent
{

    links: any;

    /**
     * Constructor
     *
     */
    constructor(
    )
    {

        this.links = [
            {
                nome: 'Processos',
                icon: 'book',
                link: 'processos'
            },
            {
                nome: 'Documentos',
                icon: 'insert_drive_file',
                link: 'documentos'
            }
        ];
    }
}
