import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';
import { TarefaService } from '@cdk/services/tarefa.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as moment from 'moment';
import {DocumentoAvulsoService} from '@cdk/services/documento-avulso.service';
import {LoginService} from '../../auth/login/login.service';

@Component({
    selector     : 'painel',
    templateUrl  : './painel.component.html',
    styleUrls    : ['./painel.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class PainelComponent implements OnInit
{

    private _profile: any;

    tarefasCount: number;
    tarefasVencidasCount: number;

    documentosAvulsosCount: number;
    documentosAvulsosVencidosCount: number;

    /**
     * Constructor
     */
    constructor(
        private _tarefaService: TarefaService,
        private _documentoAvulsoService: DocumentoAvulsoService,
        private _loginService: LoginService
    )
    {
        this.tarefasCount = null;
        this.tarefasVencidasCount = null;

        this.documentosAvulsosCount = null;
        this.documentosAvulsosVencidosCount = null;

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
            `{"usuarioResponsavel.id": "eq:2", "dataHoraConclusaoPrazo": "isNull"}`)
            .pipe(
                catchError(() => of([]))
            ).subscribe(
                value => this.tarefasCount = value
            );

        this._tarefaService.count(
            `{"usuarioResponsavel.id": "eq:2", "dataHoraConclusaoPrazo": "isNull", "dataHoraFinalPrazo": "lt:${moment().format('YYYY-MM-DDTHH:mm:ss')}"}`)
            .pipe(
                catchError(() => of([]))
            ).subscribe(
            value => this.tarefasVencidasCount = value
        );

        this._documentoAvulsoService.count(
            `{"usuarioResponsavel.id": "eq:2", "dataHoraResposta": "isNull"}`)
            .pipe(
                catchError(() => of([]))
            ).subscribe(
            value => this.documentosAvulsosCount = value
        );

        this._documentoAvulsoService.count(
            `{"usuarioResponsavel.id": "eq:2", "dataHoraResposta": "isNull", "dataHoraFinalPrazo": "lt:${moment().format('YYYY-MM-DDTHH:mm:ss')}"}`)
            .pipe(
                catchError(() => of([]))
            ).subscribe(
            value => this.documentosAvulsosVencidosCount = value
        );

    }

}
