import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {DocumentoAvulso, Usuario} from '@cdk/models';

import {LoginService} from 'app/main/auth/login/login.service';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs';
import * as moment from 'moment';
import {DocumentoAvulsoService} from '@cdk/services/documento-avulso.service';
import {animate, query, stagger, style, transition, trigger} from "@angular/animations";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'widget-documento-avulso-colaborador',
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
    isContadorPrincipal: boolean = true;
    contagemDocumentosAvulsos: any;
    listaNups: any;
    documentoAvulso: DocumentoAvulso[];
    routerState: any;
    isLoading: boolean = true;


    /**
     * Constructor
     */
    constructor(
        private _documentoAvulsoService: DocumentoAvulsoService,
        public _loginService: LoginService,
        public _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _activatedRoute: ActivatedRoute
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
        this._documentoAvulsoService.count(
            `{"usuarioResponsavel.id": "eq:${this._profile.id}", "dataHoraResposta": "isNull","dataHoraRemessa": "isNotNull", "dataHoraEncerramento": "isNull"}`)
            .pipe(
                catchError(() => of([]))
            ).subscribe(
            (value) => {
                this.documentosAvulsosCount = value;
                this._changeDetectorRef.markForCheck();
            }
        );

        this._documentoAvulsoService.count(
            `{"usuarioResponsavel.id": "eq:${this._profile.id}", "dataHoraResposta": "isNull", "dataHoraRemessa": "isNotNull", "dataHoraEncerramento": "isNull", "dataHoraFinalPrazo": "lt:${moment().format('YYYY-MM-DDTHH:mm:ss')}"}`)
            .pipe(
                catchError(() => of([]))
            ).subscribe(
            (value) => {
                this.documentosAvulsosVencidosCount = value;
                this._changeDetectorRef.markForCheck();
            }
        );
    }
    trocarVisualizacao(): void {
        this.isContadorPrincipal = !this.isContadorPrincipal;
        this.contagemDocumentosAvulsos = [];
        this._documentoAvulsoService.query(
            `{"usuarioResponsavel.id": "eq:${this._profile.id}", "dataHoraResposta": "isNull","dataHoraRemessa": "isNotNull", "dataHoraEncerramento": "isNull"}`,
            25,
            0,
            '{"criadoEm": "DESC"}',
            '["processo", "documentoRemessa", "pessoaDestino"]')
            .pipe(
                catchError(() => of([]))
            ).subscribe(
            (value) => {
                this.listaNups = [];
                this.listaNups.push(value);
                this.documentoAvulso = this.listaNups[0].entities;
                this.isLoading = false;
                this._changeDetectorRef.markForCheck();
            }
        );
    }

    visualizar(documentoAvulso: DocumentoAvulso): void {
        const sidebar = 'oficio/dados-basicos';
        this._router.navigate([
                '/apps/processo/' +
                documentoAvulso.processo.id +
                '/editar/oficios/listar/documento/' + documentoAvulso.documentoRemessa.id,
                {
                    outlets: {
                        sidebar: sidebar
                    }
                }],
            {
                relativeTo: this._activatedRoute.parent
            }).then();
    }
}
