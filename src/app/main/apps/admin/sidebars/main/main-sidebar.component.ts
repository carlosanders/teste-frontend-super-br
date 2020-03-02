import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {LoginService} from "../../../../auth/login/login.service";
import {Colaborador} from "@cdk/models/colaborador.model";
import {Setor} from "@cdk/models/setor.model";
import {Lotacao} from "../../../../../../@cdk/models/lotacao.model";

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

        console.log(this.colaborador.lotacoes);
        this.colaborador.lotacoes.forEach((lotacao: Lotacao) => {
            if (!this.unidades.includes(lotacao.setor.unidade)) {
                this.unidades.push(lotacao.setor.unidade);
            }
        });
        console.log(this.unidades);

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

