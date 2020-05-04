import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {LoginService} from '../../../../auth/login/login.service';
import {Colaborador, Lotacao, ModalidadeOrgaoCentral, Setor, Usuario, VinculacaoOrgaoCentralUsuario} from '@cdk/models';
import {Coordenador} from "../../../../../../@cdk/models/coordenador.model";

@Component({
    selector: 'coordenador-main-sidebar',
    templateUrl: './main-sidebar.component.html',
    styleUrls: ['./main-sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CoordenadorMainSidebarComponent implements OnInit, OnDestroy {

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
     */
    constructor(
        private _loginService: LoginService
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
                nome: 'Usuários Nacionais',
                icon: 'person',
                link: 'usuarios'
            },
            {
                nome: 'Unidades',
                icon: 'location_city',
                link: 'unidades'
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
                nome: 'Usuários da Unidade',
                icon: 'person',
                link: 'usuarios'
            },
            {
                nome: 'Setores da Unidade',
                icon: 'domain',
                link: 'unidades'
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
                nome: 'Usuários do Setor',
                icon: 'person',
                link: 'usuarios'
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

