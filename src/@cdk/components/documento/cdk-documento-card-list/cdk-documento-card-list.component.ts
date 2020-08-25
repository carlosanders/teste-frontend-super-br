import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, EventEmitter, Input, OnChanges,
    OnInit, Output, ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Documento, Pagination} from '@cdk/models';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatMenuTrigger} from '@angular/material/menu';

@Component({
    selector: 'cdk-documento-card-list',
    templateUrl: './cdk-documento-card-list.component.html',
    styleUrls: ['./cdk-documento-card-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkDocumentoCardListComponent implements OnInit, OnChanges {

    @Input()
    documentos: Documento[];

    @Output()
    delete = new EventEmitter<number>();

    @Output()
    assinatura = new EventEmitter<number>();

    @Output()
    removeAssinatura = new EventEmitter<number>();

    @Output()
    converte = new EventEmitter<number>();

    @Output()
    clicked = new EventEmitter<number>();

    @Output()
    verResposta = new EventEmitter<Documento>();

    @Output()
    alterarTipoDocumento = new EventEmitter<Documento>();

    @Input()
    deletingId: number[] = [];

    @Input()
    assinandoId: number[] = [];

    @Input()
    alterandoId: number[] = [];

    @Input()
    removendoAssinaturaId: number[] = [];

    @Input()
    convertendoId: number[] = [];

    @Output()
    changedSelectedIds = new EventEmitter<number[]>();

    @Input()
    tipoDocumentoPagination: Pagination;

    @ViewChild('menuTriggerList') menuTriggerList: MatMenuTrigger;

    selectedIds: number[] = [];

    hasSelected = false;

    isIndeterminate = false;

    form: FormGroup;

    habilitarTipoDocumentoSalvar = false;


    /**
     * @param _changeDetectorRef
     * @param _formBuilder
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder
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
        this.isIndeterminate = (this.selectedIds.length !== this.documentos.length && this.selectedIds.length > 0);

        this.changedSelectedIds.emit(this.selectedIds);
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

        this.selectedIds.forEach(documentoId => {
            const documentos = this.documentos.filter(doc => doc.id === documentoId);
            this.doAlterarTipoDocumento({documento: documentos[0], tipoDocumento: tipoDocumento});
        });
        this.menuTriggerList.closeMenu();
    }

    doAlterarTipoDocumento(documentoTipoDocumento): void {
        // @ts-ignore
        this.alterarTipoDocumento.emit({documento: documentoTipoDocumento, tipoDocumento: documentoTipoDocumento.tipoDocumento});
    }

    onClick(documento): void {
        this.clicked.emit(documento);
    }

    doDeleteDocumentoBloco(): void {
        this.selectedIds.forEach(documentoId => this.doDelete(documentoId));
    }

    doAssinaturaDocumentoBloco(): void {
        this.doAssinatura(this.selectedIds);
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
        ev.preventDefault();

        if (this.selectedIds.length && this.selectedIds.length > 0) {
            this.deselectAll();
        } else {
            this.selectAll();
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

    doConverteDocumentoBloco(): void {
        this.selectedIds.forEach(documentoId => this.doConverte(documentoId));
        this.deselectAll();
    }

}
