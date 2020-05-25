import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

import { cdkAnimations } from '@cdk/animations';
import {modulesConfig} from "../../../../../../modules/modules-config";

@Component({
    selector       : 'pesquisa-main-sidebar',
    templateUrl    : './main-sidebar.component.html',
    styleUrls      : ['./main-sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation  : ViewEncapsulation.None,
    animations: cdkAnimations
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
                link: 'processos',
                role: 'ROLE_USER'
            },
            {
                nome: 'Documentos',
                icon: 'insert_drive_file',
                link: 'documentos',
                role: 'ROLE_USER'
            }
        ];

        const path = 'app/main/apps/pesquisa/sidebars/main';

        modulesConfig.forEach((module) => {
            if (module.sidebars.hasOwnProperty(path)) {
                module.sidebars[path].forEach((s => this.links.push(s)));
            }
        });
    }

}
