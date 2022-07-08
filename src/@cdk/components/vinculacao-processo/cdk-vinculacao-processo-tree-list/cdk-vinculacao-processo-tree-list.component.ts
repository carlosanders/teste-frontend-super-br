import {NestedTreeControl} from '@angular/cdk/tree';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, EventEmitter,
    Input, OnChanges,
    OnInit,
    Output, SimpleChanges,
    ViewEncapsulation
} from '@angular/core';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {Pagination, Processo, VinculacaoProcesso} from '@cdk/models';
import {cdkAnimations} from '@cdk/animations';
import {TitleCasePipe} from '@cdk/pipes/title-case.pipe';

@Component({
    selector: 'cdk-vinculacao-processo-tree-list',
    templateUrl: './cdk-vinculacao-processo-tree-list.component.html',
    styleUrls: ['./cdk-vinculacao-processo-tree-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkVinculacaoProcessoTreeListComponent implements OnInit, OnChanges {

    @Input('vinculacaoProcesso') set _transformData(vinculacaoProcesso: VinculacaoProcesso[]) {
        if (!vinculacaoProcesso?.length) {
            this.dataSource.data = [];
            return;
        }

        let parent = null;
        vinculacaoProcesso.forEach((vinculacaoProcesso) => {
            if (!parent) {
                parent = <VinculacaoProcessoNode> {
                    name: `${vinculacaoProcesso.processo.NUPFormatado} - ${TitleCasePipe.format('PRINCIPAL')}`,
                    data: {processo: vinculacaoProcesso.processo},
                    children: []
                }
            }

            parent.children.push(<VinculacaoProcessoNode> {
                name: `${vinculacaoProcesso.processoVinculado.NUPFormatado} - ${TitleCasePipe.format(vinculacaoProcesso.modalidadeVinculacaoProcesso.valor)}`,
                data: vinculacaoProcesso
            });
        });

        this.dataSource.data = [parent];
        this.treeControl.expand(parent);
    };
    @Input() isLoading: boolean = false;
    @Input() disableExpand: boolean = false;
    @Input() hideExpandIcon: boolean = false;
    @Input() actions: string[] = [
        'cancel',
        'create'
    ];
    @Input() selectedIds: number[] = [];
    @Input() deletedIds: number[] = [];
    @Input() deletingIds: number[] = [];
    @Input() paginator: Pagination = new Pagination();
    @Input() deletingErrors: any = {};
    @Input() currentProcessoId: number;
    @Input() mode = 'padrao';
    @Output() excluded: EventEmitter<Pagination> = new EventEmitter<Pagination>();
    @Output() reload: EventEmitter<Pagination> = new EventEmitter<Pagination>();
    @Output('deleteBloco') deleteBlocoEmmitter: EventEmitter<number[]> = new EventEmitter<number[]>();
    @Output('visualizarProcesso') visualizarProcessoEmmiter: EventEmitter<Processo> = new EventEmitter<Processo>();
    @Output('visualizarProcessoNovaAba') visualizarProcessoNovaAbaEmmiter: EventEmitter<Processo> = new EventEmitter<Processo>();
    @Output() edit: EventEmitter<number> = new EventEmitter<number>();
    @Output() delete: EventEmitter<number> = new EventEmitter<number>();
    @Output() create: EventEmitter<void> = new EventEmitter<void>();
    @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

    treeControl: NestedTreeControl<VinculacaoProcessoNode> = new NestedTreeControl<VinculacaoProcessoNode>(node => node.children);
    dataSource: MatTreeNestedDataSource<VinculacaoProcessoNode> = new MatTreeNestedDataSource<VinculacaoProcessoNode>();
    hasExcluded: boolean = false;
    hasSelected: boolean = false;
    isIndeterminate: boolean = false;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
    ) {
    }

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {
    }

    hasChild(_: number, node: VinculacaoProcessoNode): boolean {
        return node?.children?.length > 0;
    }

    hasNoChild(_: number, node: VinculacaoProcessoNode): boolean {
        return !node?.children || node.children.length === 0;
    }

    loadExcluded(): void {
        this.hasExcluded = !this.hasExcluded;
        if (this.hasExcluded) {
            this.excluded.emit({
                ...this.paginator,
                context: {mostrarApagadas: true}
            });
        }
        else {
            this.loadPage();
        }
    }

    loadPage(): void {
        this.reload.emit({
            ...this.paginator,
        });
        this.hasExcluded = false;
    }

    toggleInSelected(vinculacaoProcessoId): void {
        const selectedVinculacaoProcessoIds = [...this.selectedIds];

        if (selectedVinculacaoProcessoIds.find(id => id === vinculacaoProcessoId) !== undefined) {
            this.selectedIds = selectedVinculacaoProcessoIds.filter(id => id !== vinculacaoProcessoId);
        } else {
            this.selectedIds = [...selectedVinculacaoProcessoIds, vinculacaoProcessoId];
        }
        this._recompute();
    }

    deleteBloco(ids: number[]): void {
        this.deleteBlocoEmmitter.emit(ids);
    }

    visualizarProcesso(processo: Processo): void {
        this.visualizarProcessoEmmiter.emit(processo);
    }

    visualizarProcessoNovaAba(processo: Processo): void {
        this.visualizarProcessoNovaAbaEmmiter.emit(processo);
    }

    editVinculacaoProcesso(vinculacaoProcessoId: number): void {
        this.edit.emit(vinculacaoProcessoId);
    }

    deleteVinculacaoProcesso(vinculacaoProcessoId: number): void {
        this.delete.emit(vinculacaoProcessoId);
    }

    doCancel(): void {
        this.cancel.emit();
    }

    doCreate(): void {
        this.create.emit();
    }

    getError(id: number): any|boolean {
        if (this.deletingErrors && this.deletingErrors.hasOwnProperty(id)) {
            return this.deletingErrors[id];
        }
        return false;
    }

    getMessageError(obj: any): any {
        return obj?.error?.error?.message;
    }

    private _recompute(): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== (this.dataSource.data.length-1) && this.selectedIds.length > 0);
    }
}

export interface VinculacaoProcessoNode {
    children: VinculacaoProcessoNode[]
    data: VinculacaoProcesso;
    name: string;
}
