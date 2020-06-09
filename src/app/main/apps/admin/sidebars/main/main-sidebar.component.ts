import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Colaborador} from '@cdk/models';
import {LoginService} from '../../../../auth/login/login.service';
import {modulesConfig} from "../../../../../../modules/modules-config";


@Component({
    selector: 'admin-main-sidebar',
    templateUrl: './main-sidebar.component.html',
    styleUrls: ['./main-sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class MainSidebarComponent implements OnInit, OnDestroy {

    links: any;
    colaborador: Colaborador;
    /**
     * Constructor
     */
    constructor(
        public _loginService: LoginService
    ) {
        this.colaborador = this._loginService.getUserProfile().colaborador;

        this.links = [
            {
                nome: 'Assuntos',
                icon: 'subject',
                link: 'assuntos'
            },
            {
                nome: 'Espécie Atividades',
                icon: 'local_activity',
                link: 'especie-atividades'
            },
            {
                nome: 'Espécie Relevâncias',
                icon: 'new_releases',
                link: 'especie-relevancias'
            },
            {
                nome: 'Espécie Tarefas',
                icon: 'check_box',
                link: 'especie-tarefas'
            },
            {
                nome: 'Usuários',
                icon: 'person',
                link: 'usuarios'
            },
            {
                nome: 'Usuários Externos',
                icon: 'person',
                link: 'externos'
            },
            {
                nome: 'Tipos de Documentos',
                icon: 'class',
                link: 'tipos-documentos'
            },
            {
                nome: 'Tipos de Relatórios',
                icon: 'assessment',
                link: 'tipos-relatorios'
            },
            {
                nome: 'Templates',
                icon: 'view_array',
                link: 'templates'
            },
            {
                nome: 'Unidades',
                icon: 'location_city',
                link: 'unidades'
            }
        ];

        const path = 'app/main/apps/admin/sidebars/main';

        modulesConfig.forEach((module) => {
            if (module.sidebars.hasOwnProperty(path)) {
                module.sidebars[path].forEach((s => this.links.push(s)));
            }
        });
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

