import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Usuario} from '@cdk/models';

import {LoginService} from 'app/main/auth/login/login.service';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs';
import * as moment from 'moment';
import {DocumentoAvulsoService} from '@cdk/services/documento-avulso.service';

@Component({
    selector: 'widget-documento-avulso-conveniado',
    templateUrl: './widget-documento-avulso.component.html',
    styleUrls: ['./widget-documento-avulso.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class WidgetDocumentoAvulsoComponent implements OnInit {

    _profile: Usuario;

    documentosAvulsosCount: any = false;
    documentosAvulsosVencidosCount: any = false;

    /**
     * Constructor
     */
    constructor(
        private _documentoAvulsoService: DocumentoAvulsoService,
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
        const pessoaIds = [];
        this._profile.vinculacoesPessoasUsuarios.forEach(pessoaConveniada => pessoaIds.push(pessoaConveniada.pessoa.id));

        this._documentoAvulsoService.count(
            `{"pessoaDestino.id": "in:${pessoaIds}", "dataHoraResposta": "isNull", "dataHoraRemessa": "isNotNull"}`)
            .pipe(
                catchError(() => of([]))
            ).subscribe(
            (value) => {
                this.documentosAvulsosCount = value;
                this._changeDetectorRef.markForCheck();
            }
        );

        this._documentoAvulsoService.count(
            `{"pessoaDestino.id": "eq:${pessoaIds}", "dataHoraResposta": "isNull", "dataHoraRemessa": "isNotNull", "dataHoraFinalPrazo": "lt:${moment().format('YYYY-MM-DDTHH:mm:ss')}"}`)
            .pipe(
                catchError(() => of([]))
            ).subscribe(
            (value) => {
                this.documentosAvulsosVencidosCount = value;
                this._changeDetectorRef.markForCheck();
            }
        );
    }
}
