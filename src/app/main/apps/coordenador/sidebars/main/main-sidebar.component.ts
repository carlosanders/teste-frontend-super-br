import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {LoginService} from '../../../../auth/login/login.service';
import {ModalidadeOrgaoCentral, Setor, Usuario} from '@cdk/models';
import {Coordenador} from '@cdk/models/coordenador.model';
import {modulesConfig} from '../../../../../../modules/modules-config';
import {CdkSidebarService} from '../../../../../../@cdk/components/sidebar/sidebar.service';

@Component({
    selector: 'coordenador-main-sidebar',
    templateUrl: './main-sidebar.component.html',
    styleUrls: ['./main-sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CoordenadorMainSidebarComponent implements OnInit, OnDestroy {

    links: any;
    linksNacional: any;
    linksUnidade: any;
    linksLocal: any;
    usuario: Usuario;

    setores: Setor[] = [];
    orgaos: ModalidadeOrgaoCentral[] = [];
    unidades: Setor[] = [];

    /**
     *
     * @param _loginService
     * @param _cdkSidebarService
     */
    constructor(
        private _loginService: LoginService,
        private _cdkSidebarService: CdkSidebarService,
    ) {

        this.usuario = this._loginService.getUserProfile();

        this.usuario.coordenadores.forEach((coordenador: Coordenador) => {
            if (coordenador.orgaoCentral && !this.orgaos.includes(coordenador.orgaoCentral)) {
                this.orgaos.push(coordenador.orgaoCentral);
            }
            if (coordenador.unidade && !this.unidades.includes(coordenador.unidade)) {
                this.unidades.push(coordenador.unidade);
            }
            if (coordenador.setor && !this.setores.includes(coordenador.setor)) {
                this.setores.push(coordenador.setor);
            }
        });

        this.linksNacional = [
            {
                nome: 'Modelos Nacionais',
                icon: 'file_copy',
                link: 'modelos'
            },
            {
                nome: 'Repositórios Nacionais',
                icon: 'add_comment',
                link: 'repositorios'
            },
            {
                nome: 'Etiquetas Nacionais',
                icon: 'label',
                link: 'etiquetas'
            },
            {
                nome: 'Usuários Nacionais',
                icon: 'person',
                link: 'usuarios'
            },
            {
                nome: 'Unidades',
                icon: 'location_city',
                link: 'unidades'
            },
            {
                nome: 'Avisos',
                icon: 'info',
                link: 'avisos'
            }
        ];

        this.linksUnidade = [
            {
                nome: 'Modelos da Unidade',
                icon: 'file_copy',
                link: 'modelos'
            },
            {
                nome: 'Repositórios da Unidade',
                icon: 'add_comment',
                link: 'repositorios'
            },
            {
                nome: 'Etiquetas da Unidade',
                icon: 'label',
                link: 'etiquetas'
            },
            {
                nome: 'Usuários da Unidade',
                icon: 'person',
                link: 'usuarios'
            },
            {
                nome: 'Setores da Unidade',
                icon: 'domain',
                link: 'setor'
            },
            {
                nome: 'Avisos da Unidade',
                icon: 'info',
                link: 'avisos'
            },
            {
                nome: 'Contas de E-mail',
                icon: 'mail',
                link: 'contas-email'
            }
        ];

        this.linksLocal = [
            {
                nome: 'Modelos do Setor',
                icon: 'file_copy',
                link: 'modelos'
            },
            {
                nome: 'Repositórios do Setor',
                icon: 'add_comment',
                link: 'repositorios'
            },
            {
                nome: 'Etiquetas do Setor',
                icon: 'label',
                link: 'etiquetas'
            },
            {
                nome: 'Usuários do Setor',
                icon: 'person',
                link: 'usuarios'
            },
            {
                nome: 'Avisos do Setor',
                icon: 'info',
                link: 'avisos'
            }
        ];
        const mainPath = 'app/main/apps/coordenador/sidebars/main';
        const nacionalPath = 'app/main/apps/coordenador/sidebars/main#nacional';
        const unidadePath = 'app/main/apps/coordenador/sidebars/main#unidade';
        const setorPath = 'app/main/apps/coordenador/sidebars/main#setor';

        modulesConfig.forEach((module) => {
            if (module.sidebars.hasOwnProperty(mainPath)) {
                module.sidebars[mainPath].forEach((s => this.links.push(s)));
            }
            if (module.sidebars.hasOwnProperty(nacionalPath)) {
                module.sidebars[nacionalPath].forEach((s => this.linksNacional.push(s)));
            }
            if (module.sidebars.hasOwnProperty(unidadePath)) {
                module.sidebars[unidadePath].forEach((s => this.linksUnidade.push(s)));
            }
            if (module.sidebars.hasOwnProperty(setorPath)) {
                module.sidebars[setorPath].forEach((s => this.linksLocal.push(s)));
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
        if(!this._cdkSidebarService.getSidebar('coordenador-main-sidebar').isLockedOpen) {
            this._cdkSidebarService.getSidebar('coordenador-main-sidebar').close();
        }
    }
}

