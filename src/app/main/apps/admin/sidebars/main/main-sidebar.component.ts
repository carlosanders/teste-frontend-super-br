import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {LoginService} from "../../../../auth/login/login.service";
import {Colaborador} from "@cdk/models";
import {Setor} from "@cdk/models";
import {Lotacao} from "@cdk/models";

@Component({
    selector: 'admin-main-sidebar',
    templateUrl: './main-sidebar.component.html',
    styleUrls: ['./main-sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class AdminMainSidebarComponent implements OnInit, OnDestroy {

    links: any;
    colaborador: Colaborador;
    unidades: Setor[] = [];

    /**
     * Constructor
     */
    constructor(
        public _loginService: LoginService
    ) {

        this.colaborador = this._loginService.getUserProfile().colaborador;

        this.colaborador.lotacoes.forEach((lotacao: Lotacao) => {
            if (!this.unidades.includes(lotacao.setor.unidade)) {
                this.unidades.push(lotacao.setor.unidade);
            }
        });

        this.links = [
            {
                nome: 'Setores',
                icon: 'domain',
                link: 'setor'
            },
            {
                nome: 'Usuários',
                icon: 'person',
                link: 'usuario'
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

