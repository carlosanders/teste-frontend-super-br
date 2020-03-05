import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
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
    animations: fuseAnimations
})
export class AdminMainSidebarComponent implements OnInit, OnDestroy {

    links: any;
    colaborador: Colaborador;
    unidades: Setor[] = [];

    /**
     * Constructor
     */
    constructor(
        private _loginService: LoginService
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
                nome: 'Lotações',
                icon: 'map',
                link: 'lotacoes'
            },
            {
                nome: 'Localizadores',
                icon: 'edit_location',
                link: 'localizador'
            },
            {
                nome: 'Nºs únicos',
                icon: 'edit_location',
                link: 'numero-unico-documento'
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

