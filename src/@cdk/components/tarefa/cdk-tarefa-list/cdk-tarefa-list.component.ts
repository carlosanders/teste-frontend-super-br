import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output, QueryList,
    SimpleChange,
    ViewChild, ViewChildren,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';
import {Tarefa} from '@cdk/models/tarefa.model';
import {DynamicService} from '../../../../modules/dynamic.service';
import {modulesConfig} from '../../../../modules/modules-config';
import {CdkTarefaListService} from './cdk-tarefa-list.service';
import {Documento, Etiqueta, Pagination, Usuario, VinculacaoEtiqueta} from '../../../models';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {DndDragImageOffsetFunction} from 'ngx-drag-drop';
import {SearchBarEtiquetasFiltro} from '../../search-bar-etiquetas/search-bar-etiquetas-filtro';
import {CdkTarefaListItemComponent} from './cdk-tarefa-list-item/cdk-tarefa-list-item.component';

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

    @ViewChildren('tarefaListItems', {read: CdkTarefaListItemComponent}) tarefaListItems: QueryList<CdkTarefaListItemComponent>;

    @Input()
    loading: boolean;

    @Input()
    togglingUrgenteIds: number[] = [];

    @Input()
    assinandoTarefasIds: number[] = [];

    @Input()
    savingComponentesDigitaisIds: number[] = [];

    @Input()
    savingVinculacaoEtiquetaId: number;

    @Input()
    arraySearchTypes: SearchBarEtiquetasFiltro[] = [];

    @Input()
    vinculacaoEtiquetaPagination: Pagination;

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

    @Input()
    alterandoDocumentosId: number[] = [];

    @Input()
    assinandoDocumentosId: number[] = [];

    @Input()
    convertendoDocumentosId: number[] = [];

    @Input()
    deletingDocumentosId: number[] = [];

    @Input()
    downloadP7SDocumentoIds: number[] = [];

    @Input()
    removendoAssinaturaDocumentosId: number[] = [];

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
    gerenciarMinutasBloco = new EventEmitter<any>();

    @Output()
    restauraTarefa = new EventEmitter<Tarefa>();

    @Output()
    deleteBloco = new EventEmitter<Tarefa[]>();

    @Output()
    cienciaBloco = new EventEmitter<Tarefa[]>();

    @Output()
    folder = new EventEmitter<any>();

    @Output()
    selected = new EventEmitter<{tarefa: Tarefa; event: any}>();

    @Output()
    compartilhar = new EventEmitter<number>();

    @Output()
    createDocumentoAvulso = new EventEmitter<number>();

    @Output()
    createTarefa = new EventEmitter<any>();

    @Output()
    movimentar = new EventEmitter<Tarefa>();

    @Output()
    editProcesso = new EventEmitter<any>();

    @Output()
    editTarefa = new EventEmitter<Tarefa>();

    @Output()
    redistribuirTarefa = new EventEmitter<Tarefa>();

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
    loadInteressados = new EventEmitter<any>();

    @Output()
    criaRelatorio = new EventEmitter<boolean>();

    @Output()
    etiquetaClickHandler = new EventEmitter<{vinculacaoEtiqueta: VinculacaoEtiqueta; tarefa: Tarefa}>();

    @Output()
    setDraggedTarefasIds = new EventEmitter<number[]>();

    @Output()
    salvarObservacao = new EventEmitter<any>();

    @Output()
    alterarTipoDocumento = new EventEmitter<any>();

    @Output()
    assinaMinutas = new EventEmitter<any>();

    @Output()
    vinculacaoEtiquetaCreate = new EventEmitter<any>();

    @Output()
    vinculacaoEtiquetaDelete = new EventEmitter<any>();

    @Output()
    vinculacaoEtiquetaEdit = new EventEmitter<any>();

    @Output()
    aprovaDocumento = new EventEmitter<number>();

    @Output()
    assinaDocumento = new EventEmitter<VinculacaoEtiqueta>();

    @Output()
    converteHtml = new EventEmitter<number>();

    @Output()
    convertePdf = new EventEmitter<number>();

    @Output()
    deleteDocumento = new EventEmitter<{ documentoId: number; tarefaId: number }>();

    @Output()
    downloadP7S = new EventEmitter<VinculacaoEtiqueta>();

    @Output()
    removeAssinaturaDocumento = new EventEmitter<number>();

    @Output()
    uploadAnexos = new EventEmitter<{ vinculacaoEtiqueta: VinculacaoEtiqueta; tarefa: Tarefa }>();

    @Output()
    verResposta = new EventEmitter<{ documentoRespostaId: number; tarefa: Tarefa }>();

    @Output()
    completed = new EventEmitter<{ tarefaId: number; documento: Documento }>();

    @Output()
    addEtiqueta = new EventEmitter<{ tarefa: Tarefa; etiqueta: Etiqueta }>();

    /**
     * Disparado quando o upload de todos os componentes digitais for concluído, ou quando restarem apenas uploads com erro na fila
     */
    @Output()
    completedAll = new EventEmitter<number>();

    @Output()
    erroUpload = new EventEmitter<string>();

    @Input()
    loadingAssuntosProcessosId: number[];

    @Input()
    loadingInteressadosProcessosId: number[];

    @Input()
    totalInteressadosProcessosId: any[];

    @Input()
    cienciaIds: number[] = [];

    @Input()
    errorDelete: number[] = [];

    @Input()
    errorDistribuir: number[] = [];

    @Input()
    targetHandle: any;

    @Input()
    typeHandle: any;

    @Input()
    editandoObservacaoIds: number[] = [];

    @Input()
    savingObservacao: boolean = false;

    @ViewChild('dynamicComponent', {static: false, read: ViewContainerRef})
    container: ViewContainerRef;

    @Input()
    novaTarefa = false;

    @Input()
    displayedCampos: string[] = [
        'especieTarefa.nome',
        'setorResponsavel.nome',
        'dataHoraDistribuicao',
        'dataHoraPrazo',
        'observacao'
    ];

    @Input()
    mobileMode: boolean = false;

    @Input()
    draggingIds: number[] = [];

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
        },
        {
            id: 'observacao',
            label: 'Observação',
            fixed: false
        }
    ];

    campos = new FormControl();

    listFilter: any;
    listSort: Record<string, string> = {};
    sortField: string = 'dataHoraDistribuicao';
    sortOrder: string = 'DESC';

    isIndeterminate = false;

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
                this.allCampos.forEach((c) => {
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
        if (this.container !== undefined) {
            this.container.clear();
        }
        const path = '@cdk/components/tarefa/cdk-tarefa-list';
        modulesConfig.forEach((module) => {
            if (module.components.hasOwnProperty(path)) {
                module.components[path].forEach(((c) => {
                    if (this.container !== undefined) {
                        this._dynamicService.loadComponent(c)
                            .then(componentFactory => this.container.createComponent(componentFactory));
                    }
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
        if (this.selectedIds.length > 0) {
            this.setDraggedTarefasIds.emit(this.selectedIds);
            const tarefas = [];
            this.tarefas.forEach((aTarefa) => {
                if (this.selectedIds.indexOf(aTarefa.id) > -1) {
                    const tmpTarefa: any = {};
                    tmpTarefa.id = aTarefa.id;
                    tmpTarefa.usuario = aTarefa.usuarioResponsavel.id;
                    tmpTarefa.setor = aTarefa.setorResponsavel.id;
                    tmpTarefa.distribuicao = aTarefa.distribuicaoAutomatica;
                    tarefas.push(tmpTarefa);
                }
            });
            const type = JSON.stringify(tarefas);
            event.dataTransfer.setData(type, '');
        } else {
            const customTarefa = JSON.stringify({
                id: tarefa.id,
                usuario: tarefa.usuarioResponsavel.id,
                setor: tarefa.setorResponsavel.id,
                distribuicao: tarefa.distribuicaoAutomatica
            });
            event.dataTransfer.setData(customTarefa, '');
            this.setDraggedTarefasIds.emit([tarefa.id]);
        }
    }

    offsetFunction: DndDragImageOffsetFunction = (event: DragEvent, dragImage: Element) => ({x: 0, y: 0});

    onCancelDrag(event: DragEvent): void {
        this.setDraggedTarefasIds.emit([]);
    }

    onCopied(event: DragEvent, tarefa: Tarefa): void {
        this.setDraggedTarefasIds.emit([]);
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
        this.sortField = Object.keys(this.listSort)[0];
        this.sortOrder = Object.values(this.listSort)[0];
        this.loadPage();
    }

    selectTarefa(event, tarefa: Tarefa): void {
        this.selected.emit({tarefa: tarefa, event: event});
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
        });
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
        } else {
            this.selectedIds = [...selectedTarefaIds, tarefaId];
        }
        this._cdkTarefaListService.selectedIds = this.selectedIds;
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

    doAlterarTipoDocumento(event): void {
        this.alterarTipoDocumento.emit(event);
    }

    doAssinaMinutas(): void {
        this.assinaMinutas.emit(true);
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
        });

        this.cienciaBloco.emit(tarefasBloco);
    }

    doEditProcesso(params): void {
        this.editProcesso.emit(params);
    }

    doEtiquetarBloco(): void {
        this.etiquetarBloco.emit(true);
    }

    doMinutas(): void {
        this.gerenciarMinutasBloco.emit(true);
    }

    doUploadBloco(): void {
        this.uploadBloco.emit(true);
    }

    doEditorBloco(): void {
        this.editorBloco.emit(true);
    }

    doRestaurarBloco(): void {
        this.selectedIds.forEach((tarefaId) => {
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

    doLoadInteressados(processoId): void {
        this.loadInteressados.emit(processoId);
    }

    getTotalInteressados(processoId: number): number {
        const objeto = this.totalInteressadosProcessosId.find(total => total.id === processoId);
        return objeto ? objeto.total : 0;
    }

    doGerarRelatorioExcel(): void {
        this.gerarRelatorioExcel.emit();
    }

    criarRelatorio(): void {
        this.criaRelatorio.emit(true);
    }

    doSalvarObservacao(observacao: any): void {
        this.salvarObservacao.emit(observacao);
    }

    doClickEtiqueta(event): void {
        this.etiquetaClickHandler.emit(event);
    }

    doAddEtiqueta(params: { tarefa: Tarefa; etiqueta: Etiqueta }): void {
        this.addEtiqueta.emit(params);
    }

    doVinculacaoEtiquetaCreate(params): void {
        this.vinculacaoEtiquetaCreate.emit(params);
    }

    doVinculacaoEtiquetaDelete(params): void {
        this.vinculacaoEtiquetaDelete.emit(params);
    }

    doVinculacaoEtiquetaEdit(params): void {
        this.vinculacaoEtiquetaEdit.emit(params);
    }

    doAprovaDocumento(documentoId: number): void {
        this.aprovaDocumento.emit(documentoId);
    }

    doAssinaDocumento(vinculacaoEtiqueta: VinculacaoEtiqueta): void {
        this.assinaDocumento.emit(vinculacaoEtiqueta);
    }

    doConverteHtml(documentoId: number): void {
        this.converteHtml.emit(documentoId);
    }

    doConvertePdf(documentoId: number): void {
        this.convertePdf.emit(documentoId);
    }

    doDeleteDocumento(event: { documentoId: number; tarefaId: number }): void {
        this.deleteDocumento.emit(event);
    }

    doDownloadP7S(vinculacaoEtiqueta: VinculacaoEtiqueta): void {
        this.downloadP7S.emit(vinculacaoEtiqueta);
    }

    doRemoveAssinaturaDocumento(documentoId: number): void {
        this.removeAssinaturaDocumento.emit(documentoId);
    }

    doUploadAnexos(event: { vinculacaoEtiqueta: VinculacaoEtiqueta; tarefa: Tarefa }): void {
        this.uploadAnexos.emit(event);
    }

    doVerResposta(event: { documentoRespostaId: number; tarefa: Tarefa }): void {
        this.verResposta.emit(event);
    }

    onComplete(uploaded: {tarefaId: number; documento: Documento}): void {
        this.completed.emit(uploaded);
    }

    onCompleteAll(tarefaId: number): void {
        this.completedAll.emit(tarefaId);
    }

    onErroUpload(mensagem: string): void {
        this.erroUpload.emit(mensagem);
    }
}
