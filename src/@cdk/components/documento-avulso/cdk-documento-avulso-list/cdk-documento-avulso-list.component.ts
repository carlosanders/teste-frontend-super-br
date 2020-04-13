import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';
import { cdkAnimations } from '@cdk/animations';
import { DocumentoAvulso } from '@cdk/models/documento-avulso.model';
import { CdkSidebarService } from '@cdk/components/sidebar/sidebar.service';

@Component({
    selector: 'cdk-documento-avulso-list',
    templateUrl: './cdk-documento-avulso-list.component.html',
    styleUrls: ['./cdk-documento-avulso-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,
    exportAs: 'dragDocumentoAvulsoList'
})
export class CdkDocumentoAvulsoListComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading: boolean;

    @Input()
    documentosAvulso: DocumentoAvulso[] = [];

    @Input()
    currentDocumentoAvulsoId: number;

    @Input()
    deletingIds: number[] = [];

    @Input()
    deletedIds: number[] = [];

    @Input()
    selectedIds: number[] = [];

    @Output()
    changeSelectedIds = new EventEmitter();

    @Input()
    pagination: any;

    @Input()
    folders: any;

    @Input()
    actions: string[] = ['edit', 'delete', 'select'];

    @Output()
    reload = new EventEmitter<any>();

    @Output()
    scrolled = new EventEmitter<any>();

    @Output()
    delete = new EventEmitter<number>();

    @Output()
    selected = new EventEmitter<DocumentoAvulso>();

    @Output()
    compartilhar = new EventEmitter<number>();

    @Output()
    createDocumentoAvulso = new EventEmitter<number>();

    @Output()
    movimentar = new EventEmitter<number>();

    @Output()
    editProcesso = new EventEmitter<any>();

    @Output()
    editDocumentoAvulso = new EventEmitter<number>();

    @Output()
    toggleUrgente = new EventEmitter<DocumentoAvulso>();

    @Output()
    compartilharBloco = new EventEmitter<any>();

    @Output()
    createDocumentoAvulsoBloco = new EventEmitter<any>();

    @Output()
    editDocumentoAvulsoBloco = new EventEmitter<any>();

    @Output()
    movimentarBloco = new EventEmitter<any>();

    @Output()
    etiquetarBloco = new EventEmitter<any>();

    @Output()
    responderComplentarBloco = new EventEmitter<any>();

    @Output()
    editorBloco = new EventEmitter<any>();

    listFilter: {} = {};
    listSort: {} = {};

    isIndeterminate = false;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _cdkSidebarService: CdkSidebarService) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    ngOnChanges(): void {
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
    }

    toggleFilter(): void {
        this.toggleSidebar();
    }

    loadPage(): void {
        this.reload.emit({
            listFilter: this.listFilter,
            listSort: this.listSort
        });
    }

    doSort(sort: any): void {
        this.listSort = sort;
        this.loadPage();
    }

    selectDocumentoAvulso(documentoAvulso: DocumentoAvulso): void {
        this.selected.emit(documentoAvulso);
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
        const arr = Object.keys(this.documentosAvulso).map(k => this.documentosAvulso[k]);
        this.selectedIds = arr.map(documentoAvulso => documentoAvulso.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(documentoAvulsoId): void {
        const selectedDocumentoAvulsoIds = [...this.selectedIds];

        if (selectedDocumentoAvulsoIds.find(id => id === documentoAvulsoId) !== undefined) {
            this.selectedIds = selectedDocumentoAvulsoIds.filter(id => id !== documentoAvulsoId);
        } else {
            this.selectedIds = [...selectedDocumentoAvulsoIds, documentoAvulsoId];
        }
        this.recompute();
    }

    recompute(): void {
        this.isIndeterminate = (this.selectedIds.length !== this.documentosAvulso.length && this.selectedIds.length > 0);
        this.changeSelectedIds.emit(this.selectedIds);
    }

    setListFilter(listFilter): void {
        this.listFilter = listFilter;
        this.loadPage();
    }

    /**
     * Toggle the sidebar
     */
    toggleSidebar(): void {
        this._cdkSidebarService.getSidebar('cdk-documento-avulso-list-filter').toggleOpen();
    }

    doResponderComplementarBloco(): void {
        this.responderComplentarBloco.emit();
    }

    doEtiquetarBloco(): void {
        this.etiquetarBloco.emit();
    }

    onScroll(): void {
        this.scrolled.emit();
    }
}
