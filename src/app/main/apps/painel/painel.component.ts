import {AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';

import { cdkAnimations } from '@cdk/animations';
import { TarefaService } from '@cdk/services/tarefa.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as moment from 'moment';
import {DocumentoAvulsoService} from '@cdk/services/documento-avulso.service';
import {LoginService} from '../../auth/login/login.service';
import {HistoricoService} from '@cdk/services/historico.service';
import {Historico} from '@cdk/models';
import {TramitacaoService} from '@cdk/services/tramitacao.service';
import {Usuario} from '@cdk/models';
import {WidgetsComponent} from '../../../../widgets/widgets.component';

@Component({
    selector     : 'painel',
    templateUrl  : './painel.component.html',
    styleUrls    : ['./painel.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : cdkAnimations
})
export class PainelComponent implements OnInit, AfterViewInit
{

    _profile: Usuario;

    documentosAvulsosCount: any = false;
    documentosAvulsosVencidosCount: any = false;

    tramitacoesCount: any = false;

    historicos: Historico[];
    historicoIsLoding = false;

    @ViewChild('widgets', {static: false}) widgets: WidgetsComponent;

    /**
     * Constructor
     */
    constructor(
        private _tarefaService: TarefaService,
        private _documentoAvulsoService: DocumentoAvulsoService,
        private _tramitacaoService: TramitacaoService,
        private _historicoService: HistoricoService,
        public _loginService: LoginService
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

        if (this._loginService.isGranted('ROLE_COLABORADOR')) {
            this._tramitacaoService.count(
                `{"setorDestino.id": "in:${this._profile.colaborador.lotacoes.map(lotacao => lotacao.setor.id).join(',')}", "dataHoraRecebimento": "isNull"}`)
                .pipe(
                    catchError(() => of([]))
                ).subscribe(
                value => this.tramitacoesCount = value
            );

            this._documentoAvulsoService.count(
                `{"usuarioResponsavel.id": "eq:${this._profile.id}", "dataHoraResposta": "isNull"}`)
                .pipe(
                    catchError(() => of([]))
                ).subscribe(
                value => this.documentosAvulsosCount = value
            );

            this._documentoAvulsoService.count(
                `{"usuarioResponsavel.id": "eq:${this._profile.id}", "dataHoraResposta": "isNull", "dataHoraFinalPrazo": "lt:${moment().format('YYYY-MM-DDTHH:mm:ss')}"}`)
                .pipe(
                    catchError(() => of([]))
                ).subscribe(
                value => this.documentosAvulsosVencidosCount = value
            );
        }


        if (this._loginService.isGranted('ROLE_CONVENIADO')) {
            const pessoaIds = [];
            this._profile.vinculacoesPessoasUsuarios.forEach((pessoaConveniada) => pessoaIds.push(pessoaConveniada.pessoa.id));

            this._documentoAvulsoService.count(
                `{"pessoaDestino.id": "in:${pessoaIds}", "dataHoraResposta": "isNull"}`)
                .pipe(
                    catchError(() => of([]))
                ).subscribe(
                value => this.documentosAvulsosCount = value
            );

            this._documentoAvulsoService.count(
                `{"pessoaDestino.id": "eq:${pessoaIds}", "dataHoraResposta": "isNull", "dataHoraFinalPrazo": "lt:${moment().format('YYYY-MM-DDTHH:mm:ss')}"}`)
                .pipe(
                    catchError(() => of([]))
                ).subscribe(
                value => this.documentosAvulsosVencidosCount = value
            );
        }

        this.historicoIsLoding = true;
        this._historicoService.query(
            `{"criadoPor.id": "eq:${this._profile.id}", "criadoEm": "gt:${moment().subtract(10, 'days').format('YYYY-MM-DDTHH:mm:ss')}"}`,
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

    ngAfterViewInit(): void {
        console.log(this.widgets);
    }
}
