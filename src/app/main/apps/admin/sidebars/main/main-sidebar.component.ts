import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Colaborador} from '@cdk/models';
import {LoginService} from '../../../../auth/login/login.service';
import {CdkUtils} from '../../../../../../@cdk/utils';
import {modulesConfig} from '../../../../../../modules/modules-config';


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
                nome: 'Modalidade Órgão Central',
                icon: 'business',
                link: 'modalidade-orgao-central'
            },
            {
                nome: 'Espécie Tarefas',
                icon: 'check_box',
                link: 'especie-tarefas'
            },
            {
                nome: 'Espécie Atividades',
                icon: 'local_activity',
                link: 'especie-atividades'
            },
            {
                nome: 'Espécie Processo',
                icon: 'insert_drive_file',
                link: 'especie-processo'
            },
            {
                nome: 'Unidades',
                icon: 'location_city',
                link: 'unidades'
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
                nome: 'Espécie Relevâncias',
                icon: 'new_releases',
                link: 'especie-relevancias'
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
                nome: 'Assuntos',
                icon: 'subject',
                link: 'assuntos'
            },
            {
                nome: 'Templates',
                icon: 'view_array',
                link: 'templates'
            },
            {
                nome: 'Classificações',
                icon: 'low_priority',
                link: 'classificacoes'
            },
            {
                nome: 'Pessoas',
                icon: 'people',
                link: 'pessoas'
            },
            {
                nome: 'Municípios',
                icon: 'location_on',
                link: 'municipios'
            },
            {
                nome: 'WorkFlows',
                icon: 'low_priority',
                link: 'workflows'
            }
        ];

        const path = 'app/main/apps/admin/sidebars/main';

        modulesConfig.forEach((module) => {
            if (module.sidebars.hasOwnProperty(path)) {
                module.sidebars[path].forEach((s => this.links.push(s)));
            }
            this.links = CdkUtils.sortArraySideBar(this.links);
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

