import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Tramitacao, Usuario} from '@cdk/models';

import {LoginService} from 'app/main/auth/login/login.service';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs';
import {TramitacaoService} from '@cdk/services/tramitacao.service';

@Component({
    selector: 'widget-tramitacao',
    templateUrl: './widget-tramitacao.component.html',
    styleUrls: ['./widget-tramitacao.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class WidgetTramitacaoComponent implements OnInit {

    _profile: Usuario;

    tramitacoesCount: any = false;
    isContadorPrincipal: boolean = true;
    listaNups: any;
    tramitacoes: Tramitacao[];
    contagemTramitacoes: any;
    isLoading: boolean = true;

    /**
     *
     * @param _tramitacaoService
     * @param _loginService
     * @param _changeDetectorRef
     */
    constructor(
        private _tramitacaoService: TramitacaoService,
        public _loginService: LoginService,
        public _changeDetectorRef: ChangeDetectorRef
    ) {
        this._profile = _loginService.getUserProfile();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this._tramitacaoService.count(
            `{"setorDestino.id": "in:${this._profile.colaborador.lotacoes.map(lotacao => lotacao.setor.id).join(',')}", "dataHoraRecebimento": "isNull"}`)
            .pipe(
                catchError(() => of([]))
            ).subscribe(
            (value) => {
                this.tramitacoesCount = value;
                this._changeDetectorRef.markForCheck();
            }
        );
    }

    trocarVisualizacao(): void {
        this.contagemTramitacoes = [];
        this.isContadorPrincipal = !this.isContadorPrincipal;
        this._tramitacaoService.query(
            `{"setorDestino.id": "in:${this._profile.colaborador.lotacoes.map(lotacao => lotacao.setor.id).join(',')}", "dataHoraRecebimento": "isNull"}`,
            25,
            0,
            '{"criadoEm": "DESC"}',
            '["processo"]')
            .pipe(
                catchError(() => of([]))
            ).subscribe(
            (value) => {
                this.listaNups = [];
                this.listaNups.push(value);
                this.tramitacoes = this.listaNups[0].entities;
                this.isLoading = false;
                this._changeDetectorRef.markForCheck();
            }
        );
    }
}
