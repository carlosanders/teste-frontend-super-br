import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Documento, Pagination, TipoDocumento} from '@cdk/models';
import {LoginService} from '../../../../../app/main/auth/login/login.service';
import {CdkAssinaturaEletronicaPluginComponent} from '../../../componente-digital/cdk-componente-digital-ckeditor/cdk-plugins/cdk-assinatura-eletronica-plugin/cdk-assinatura-eletronica-plugin.component';
import {filter} from 'rxjs/operators';
import {MatDialog} from '@cdk/angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatAutocomplete} from '../../../../angular/material';
import {MatMenuTrigger} from '@angular/material/menu';

@Component({
    selector: 'cdk-minutas-atividade-card',
    templateUrl: './cdk-minutas-atividade-card.component.html',
    styleUrls: ['./cdk-minutas-atividade-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkMinutasAtividadeCardComponent implements OnInit {

    @Input()
    documento: Documento;

    @Input()
    maisDeUmItemSelecionado = false;

    @Input()
    disabledSelect: boolean = false;

    @Input()
    actions = ['delete', 'alterarTipo', 'removerAssinatura', 'converterPDF', 'converterHTML', 'downloadP7S', 'verResposta', 'select'];

    @Input()
    tiposDocumentosNaoEditaveis = [];

    podeAlterarTipoDocumento = true;
    podeDeletar = true;

    @Input()
    selected = true;

    @Input()
    deleting = false;

    @Input()
    undeleting = false;

    @Input()
    assinando = false;

    @Input()
    alterando = false;

    @Input()
    removendoAssinatura = false;

    @Input()
    convertendo = false;

    @Input()
    download = false;

    @Output()
    delete = new EventEmitter<number>();

    @Output()
    verResposta = new EventEmitter<Documento>();

    @Output()
    alterarTipoDocumento = new EventEmitter<Documento>();

    @Output()
    assinatura = new EventEmitter<number>();

    @Output()
    removeAssinatura = new EventEmitter<number>();

    @Output()
    converte = new EventEmitter<number>();

    @Output()
    converteHtml = new EventEmitter<number>();

    @Output()
    downloadP7s = new EventEmitter<Documento>();

    @Output()
    clicked = new EventEmitter<number>();

    @Output()
    changedSelected = new EventEmitter<boolean>();

    @Output()
    restaurar = new EventEmitter<boolean>();

    @Input()
    tipoDocumentoPagination: Pagination;

    @Input()
    mode = 'atividade';

    @ViewChild(MatAutocomplete, {static: true}) autocomplete: MatAutocomplete;

    @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;

    form: FormGroup;

    activeCard = 'form';

    habilitarTipoDocumentoSalvar = false;

    /**
     * Constructor
     */
    constructor(
        public _loginService: LoginService,
        public dialog: MatDialog,
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder
    ) {
        this.form = this._formBuilder.group({
            tipoDocumento: [null],
        });
        this.tipoDocumentoPagination = new Pagination();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.tiposDocumentosNaoEditaveis.forEach((value) => {
            if (this.documento.tipoDocumento.nome === value) {
                this.podeAlterarTipoDocumento = false;
                this.podeDeletar = false;
            }
        });
    }

    toggleInSelected(documentoId): void {
        this.selected = !this.selected;
        this.changedSelected.emit(documentoId);
    }

    doDelete(documentoId): void {
        this.delete.emit(documentoId);
    }

    doVerResposta(documento): void {
        this.verResposta.emit(documento);
    }

    doAssinatura(): void {
        const dialogRef = this.dialog.open(CdkAssinaturaEletronicaPluginComponent, {
            width: '600px'
        });

        dialogRef.afterClosed().pipe(filter(result => !!result)).subscribe((result) => {
            result.documento = this.documento;
            this.assinatura.emit(result);
        });
    }

    doRemoveAssinatura(documentoId): void {
        this.removeAssinatura.emit(documentoId);
    }

    doRestaurar(documentoId): void {
        this.restaurar.emit(documentoId);
    }

    doConverte(documentoId): void {
        this.converte.emit(documentoId);
    }

    doConverteHtml(documentoId): void {
        this.converteHtml.emit(documentoId);
    }

    doDownloadP7s(documento: Documento): void {
        this.downloadP7s.emit(documento);
    }

    onClick(documento): void {
        this.clicked.emit(documento);
    }

    selectTipoDocumento(tipoDocumento: TipoDocumento): void {
        if (tipoDocumento) {
            this.form.get('tipoDocumento').setValue(tipoDocumento);
        }
        this.activeCard = 'form';
    }

    showTipoDocumentoGrid(): void {
        this.activeCard = 'tipo-documento-list-gridsearch';
    }

    checkTipoDocumento(): void {
        const value = this.form.get('tipoDocumento').value;
        if (!value || typeof value !== 'object') {
            this.habilitarTipoDocumentoSalvar = false;
            this.form.get('tipoDocumento').setValue(null);
        } else {
            this.habilitarTipoDocumentoSalvar = true;
        }
    }

    salvarTipoDocumento(documento: Documento): void {
        const tipoDocumento = this.form.get('tipoDocumento').value;
        this.menuTrigger.closeMenu();
        // @ts-ignore
        this.alterarTipoDocumento.emit({documento: documento, tipoDocumento: tipoDocumento});
    }

    cancel(): void {
        this.activeCard = 'form';
    }
}
