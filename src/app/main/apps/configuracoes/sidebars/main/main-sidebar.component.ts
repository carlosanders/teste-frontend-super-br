import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {LoginService} from '../../../../auth/login/login.service';
import {modulesConfig} from '../../../../../../modules/modules-config';
import {CdkSidebarService} from '../../../../../../@cdk/components/sidebar/sidebar.service';

@Component({
    selector: 'configuracoes-main-sidebar',
    templateUrl: './main-sidebar.component.html',
    styleUrls: ['./main-sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ConfiguracoesMainSidebarComponent implements OnInit, OnDestroy {

    links: any;

    /**
     * Constructor
     */
    constructor(
        private _loginService: LoginService,
        private _cdkSidebarService: CdkSidebarService,
    ) {

        if (this._loginService.isGranted('ROLE_COLABORADOR')) {
            this.links = [
                {
                    nome: 'Perfil',
                    icon: 'person',
                    link: 'perfil'
                },
                {
                    nome: 'Segurança',
                    icon: 'security',
                    link: 'seguranca'
                },
                {
                    nome: 'Afastamentos',
                    icon: 'event_busy',
                    link: 'afastamentos'
                },
                {
                    nome: 'Lotações',
                    icon: 'edit_location',
                    link: 'lotacoes'
                },
                {
                    nome: 'Assessores',
                    icon: 'group',
                    link: 'assessores'
                },
                {
                    nome: 'Modelos',
                    icon: 'file_copy',
                    link: 'modelos'
                },
                {
                    nome: 'Repositórios',
                    icon: 'add_comment',
                    link: 'repositorios'
                },
                {
                    nome: 'Notificações',
                    icon: 'notifications',
                    link: 'notificacoes'
                },
                {
                    nome: 'Pastas',
                    icon: 'folder',
                    link: 'pastas'
                },
                {
                    nome: 'Etiquetas',
                    icon: 'label',
                    link: 'etiquetas'
                },
                {
                    nome: 'Acompanhamentos',
                    icon: 'record_voice_over',
                    link: 'acompanhamentos'
                },
                {
                    nome: 'Grupo de Contatos',
                    icon: 'contacts',
                    link: 'grupo-contato'
                },
                {
                    nome: 'Histórico',
                    icon: 'history',
                    link: 'historico'
                },
                // {
                //    nome: 'Favoritos',
                //    icon: 'star_border',
                //    link: 'favoritos'
                // }
            ];
        }

        if (!this._loginService.isGranted('ROLE_COLABORADOR')) {
            this.links = [
                {
                    nome: 'Perfil',
                    icon: 'person',
                    link: 'perfil'
                },
                {
                    nome: 'Segurança',
                    icon: 'security',
                    link: 'seguranca'
                },
                {
                    nome: 'Notificações',
                    icon: 'notifications',
                    link: 'notificacoes'
                },
                {
                    nome: 'Etiquetas',
                    icon: 'label',
                    link: 'etiquetas'
                }
            ];
        }
        const path = 'app/main/apps/configuracoes/sidebars/main';

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

    fecharSidebar() {
        if(!this._cdkSidebarService.getSidebar('configuracoes-main-sidebar').isLockedOpen) {
            this._cdkSidebarService.getSidebar('configuracoes-main-sidebar').close();
        }
    }
}
