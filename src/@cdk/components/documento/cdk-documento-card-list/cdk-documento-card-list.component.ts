import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, EventEmitter, Input, OnChanges,
    OnInit, Output,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {Documento} from '@cdk/models/documento.model';

@Component({
    selector: 'cdk-documento-card-list',
    templateUrl: './cdk-documento-card-list.component.html',
    styleUrls: ['./cdk-documento-card-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkDocumentoCardListComponent implements OnInit, OnChanges {

    @Input()
    documentos: Documento[];

    @Output()
    delete = new EventEmitter<number>();

    @Output()
    assinatura = new EventEmitter<number>();

    @Output()
    converte = new EventEmitter<number>();

    @Output()
    clicked = new EventEmitter<number>();

    @Output()
    verResposta = new EventEmitter<Documento>();

    @Input()
    deletingId: number[];

    @Input()
    assinandoId: number[];

    @Input()
    convertendoId: number[];

    @Output()
    changedSelectedIds = new EventEmitter<number[]>();

    selectedIds: number[] = [];

    hasSelected = false;

    isIndeterminate = false;

    /**
     * @param _changeDetectorRef
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef
    ) {
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

    doAssinatura(documentoId): void {
        this.assinatura.emit(documentoId);
    }

    doVerResposta(documento): void {
        this.verResposta.emit(documento);
    }

    onClick(documento): void {
        this.clicked.emit(documento);
    }

    doDeleteDocumentoBloco(): void {
        this.selectedIds.forEach(documentoId => this.doDelete(documentoId));
    }

    doAssinaturaDocumentoBloco(): void {
        this.selectedIds.forEach(documentoId => this.doAssinatura(documentoId));
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
        this.deselectAll(); //É PARA MANTER SELECIONADO O PDF?
    }

}
