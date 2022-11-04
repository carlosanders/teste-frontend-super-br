import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {modulesConfig} from '../../../../../../modules/modules-config';
import {CdkSidebarService} from '../../../../../../@cdk/components/sidebar/sidebar.service';
import {CdkUtils} from "../../../../../../@cdk/utils";

@Component({
    selector       : 'pesquisa-main-sidebar',
    templateUrl    : './main-sidebar.component.html',
    styleUrls      : ['./main-sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation  : ViewEncapsulation.None,
    animations: cdkAnimations
})
export class PesquisaMainSidebarComponent implements OnInit {

    menu: any[] = [];
    roles: any[] = [];

    /**
     * Constructor
     *
     */
    constructor(
        private _cdkSidebarService: CdkSidebarService
    )
    {
        this.menu['administrativo'] = [
            {
                nome: 'Processos',
                icon: 'book',
                link: 'processos',
                role: ['ROLE_USER']
            },
            {
                nome: 'Documentos',
                icon: 'insert_drive_file',
                link: 'documentos',
                role: ['ROLE_COLABORADOR']
            }
        ];

        this.roles['administrativo'] = this.menu['administrativo']
            .map(link => link.role)
            .flat()
            .filter((x, i, a) => x && a.indexOf(x) === i);

        const path = 'app/main/apps/pesquisa/sidebars/main';

        modulesConfig.forEach((module) => {
            if (module.sidebars.hasOwnProperty(path)) {
                let moduleLinks: any[] = [];
                module.sidebars[path].forEach((s => moduleLinks.push(s)));
                this.menu[module['label'] ? module['label'].toLowerCase() : module['name'].toLowerCase()] = CdkUtils.sortArraySideBar(moduleLinks);
                this.roles[module['label'] ? module['label'].toLowerCase() : module['name'].toLowerCase()] =
                    moduleLinks.map(link => link.role)
                        .flat()
                        .filter((x, i, a) => x && a.indexOf(x) === i);
            }
        });
    }

    ngOnInit(): void {

    }

    fecharSidebar() {
        if(!this._cdkSidebarService.getSidebar('pesquisa-main-sidebar').isLockedOpen) {
            this._cdkSidebarService.getSidebar('pesquisa-main-sidebar').close();
        }
    }
}
