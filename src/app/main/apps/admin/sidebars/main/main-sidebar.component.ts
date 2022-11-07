import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {Colaborador} from '@cdk/models';
import {LoginService} from '../../../../auth/login/login.service';
import {CdkUtils} from '@cdk/utils';
import {modulesConfig} from '../../../../../../modules/modules-config';
import {CdkSidebarService} from '../../../../../../@cdk/components/sidebar/sidebar.service';

@Component({
    selector: 'admin-main-sidebar',
    templateUrl: './main-sidebar.component.html',
    styleUrls: ['./main-sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class MainSidebarComponent implements OnInit, OnDestroy {

    links: any = [];
    roles: any[] = [];
    colaborador: Colaborador;

    /**
     * Constructor
     */
    constructor(
        public _loginService: LoginService,
        private _cdkSidebarService: CdkSidebarService,
    ) {
        this.colaborador = this._loginService.getUserProfile().colaborador;

        const links = [
            {
                nome: 'Configuração Módulos',
                icon: 'extension',
                link: 'config-modulo',
                role: ['ROLE_ADMIN']
            },
            {
                nome: 'Órgãos Centrais',
                icon: 'business',
                link: 'modalidade-orgao-central',
                role: ['ROLE_ADMIN']
            },
            {
                nome: 'Espécies de Tarefas',
                icon: 'check_box',
                link: 'especie-tarefas',
                role: ['ROLE_ADMIN']
            },
            {
                nome: 'Espécies de Setores',
                icon: 'place',
                link: 'especie-setor',
                role: ['ROLE_ADMIN']
            },
            {
                nome: 'Espécies de Atividades',
                icon: 'local_activity',
                link: 'especie-atividades',
                role: ['ROLE_ADMIN']
            },
            {
                nome: 'Espécies de Processos',
                icon: 'insert_drive_file',
                link: 'especie-processo',
                role: ['ROLE_ADMIN']
            },
            {
                nome: 'Unidades',
                icon: 'location_city',
                link: 'unidades',
                role: ['ROLE_ADMIN']
            },
            {
                nome: 'Usuários',
                icon: 'person',
                link: 'usuarios',
                role: ['ROLE_ADMIN']
            },
            {
                nome: 'Usuários Externos',
                icon: 'person',
                link: 'externos',
                role: ['ROLE_ADMIN']
            },
            {
                nome: 'Espécies de Relevâncias',
                icon: 'new_releases',
                link: 'especie-relevancias',
                role: ['ROLE_ADMIN']
            },
            {
                nome: 'Tipos de Documentos',
                icon: 'class',
                link: 'tipos-documentos',
                role: ['ROLE_ADMIN']
            },
            {
                nome: 'Tipos de Relatórios',
                icon: 'assessment',
                link: 'tipos-relatorios',
                role: ['ROLE_ADMIN']
            },
            {
                nome: 'Assuntos',
                icon: 'subject',
                link: 'assuntos',
                role: ['ROLE_ADMIN']
            },
            {
                nome: 'Templates',
                icon: 'view_array',
                link: 'templates',
                role: ['ROLE_ADMIN']
            },
            {
                nome: 'Classificações',
                icon: 'low_priority',
                link: 'classificacoes',
                role: ['ROLE_ADMIN']
            },
            {
                nome: 'Pessoas',
                icon: 'people',
                link: 'pessoas',
                role: ['ROLE_ADMIN']
            },
            {
                nome: 'Municípios',
                icon: 'location_on',
                link: 'municipios',
                role: ['ROLE_ADMIN']
            },
            {
                nome: 'Cargos',
                icon: 'supervisor_account',
                link: 'cargos',
                role: ['ROLE_ADMIN']
            },
            {
                nome: 'Workflows',
                icon: 'low_priority',
                link: 'workflows',
                role: ['ROLE_ADMIN']
            },
            {
                nome: 'Avisos',
                icon: 'info',
                link: 'avisos',
                role: ['ROLE_ADMIN']
            },
            {
                nome: 'Servidores de Email',
                icon: 'mail',
                link: 'servidor-email',
                role: ['ROLE_ADMIN']
            },
            {
                nome: 'Espécies de Documento Avulso',
                icon: 'description',
                link: 'especie-documento-avulso',
                role: ['ROLE_ADMIN']
            },
            {
                nome: 'Modelos em Branco',
                icon: 'file_copy',
                link: 'modelos',
                role: ['ROLE_ADMIN']
            },
            {
                nome: 'Cronjob',
                icon: 'alarm',
                link: 'cronjob',
                role: ['ROLE_ADMIN']
            },
        ];

        this.links['administrativo'] = CdkUtils.sortArraySideBar(links);

        this.roles['administrativo'] = this.links['administrativo']
            .map(link => link.role)
            .flat()
            .filter((x, i, a) => x && a.indexOf(x) === i);

        const path = 'app/main/apps/admin/sidebars/main';
        modulesConfig.forEach((module) => {
            if (module.sidebars.hasOwnProperty(path)) {
                let modulesLink = [];
                module.sidebars[path].forEach((s => modulesLink.push(s)));
                modulesLink = CdkUtils.sortArraySideBar(modulesLink);
                this.links[module['label'] ? module['label'].toLowerCase() : module['name'].toLowerCase()] = modulesLink;
                this.roles[module['label'] ? module['label'].toLowerCase() : module['name'].toLowerCase()] =
                    modulesLink.map(link => link.role)
                        .flat()
                        .filter((x, i, a) => x && a.indexOf(x) === i);
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

    fecharSidebar(): void {
        if (!this._cdkSidebarService.getSidebar('admin-main-sidebar').isLockedOpen) {
            this._cdkSidebarService.getSidebar('admin-main-sidebar').close();
        }
    }
}

