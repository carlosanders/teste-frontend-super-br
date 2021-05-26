import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component, OnInit, ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Aviso, Usuario} from '@cdk/models';
import {LoginService} from 'app/main/auth/login/login.service';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs';
import {AvisoService} from '@cdk/services/aviso.service';

@Component({
    selector: 'widget-alerta',
    templateUrl: './widget-alerta.component.html',
    styleUrls: ['./widget-alerta.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class WidgetAlertaComponent implements OnInit {

    _profile: Usuario;
    avisos: Aviso[] = [];
    avisoIsLoading = false;
    setor: number [] = [];
    unidade: number [] = [];
    modalidadeOrgaoCentral: number [] = [];
    icone: string;

    /**
     * Constructor
     */
    constructor(
        public _loginService: LoginService,
        public _changeDetectorRef: ChangeDetectorRef,
        private _avisoService: AvisoService
    )
    {

        this._profile = _loginService.getUserProfile();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    ngOnInit(): void {
        this.avisoIsLoading = true;
         this._profile.colaborador?.lotacoes.forEach(
            (lotacao) => {
                this.setor.push(lotacao.setor.id);
                this.unidade.push(lotacao.setor.unidade.id);
                this.modalidadeOrgaoCentral.push(lotacao.setor.unidade.modalidadeOrgaoCentral.id);
            }
         );


        const filters = {};
        let filterUnidade = {};
        let filterOrgaoCentral = {};

        const filterSetor = {'vinculacoesAvisos.setor.id' : 'in:'+this.setor.map(setor => setor).join(',')};
        const filterSistema = {'sistema': 'eq:true'};

        if(this.unidade.length){
            filterUnidade = {'vinculacoesAvisos.unidade.id': 'in:'+this.unidade.map(unidade => unidade).join(',')};
        }

        if(this.modalidadeOrgaoCentral.length){
            filterOrgaoCentral = {'vinculacoesAvisos.modalidadeOrgaoCentral.id': 'in:'+this.modalidadeOrgaoCentral.map(orgaoCentral => orgaoCentral).join(',')};
        }

        filters['orX'] = [
            {...filterSetor},
            {...filterUnidade},
            {...filterOrgaoCentral},
            {...filterSistema}
        ];

        this._avisoService.query(
            JSON.stringify(filters),
            10,
            0,
            JSON.stringify({criadoEm: 'DESC'}),
            '["populateAll","vinculacoesAvisos","vinculacoesAvisos.setor","vinculacoesAvisos.unidade","vinculacoesAvisos.usuario","vinculacoesAvisos.modalidadeOrgaoCentral"]')
            .pipe(
                catchError(() => {
                        this.avisoIsLoading = false;
                        this._changeDetectorRef.markForCheck();
                        return of([]);
                    }
                )
            ).subscribe(
            (value) => {
                this.avisoIsLoading = false;
                this._changeDetectorRef.markForCheck();
                this.avisos = value['entities'];
            }
        );
    }

    getIcon(vinculacaoAviso): string
        {
            if(vinculacaoAviso.setor?.id)
            {
                return 'domain';
            }

            if(vinculacaoAviso.unidade?.id)
            {
                return 'location_city';
            }

            if(vinculacaoAviso.modalidadeOrgaoCentral?.id)
            {
                return 'business';
            }

            return 'dvr';
        }

    getTooltip(vinculacaoAviso): string
        {
            if(vinculacaoAviso.setor?.id)
            {
                return vinculacaoAviso.setor.nome;
            }

            if(vinculacaoAviso.unidade?.id)
            {
                return vinculacaoAviso.unidade.nome;
            }

            if(vinculacaoAviso.modalidadeOrgaoCentral?.id)
            {
                return vinculacaoAviso.modalidadeOrgaoCentral.descricao;
            }

            return 'Sistema';
        }
}
