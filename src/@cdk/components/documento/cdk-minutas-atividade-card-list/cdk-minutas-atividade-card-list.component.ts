import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Documento, Pagination, Tarefa, VinculacaoEtiqueta} from '@cdk/models';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatMenuTrigger} from '@angular/material/menu';
import {CdkAssinaturaEletronicaPluginComponent} from '../../componente-digital/cdk-componente-digital-ckeditor/cdk-plugins/cdk-assinatura-eletronica-plugin/cdk-assinatura-eletronica-plugin.component';
import {filter} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {LoginService} from "../../../../app/main/auth/login/login.service";

@Component({
    selector: 'cdk-minutas-atividade-card-list',
    templateUrl: './cdk-minutas-atividade-card-list.component.html',
    styleUrls: ['./cdk-minutas-atividade-card-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkMinutasAtividadeCardListComponent implements OnInit, OnChanges {

    @Input()
    actions = ['delete', 'alterarTipo', 'removerAssinatura', 'converterPDF', 'converterHTML', 'downloadP7S', 'verResposta', 'select'];

    @Input()
    tiposDocumentosNaoEditaveis = [];

    @Input()
    documentos: Documento[];

    @Input()
    disabledSelects: number[] = [];

    @Input()
    mode = 'atividade';

    @Output()
    delete = new EventEmitter<number>();

    @Output()
    deleteBloco = new EventEmitter<Documento[]>();

    @Output()
    deleteBlocoEmmitter = new EventEmitter<number[]>();

    @Output()
    assinatura = new EventEmitter<number>();

    @Output()
    assinaturaBloco = new EventEmitter<any>();

    @Output()
    removeAssinatura = new EventEmitter<number>();

    @Output()
    converte = new EventEmitter<number>();

    @Output()
    converteHtml = new EventEmitter<number>();

    @Output()
    downloadP7S = new EventEmitter<Documento>();

    @Output()
    restaurar = new EventEmitter<number>();

    @Output()
    sairLixeira = new EventEmitter<boolean>();

    @Output()
    clicked = new EventEmitter<{documento: Documento; event: any}>();

    @Output()
    verResposta = new EventEmitter<Documento>();

    @Output()
    alterarTipoDocumento = new EventEmitter<Documento>();

    @Input()
    deletingId: number[] = [];

    @Input()
    undeletingId: number[] = [];

    @Input()
    assinandoId: number[] = [];

    @Input()
    alterandoId: number[] = [];

    @Input()
    removendoAssinaturaId: number[] = [];

    @Input()
    convertendoId: number[] = [];

    @Input()
    downloadId: number[] = [];

    @Input()
    loadingDocumentosExcluidos = false;

    @Input()
    lixeiraMinutas = false;

    @Input()
    saving = false;

    @Input()
    loading = false;

    @Output()
    changedSelectedIds = new EventEmitter<number[]>();

    @Input()
    tipoDocumentoPagination: Pagination;

    @ViewChild('menuTriggerList') menuTriggerList: MatMenuTrigger;

    @Input()
    selectedIds: number[] = [];

    @Input()
    isIndeterminate = false;

    @Input()
    currentDocumentoId = null;

    @Input()
    oficio = false;

    hasSelected = false;

    form: FormGroup;

    habilitarTipoDocumentoSalvar = false;


    /**
     *
     * @param _changeDetectorRef
     * @param _formBuilder
     * @param dialog
     * @param _loginService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        public dialog: MatDialog,
        public _loginService: LoginService
    ) {
        this.form = this._formBuilder.group({
            tipoDocumen: [null],
        });
        this.tipoDocumentoPagination = new Pagination();
    }

    ngOnInit(): void {
    }

    ngOnChanges(): void {
    }

    deleteDocumento(documentoId): void {
        this.delete.emit(documentoId);
    }

    toggleInSelected(documentoId): void {
        const selectedDocumentoIds = [...this.selectedIds];
        if (selectedDocumentoIds.find(id => id === documentoId) !== undefined) {
            this.selectedIds = selectedDocumentoIds.filter(id => id !== documentoId);
        } else {
            this.selectedIds = [...selectedDocumentoIds, documentoId];
        }
        this.hasSelected = this.selectedIds.length > 0;
        this.changedSelectedIds.emit(this.selectedIds);
        this.isIndeterminate = (this.selectedIds.length !== this.documentos.length && this.selectedIds.length > 0);
    }

    doDelete(documentoId): void {
        this.delete.emit(documentoId);
    }

    doAssinatura(result): void {
        this.assinatura.emit(result);
    }

    doRemoveAssinatura(documentoId): void {
        this.removeAssinatura.emit(documentoId);
    }

    doVerResposta(documento): void {
        this.verResposta.emit(documento);
    }

    doAlterarDocumentoBloco(): void {
        const tipoDocumento = this.form.get('tipoDocumen').value;

        this.selectedIds.forEach((documentoId) => {
            const documentos = this.documentos.filter(doc => doc.id === documentoId);
            this.doAlterarTipoDocumento({documento: documentos[0], tipoDocumento: tipoDocumento});
        });
        this.menuTriggerList.closeMenu();
    }

    doAlterarTipoDocumento(documentoTipoDocumento): void {
        // @ts-ignore
        this.alterarTipoDocumento.emit({documento: documentoTipoDocumento.documento, tipoDocumento: documentoTipoDocumento.tipoDocumento});
    }

    onClick(documento, event): void {
        this.clicked.emit({documento, event});
    }

    doDeleteDocumentoBloco(): void {
        const documentosBloco = [];
        this.documentos.forEach((documento: Documento) => {
            if (this.selectedIds.indexOf(documento.id) > -1) {
                documentosBloco.push(documento.id);
            }
        });
        this.deleteBlocoEmmitter.emit(documentosBloco);
    }

    doAssinaturaDocumentoBloco(): void {
        this.doAssinatura(this.selectedIds);
        const dialogRef = this.dialog.open(CdkAssinaturaEletronicaPluginComponent, {
            width: '600px'
        });

        dialogRef.afterClosed().pipe(filter(result => !!result)).subscribe((result) => {
            const documentosBloco = [];
            this.documentos.forEach((documento: Documento) => {
                if (this.selectedIds.indexOf(documento.id) > -1) {
                    documentosBloco.push(documento);
                }
            });
            result.documentos = documentosBloco;
            this.assinaturaBloco.emit(result);
        });
    }

    doRemoveAssinaturaDocumentoBloco(): void {
        this.selectedIds.forEach(documentoId => this.doRemoveAssinatura(documentoId));
    }

    checkTipoDocument(): void {
        const value = this.form.get('tipoDocumen').value;
        if (!value || typeof value !== 'object') {
            this.habilitarTipoDocumentoSalvar = false;
            this.form.get('tipoDocumen').setValue(null);
        } else {
            this.habilitarTipoDocumentoSalvar = true;
        }
    }

    /**
     * Toggle select all
     *
     * @param ev
     */
    toggleSelectAll(ev): void {
        if (!this.disabledSelects.length) {
            ev.preventDefault();

            if (this.selectedIds.length && this.selectedIds.length > 0) {
                this.deselectAll();
            } else {
                this.selectAll();
            }
        }
    }

    /**
     * Select all
     */
    selectAll(): void {
        const arr = Object.keys(this.documentos).map(k => this.documentos[k]);
        this.selectedIds = arr.map(documento => documento.id);
        this.recompute();
    }

    /**
     * Deselect all documentos
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    recompute(): void {
        this.isIndeterminate = (this.selectedIds.length !== this.documentos.length && this.selectedIds.length > 0);
        this.changedSelectedIds.emit(this.selectedIds);
    }

    // **********************************MUDANÇA CONVERTE
    doConverte(documentoId): void {
        this.converte.emit(documentoId);
    }
    doConverteHtml(documentoId): void {
        this.converteHtml.emit(documentoId);
    }

    doDownloadP7S(documentoId): void {
        this.downloadP7S.emit(documentoId);
    }

    doRestaurar(documentoId): void {
        this.restaurar.emit(documentoId);
    }

    doSairLixeiraMinutas(): void {
        this.deselectAll();
        this.sairLixeira.emit(true);
    }

    doConverteDocumentoBloco(): void {
        this.selectedIds.forEach(documentoId => this.doConverte(documentoId));
        this.deselectAll();
    }

    doRestaurarBloco(): void {
        this.selectedIds.forEach(documentoId => this.doRestaurar(documentoId));
        this.deselectAll();
    }
}
