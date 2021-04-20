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
    SimpleChange,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';
import {Tarefa} from '@cdk/models/tarefa.model';
import {DynamicService} from '../../../../modules/dynamic.service';
import {modulesConfig} from '../../../../modules/modules-config';
import {CdkTarefaListService} from './cdk-tarefa-list.service';
import {Usuario} from "../../../models";
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {DndDragImageOffsetFunction} from "ngx-drag-drop";

@Component({
    selector: 'cdk-tarefa-list',
    templateUrl: './cdk-tarefa-list.component.html',
    styleUrls: ['./cdk-tarefa-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,
    exportAs: 'dragTarefaList'
})
export class CdkTarefaListComponent implements OnInit, AfterViewInit, OnChanges {

    @Input()
    loading: boolean;

    @Input()
    togglingUrgenteIds: number[] = [];

    @Input()
    tarefas: Tarefa[] = [];

    @Input()
    usuarioAtual: Usuario;

    @Input()
    currentTarefaId: number;

    @Input()
    deletingIds: number[] = [];

    @Input()
    deletedIds: number[] = [];

    @Input()
    unDeletingIds: number[] = [];

    @Input()
    selectedIds: number[] = [];

    @Output()
    changeSelectedIds = new EventEmitter();

    @Input()
    error: any;

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
    delete = new EventEmitter<Tarefa>();

    @Output()
    restauraTarefa = new EventEmitter<Tarefa>();

    @Output()
    deleteBloco = new EventEmitter<Tarefa[]>();

    @Output()
    cienciaBloco = new EventEmitter<Tarefa[]>();

    @Output()
    folder = new EventEmitter<any>();

    @Output()
    selected = new EventEmitter<Tarefa>();

    @Output()
    compartilhar = new EventEmitter<number>();

    @Output()
    createDocumentoAvulso = new EventEmitter<number>();

    @Output()
    createTarefa = new EventEmitter<any>();

    @Output()
    movimentar = new EventEmitter<number>();

    @Output()
    editProcesso = new EventEmitter<any>();

    @Output()
    editTarefa = new EventEmitter<number>();

    @Output()
    redistribuirTarefa = new EventEmitter<number>();

    @Output()
    cienciaTarefa = new EventEmitter<any>();

    @Output()
    gerarRelatorioExcel = new EventEmitter<any>();

    @Output()
    toggleUrgente = new EventEmitter<Tarefa>();

    @Output()
    removeTarefa = new EventEmitter<Tarefa>();

    @Output()
    compartilharBloco = new EventEmitter<any>();

    @Output()
    createTarefaBloco = new EventEmitter<any>();

    @Output()
    createDocumentoAvulsoBloco = new EventEmitter<any>();

    @Output()
    editTarefaBloco = new EventEmitter<any>();

    @Output()
    editRedistribuirBloco = new EventEmitter<any>();

    @Output()
    movimentarBloco = new EventEmitter<any>();

    @Output()
    etiquetarBloco = new EventEmitter<any>();

    @Output()
    uploadBloco = new EventEmitter<any>();

    @Output()
    editorBloco = new EventEmitter<any>();

    @Output()
    loadAssuntos = new EventEmitter<any>();

    @Output()
    criaRelatorio = new EventEmitter<boolean>();

    @Input()
    loadingAssuntosProcessosId: number[];

    @Input()
    cienciaIds: number[] = [];

    @Input()
    errorDelete: number[] = [];

    @Input()
    targetHandle: any;

    listFilter: any;
    listSort: {} = {};

    isIndeterminate = false;

    @ViewChild('dynamicComponent', {static: true, read: ViewContainerRef})
    container: ViewContainerRef;

    @Input()
    novaTarefa = false;

    @Input()
    displayedCampos: string[] = [
        'especieTarefa.nome',
        'setorResponsavel.nome',
        'dataHoraDistribuicao',
        'dataHoraPrazo'
    ];

    @Input()
    mobileMode: boolean = false;

    allCampos: any[] = [
        {
            id: 'processo.nup',
            label: 'NUP',
            fixed: true
        },
        {
            id: 'especieTarefa.nome',
            label: 'Espécie Tarefa',
            fixed: false
        },
        {
            id: 'setorResponsavel.nome',
            label: 'Setor Responsável',
            fixed: false
        },
        {
            id: 'dataHoraDistribuicao',
            label: 'Data da Distribuição',
            fixed: false
        },
        {
            id: 'dataHoraPrazo',
            label: 'Prazo',
            fixed: false
        }
    ];

    campos = new FormControl();

    draggingIds: Array<number> = [];

    /**
     * Constructor
     */
    constructor(
        private _dynamicService: DynamicService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _cdkSidebarService: CdkSidebarService,
        private _cdkTarefaListService: CdkTarefaListService
    ) {
        this.listFilter = {};
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.novaTarefa = false;

        this.campos.setValue(this.allCampos.map(c => c.id).filter(c => this.displayedCampos.indexOf(c) > -1));
        this.campos.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((values) => {
                this.displayedCampos = [];
                this.allCampos.forEach(c => {
                    if (c.fixed || (values.indexOf(c.id) > -1)) {
                        this.displayedCampos.push(c.id);
                    }
                });
                this._changeDetectorRef.markForCheck();
                return of([]);
            })
        ).subscribe();
    }

    ngAfterViewInit(): void {
        const path = '@cdk/components/tarefa/cdk-tarefa-list';
        modulesConfig.forEach((module) => {
            if (module.components.hasOwnProperty(path)) {
                module.components[path].forEach((c => {
                    this._dynamicService.loadComponent(c)
                        .then(componentFactory => this.container.createComponent(componentFactory));
                }));
            }
        });
    }

    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['tarefas']) {
            this._cdkTarefaListService.tarefas = this.tarefas;
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    onStartDrag(event: DragEvent, tarefa: Tarefa): void {
        console.log("drag started", JSON.stringify(event, null, 2));
        const customTarefa = JSON.stringify({
            id: tarefa.id,
            usuario: tarefa.usuarioResponsavel.id,
            setor: tarefa.setorResponsavel.id,
            distribuicao: tarefa.distribuicaoAutomatica
        });
        event.dataTransfer.setData(customTarefa, '');
        if (this.selectedIds.length > 0) {
            this.draggingIds = this.selectedIds;
        } else {
            this.draggingIds = [];
            this.draggingIds.push(tarefa.id);
        }
    }

    offsetFunction: DndDragImageOffsetFunction = (event: DragEvent, dragImage: Element) => {
        return {x: 0, y: 0};
    };

    onCancelDrag(event: DragEvent): void {
        console.log("drag end", JSON.stringify(event, null, 2));
        this.draggingIds = [];
    }

    onCancelDrag2(event: DragEvent): void {
        console.log("drag cancel", JSON.stringify(event, null, 2));
        this.draggingIds = [];
    }

    onCopied(event: DragEvent, tarefa: Tarefa): void {
        console.log("drag copied", JSON.stringify(event, null, 2));
    }

    toggleFilter(): void {
        this.toggleSidebar();
    }

    loadPage(): void {
        this.reload.emit({
            listFilter: this.listFilter.filters,
            listSort: this.listSort
        });
    }

    doSort(sort: any): void {
        this.listSort = sort;
        this.loadPage();
    }

    selectTarefa(tarefa: Tarefa): void {
        this.selected.emit(tarefa);
    }

    doToggleUrgente(tarefa: Tarefa): void {
        this.toggleUrgente.emit(tarefa);
    }

    doDeleteTarefa(tarefa: Tarefa): void {
        this.delete.emit(tarefa);
    }

    doRestauraTarefa(tarefa: Tarefa): void {
        this.restauraTarefa.emit(tarefa);
    }

    doDeleteTarefaBloco(): void {
        const tarefasBloco = [];
        this.tarefas.forEach((tarefa: Tarefa) => {
            if (this.selectedIds.indexOf(tarefa.id) > -1) {
                tarefasBloco.push(tarefa);
            }
        })
        this.deleteBloco.emit(tarefasBloco);
    }

    setFolder(folder): void {
        this.folder.emit(folder);
    }

    doRemoveTarefa(tarefa: Tarefa): void {
        this.removeTarefa.emit(tarefa);
    }

    onScroll(): void {
        this.scrolled.emit();
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
        const arr = Object.keys(this.tarefas).map(k => this.tarefas[k]);
        this.selectedIds = arr.map(tarefa => tarefa.id);
        this._cdkTarefaListService.selectedIds = this.selectedIds;
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this._cdkTarefaListService.selectedIds = this.selectedIds;
        this.recompute();
    }

    toggleInSelected(tarefaId): void {
        const selectedTarefaIds = [...this.selectedIds];

        if (selectedTarefaIds.find(id => id === tarefaId) !== undefined) {
            this.selectedIds = selectedTarefaIds.filter(id => id !== tarefaId);
            this._cdkTarefaListService.selectedIds = this.selectedIds;
        } else {
            this.selectedIds = [...selectedTarefaIds, tarefaId];
            this._cdkTarefaListService.selectedIds = this.selectedIds;
        }
        this.recompute();
    }

    recompute(): void {
        this.isIndeterminate = (this.selectedIds.length !== this.tarefas.length && this.selectedIds.length > 0);
        this.changeSelectedIds.emit(this.selectedIds);
    }

    setListFilter(listFilter): void {
        this.listFilter = listFilter;
        this.loadPage();
    }

    doMovimentar(tarefaId): void {
        this.movimentar.emit(tarefaId);
    }

    doMovimentarBloco(): void {
        this.movimentarBloco.emit();
    }

    doCompartilhar(tarefaId): void {
        this.compartilhar.emit(tarefaId);
    }

    doCompartilharBloco(): void {
        this.compartilharBloco.emit();
    }

    doCreateDocumentoAvulso(tarefaId): void {
        this.createDocumentoAvulso.emit(tarefaId);
    }

    doCreateDocumentoAvulsoBloco(): void {
        this.createDocumentoAvulsoBloco.emit();
    }

    doCreateTarefa(params): void {
        this.createTarefa.emit(params);
    }

    doCreateTarefaBloco(): void {
        this.createTarefaBloco.emit();
    }

    doEditTarefa(tarefaId): void {
        this.editTarefa.emit(tarefaId);
    }

    doRedistribuirTarefa(tarefaId): void {
        this.redistribuirTarefa.emit(tarefaId);
    }

    doCienciaTarefa(tarefaId): void {
        this.cienciaTarefa.emit(tarefaId);
    }

    doEditTarefaBloco(): void {
        this.editTarefaBloco.emit();
    }

    doRedistribuirBloco(): void {
        this.editRedistribuirBloco.emit();
    }

    doCienciaBloco(): void {
        const tarefasBloco = [];
        this.tarefas.forEach((tarefa: Tarefa) => {
            if (this.selectedIds.indexOf(tarefa.id) > -1) {
                tarefasBloco.push(tarefa);
            }
        })

        this.cienciaBloco.emit(tarefasBloco);
    }

    doEditProcesso(params): void {
        this.editProcesso.emit(params);
    }

    doEtiquetarBloco(): void {
        this.etiquetarBloco.emit();
    }

    doUploadBloco(): void {
        this.uploadBloco.emit();
    }

    doEditorBloco(): void {
        this.editorBloco.emit();
    }

    doRestaurarBloco(): void {
        this.selectedIds.forEach(tarefaId => {
            const tarefa = new Tarefa();
            tarefa.id = tarefaId;
            this.doRestauraTarefa(tarefa);
        });
    }

    /**
     * Toggle the sidebar
     */
    toggleSidebar(): void {
        this._cdkSidebarService.getSidebar('cdk-tarefa-filter').toggleOpen();
    }

    doLoadAssuntos(processoId): void {
        this.loadAssuntos.emit(processoId);
    }

    doGerarRelatorioExcel(): void {
        this.gerarRelatorioExcel.emit();
    }

    criarRelatorio() {
        this.criaRelatorio.emit(true);
    }

}
