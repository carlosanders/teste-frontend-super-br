import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {LoginService} from '../../../../auth/login/login.service';
import {Colaborador, Lotacao, ModalidadeOrgaoCentral, Setor, Usuario} from '@cdk/models';

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
    colaborador: Colaborador;
    usuario: Usuario;

    setores: Setor[] = [];
    orgaosCentrais: ModalidadeOrgaoCentral[] = [];

    /**
     *
     * @param _loginService
     */
    constructor(
        private _loginService: LoginService
    ) {

        this.usuario = this._loginService.getUserProfile();
        this.colaborador = this.usuario.colaborador;

        this.colaborador.lotacoes.forEach((lotacao: Lotacao) => {
            if (!this.setores.includes(lotacao.setor) && lotacao.coordenador) {
                this.setores.push(lotacao.setor);
            }
        });

        this.links = [
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
                nome: 'Usuários',
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

