import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {LoginService} from '../../../../auth/login/login.service';
import {Colaborador} from '@cdk/models';

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

    /**
     * Constructor
     */
    constructor(
        public _loginService: LoginService
    ) {

        this.colaborador = this._loginService.getUserProfile().colaborador;

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

