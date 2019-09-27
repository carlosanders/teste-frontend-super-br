import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';
import { TarefaService } from '@cdk/services/tarefa.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as moment from 'moment';
import {DocumentoAvulsoService} from '@cdk/services/documento-avulso.service';
import {LoginService} from '../../auth/login/login.service';
import {HistoricoService} from '@cdk/services/historico.service';
import {Historico} from '@cdk/models/historico.model';
import {TramitacaoService} from '@cdk/services/tramitacao.service';

@Component({
    selector     : 'painel',
    templateUrl  : './painel.component.html',
    styleUrls    : ['./painel.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class PainelComponent implements OnInit
{

    _profile: any;

    tarefasCount: any = false;
    tarefasVencidasCount: any = false;

    documentosAvulsosCount: any = false;
    documentosAvulsosVencidosCount: any = false;

    tramitacoesCount: any = false;

    historicos: Historico[];
    historicoIsLoding = false;

    /**
     * Constructor
     */
    constructor(
        private _tarefaService: TarefaService,
        private _documentoAvulsoService: DocumentoAvulsoService,
        private _tramitacaoService: TramitacaoService,
        private _historicoService: HistoricoService,
        private _loginService: LoginService
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
    ngOnInit(): void
    {
        this._tarefaService.count(
            `{"usuarioResponsavel.id": "eq:${this._profile.usuario.id}", "dataHoraConclusaoPrazo": "isNull"}`)
            .pipe(
                catchError(() => of([]))
            ).subscribe(
                value => this.tarefasCount = value
            );

        this._tarefaService.count(
            `{"usuarioResponsavel.id": "eq:${this._profile.usuario.id}", "dataHoraConclusaoPrazo": "isNull", "dataHoraFinalPrazo": "lt:${moment().format('YYYY-MM-DDTHH:mm:ss')}"}`)
            .pipe(
                catchError(() => of([]))
            ).subscribe(
            value => this.tarefasVencidasCount = value
        );

        this._documentoAvulsoService.count(
            `{"usuarioResponsavel.id": "eq:${this._profile.usuario.id}", "dataHoraResposta": "isNull"}`)
            .pipe(
                catchError(() => of([]))
            ).subscribe(
            value => this.documentosAvulsosCount = value
        );

        this._documentoAvulsoService.count(
            `{"usuarioResponsavel.id": "eq:${this._profile.usuario.id}", "dataHoraResposta": "isNull", "dataHoraFinalPrazo": "lt:${moment().format('YYYY-MM-DDTHH:mm:ss')}"}`)
            .pipe(
                catchError(() => of([]))
            ).subscribe(
            value => this.documentosAvulsosVencidosCount = value
        );

        this._tramitacaoService.count(
            `{"setorDestino.id": "in:${this._profile.lotacoes.map(lotacao => lotacao.setor.id).join(',')}", "dataHoraRecebimento": "isNull"}`)
            .pipe(
                catchError(() => of([]))
            ).subscribe(
            value => this.tramitacoesCount = value
        );

        this.historicoIsLoding = true;
        this._historicoService.query(
            `{"criadoPor.id": "eq:${this._profile.usuario.id}", "criadoEm": "gt:${moment().subtract(10, 'days').format('YYYY-MM-DDTHH:mm:ss')}"}`,
            5,
            0,
            '{}',
            '["populateAll"]')
            .pipe(
                catchError(() => {
                    this.historicoIsLoding = false;
                    return of([]);
                    }
                )
            ).subscribe(
            value => {
                this.historicoIsLoding = false;
                this.historicos = value['entities'];
            }
        );

    }

}
