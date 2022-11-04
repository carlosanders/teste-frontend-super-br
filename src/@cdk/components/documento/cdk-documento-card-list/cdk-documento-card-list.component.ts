import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChange,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {MatMenuTrigger} from '@angular/material/menu';

import {cdkAnimations} from '@cdk/animations';
import {Documento, Pagination, VinculacaoDocumento} from '@cdk/models';
import {filter} from 'rxjs/operators';
import {
    CdkAssinaturaEletronicaPluginComponent
} from '../../componente-digital/cdk-componente-digital-ckeditor/cdk-plugins/cdk-assinatura-eletronica-plugin/cdk-assinatura-eletronica-plugin.component';

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
    actions = ['delete', 'alterarTipo', 'removerAssinatura', 'converterPDF', 'converterHTML', 'downloadP7S', 'verResposta', 'select'];

    @Input()
    tiposDocumentosNaoEditaveis = [];

    @Input()
    documentos: Documento[] = [];

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
    desvincular = new EventEmitter<VinculacaoDocumento>();

    @Output()
    desvincularBloco = new EventEmitter<VinculacaoDocumento[]>();

    @Output()
    sairLixeira = new EventEmitter<boolean>();

    @Output()
    clicked = new EventEmitter<Documento>();

    @Output()
    verResposta = new EventEmitter<Documento>();

    @Output()
    converteMinuta: EventEmitter<Documento> = new EventEmitter<Documento>();

    @Output()
    converteMinutaBloco: EventEmitter<Documento[]> = new EventEmitter<Documento[]>();

    @Output()
    alterarTipoDocumento = new EventEmitter<Documento>();

    @Output()
    getMore = new EventEmitter<any>();

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

    @Input()
    documentosPagination: Pagination = null;

    @ViewChild('menuTriggerList') menuTriggerList: MatMenuTrigger;

    selectedIds: number[] = [];

    selectedDocumentos: Documento[] = [];

    hasSelected = false;

    isIndeterminate = false;

    form: FormGroup;

    habilitarTipoDocumentoSalvar = false;

    isNotMinutas: boolean = false;


    /**
     * @param _changeDetectorRef
     * @param _formBuilder
     * @param dialog
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        public dialog: MatDialog,
    ) {
        this.form = this._formBuilder.group({
            tipoDocumen: [null],
        });
        this.tipoDocumentoPagination = new Pagination();
        this.documentos = [];
    }

    ngOnInit(): void {
        this.isNotMinutas = this.selectedDocumentos?.filter(documento => !documento.minuta)?.length > 0;
    }

    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['documentos'] && this.documentos && this.documentos.length) {
            this.selectedDocumentos = this.documentos.filter(doc => this.selectedIds.includes(doc.id));
            this.isNotMinutas = this.selectedDocumentos?.filter(documento => !documento.minuta)?.length > 0;
        }
    }

    deleteDocumento(documentoId): void {
        this.delete.emit(documentoId);
    }

    toggleInSelected(documentoId): void {
        const documento = this.documentos.find(doc => doc.id === documentoId);
        const selectedDocumentoIds = [...this.selectedIds];
        if (selectedDocumentoIds.find(id => id === documentoId) !== undefined) {
            this.selectedIds = selectedDocumentoIds.filter(id => id !== documentoId);
            this.selectedDocumentos = this.selectedDocumentos.filter(doc => doc.id === documentoId);
        } else {
            this.selectedIds = [...selectedDocumentoIds, documentoId];
            this.selectedDocumentos.push(documento);
        }

        this.hasSelected = this.selectedIds.length > 0;
        this.isNotMinutas = this.selectedDocumentos?.filter(documento => !documento.minuta)?.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.documentos.length && this.selectedIds.length > 0);

        this.changedSelectedIds.emit(this.selectedIds);
    }

    doDelete(documentoId): void {
        this.delete.emit(documentoId);
    }

    doDesvincular(vinculacaoDocumento: VinculacaoDocumento): void {
        this.desvincular.emit(vinculacaoDocumento);
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

    doConverteMinuta(documento): void {
        this.converteMinuta.emit(documento);
    }

    doConverteMinutaBloco(): void {
        this.converteMinutaBloco.emit(this.selectedIds.map((id) => this.documentos.find((documento) => documento.id === id)));
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

    onClick(documento): void {
        this.clicked.emit(documento);
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

    doDesvincularBloco(): void {
        const vinculacoesBloco = [];
        this.documentos.forEach((documento: Documento) => {
            if (this.selectedIds.indexOf(documento.id) > -1 && !documento.minuta && !!documento.estaVinculada) {
                vinculacoesBloco.push(documento.vinculacaoDocumentoPrincipal);
            }
        });
        this.desvincularBloco.emit(vinculacoesBloco);
    }

    doAssinaturaDocumentoBloco(): void {
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
        this.selectedDocumentos = this.documentos;
        this.isNotMinutas = this.selectedDocumentos?.filter(documento => !documento.minuta)?.length > 0;
        this.recompute();
    }

    /**
     * Deselect all documentos
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.selectedDocumentos = [];
        this.isNotMinutas = this.selectedDocumentos?.filter(documento => !documento.minuta)?.length > 0;
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

    doGetMore(): void {
        this.getMore.emit(true);
    }

    documentoTrackBy(index, documento: Documento): number {
        return documento.id;
    }
}
